import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { auPair, User } from '../../../../../shared/interfaces/interfaces';
import { API } from '../../../../../shared/api/api.service';

@Component({
  selector: 'the-au-pair-expand-modal',
  templateUrl: './expand-modal.component.html',
  styleUrls: ['./expand-modal.component.scss'],
})
export class ExpandModalComponent implements OnInit {
  public navParams = new NavParams;
  auPairId: string = this.navParams.get('auPairId');

  auPairDetails: auPair = {
    id: "",
    rating: 0,
    onShift: false,
    employer: "",
    costIncurred: 0,
    distTraveled: 0,
    payRate: 0,
    bio: "",
    experience: "",
  }

  userDetails: User = {
    id: "",
    fname: "",
    sname: "",
    email: "",
    address: "",
    registered: false,
    type: 0,
    password: "",
    number: "",
    salt: "",
  }
  
  constructor(private serv: API, private modalCtrl : ModalController ,public toastCtrl: ToastController) {}

  ngOnInit(): void {
    this.getAuPairDetails(this.auPairId);
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  async getAuPairDetails(APID : string)
  {
      await this.serv.getUser(APID).subscribe(
        res=>{
          this.userDetails.id = res.id;
          this.userDetails.fname = res.fname;
          this.userDetails.sname = res.sname;
          this.userDetails.email = res.email;
          this.userDetails.address = res.address;
          this.userDetails.registered = res.registered;
          this.userDetails.type = res.type;
          this.userDetails.password = res.password;
          this.userDetails.number = res.number;
          this.userDetails.salt = res.salt;
        },
      error=>{console.log("Error has occured with API: " + error);}
      )
      await this.serv.getAuPair(APID).subscribe(
        res=>{
          this.auPairDetails.id = res.id;
          this.auPairDetails.rating = res.rating;
          this.auPairDetails.onShift = res.onShift;
          this.auPairDetails.employer = res.employer;
          this.auPairDetails.costIncurred = res.costIncurred;
          this.auPairDetails.distTraveled = res.distTraveled;
          this.auPairDetails.payRate = res.payRate;
          this.auPairDetails.bio = res.bio;
          this.auPairDetails.experience = res.experience;
        },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }
}
