import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { auPair } from '../../../../../shared/interfaces/interfaces';
import { API } from '../../../../../shared/api/api.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'the-au-pair-au-pair-rating-modal',
  templateUrl: './au-pair-rating-modal.component.html',
  styleUrls: ['./au-pair-rating-modal.component.scss'],
})
export class AuPairRatingModalComponent implements OnInit {
  parentID = "";
  auPairId = "";
  public navParams = new NavParams;
  auPairRating! : number;

  currentAuPair: auPair = {
    id: "",
    rating: [],
    onShift: false,
    employer: "",
    costIncurred: 0,
    distTraveled: 0,
    payRate: 0,
    bio: "",
    experience: "",
    currentLong: 0.0,
    currentLat: 0.0,
    terminateDate: "",
  }
  
  constructor(private serv: API, private modalCtrl : ModalController ,public toastCtrl: ToastController, private store: Store) {}

  async ngOnInit() {
    this.parentID = this.store.snapshot().user.id;
    await this.serv.getParent(this.parentID)
    .toPromise()
      .then( 
        res=>{
          this.auPairId = res.auPair;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )

    this.getAuPair(this.auPairId);
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  getDescription(formData : any){
    this.getAuPairDetails();

    if(formData.behaviour > 5 || formData.behaviour < 1 || isNaN(+formData.behaviour))
    {
      this.auPairRating = 1;
    }
    else
    {
      this.auPairRating = formData.behaviour;
    }
    
    this.currentAuPair.rating.push(this.auPairRating);  
    this.submitRating();
  }

  async getAuPairDetails()
  {
    await this.serv.getAuPair(this.auPairId).subscribe(
      res=>{
        this.currentAuPair.id = res.id;
        this.currentAuPair.rating = res.rating;
        this.currentAuPair.onShift = res.onShift;
        this.currentAuPair.employer = res.employer;
        this.currentAuPair.costIncurred = res.costIncurred;
        this.currentAuPair.distTraveled = res.distTraveled;
        this.currentAuPair.payRate = res.payRate;
        this.currentAuPair.bio = res.bio;
        this.currentAuPair.experience = res.experience;
        this.currentAuPair.currentLong = res.currentLong;
        this.currentAuPair.currentLat = res.currentLat;
        this.currentAuPair.terminateDate = res.terminateDate;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }

  getAuPair(auPairId : string){
    this.serv.getAuPair(auPairId).subscribe(
      res => { 
        this.currentAuPair = res;
      },
      error => { 
        console.log(error)
      }
    );
  }

  async openToast()
  {
    const toast = await this.toastCtrl.create({
      message: 'Au Pair rating added!',
      duration: 4000,
      position: 'top',
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  submitRating(){
    this.serv.editAuPair(this.currentAuPair).subscribe(
      res=>{
        console.log("The response is:" + res);
        this.closeModal();
        this.openToast();
        return res;
      },
      error=>{
        console.log("Error has occured with API: " + error);
        return error;
      }
    );
    console.log(this.currentAuPair.rating);
  } 
}
