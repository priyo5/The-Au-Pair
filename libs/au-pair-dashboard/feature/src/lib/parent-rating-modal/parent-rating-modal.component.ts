import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Parent } from '../../../../../shared/interfaces/interfaces';
import { API } from '../../../../../shared/api/api.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'the-au-pair-parent-rating-modal',
  templateUrl: './parent-rating-modal.component.html',
  styleUrls: ['./parent-rating-modal.component.scss'],
})
export class ParentRatingModalComponent implements OnInit {
  parentID = "";
  auPairID = "";
  public navParams = new NavParams;
  parentRating! : number;

  parentDetails: Parent = {
    id: "",
    children: [],
    medID: "",
    auPair: "",
    rating: []
  }
  
  constructor(private serv: API, private modalCtrl : ModalController ,public toastCtrl: ToastController, private store: Store) {}

  async ngOnInit() {
    this.auPairID = this.store.snapshot().user.id;
    await this.serv.getAuPair(this.auPairID)
    .toPromise()
      .then( 
        res=>{
          this.parentID = res.employer;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )

    this.getParentDetails();
  }

  async getParentDetails()
  {
    await this.serv.getParent(this.parentID)
    .toPromise()
      .then( 
        res=>{
          this.parentDetails.id = res.id;      
          this.parentDetails.children = res.children;
          this.parentDetails.medID = res.medID;
          this.parentDetails.auPair = res.auPair;
          this.parentDetails.rating = res.rating;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )
  }

  async getDescription(formData : any){   
    this.getParentDetails();

    console.log(this.parentDetails);
    

    console.log(formData.behaviour);
    

    if(formData.behaviour > 5 || formData.behaviour < 1 || isNaN(+formData.behaviour))
    {
      this.parentRating = 1;
    }
    else
    {
      this.parentRating = formData.behaviour;
    }
    
    this.parentDetails.rating.push(this.parentRating);  
    this.submitRating();
  }

  async openToast()
  {
    const toast = await this.toastCtrl.create({
      message: 'Parent rating added!',
      duration: 4000,
      position: 'top',
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  submitRating(){
    this.serv.editParent(this.parentDetails).subscribe(
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

    console.log(this.parentDetails);
  } 
}

