import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssociationsService } from '../_services/associations.service';
import { DonationsService } from '../_services/donations.service';
import { Donations } from '../entity/donations';
import { Associations } from '../entity/associations';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})

export class DonationsComponent implements OnInit {
  donations!: Donations[];
  showAssociations: {[donationId: number]: boolean} = {};
  selectedAssociation: {[donationId: number]: Associations} = {};
  selectedDonationId!: number;
  newDonation: Donations = {
    description: '', quantite: 0, date: null!, associations: null!,
    id: 0,
    user: null!,
    suivi: false
  };
  associations!: Associations[];

  constructor(private ds: DonationsService,private as:AssociationsService) { }
  // getListAsoo(){
  //   this.as.getAssociationList().subscribe(resp=>{
  //     this.listass = resp;
    
  //   });
  // }
  // submitted = false;
  ngOnInit(): void { 
    
  //  this.getListAsoo();
  //  this.associations=this.as.getAssociationList();
  // }
  // newEmployee(): void {
  //   this.submitted = false;
  //   this.associations=this.as.getAssociationList();
  //   this.employee = new Donations();

  // }

}
// loadAssociations(donation:Donations){
//   this.as.getAssociationList().subscribe((associations: Associations[])=>{
//     this.associations =this.associations;
//     //this.showAssociations[donation.id]=true;
//   })
// }
// onDonationSubmit() {
//   this.ds.add(this.employee)
//     .subscribe(data => {
//       console.log('New donation added:', data);
//       this.donations.push(this.employee);
//     //  this.employee = { description: '', amount: 0 };
//     });
// }
  // onSubmit() {
  //   this.submitted = true;
 
  //   this.saveD();  
      
  // }

//   initForm(){
//     this.registerForm = new FormGroup({
//       date: new FormControl('', [
//           Validators.required
          
//         ]),

//         description: new FormControl('', [
//             Validators.required
            
//           ]),
//           associations: new FormControl('', [
//             Validators.required
            
//           ]),
//           quantite: new FormControl('', [
//             Validators.required
            
//           ]), 
//           user: new FormControl('', [
//             Validators.required
            
//           ]), 
//           suivi: new FormControl('', [
//             Validators.required
            
//           ]), 
         
//       });
      
// }

// save(registerForm:any){
//   const association = this.listass.find((item: { id: number; }) => item.id === parseInt(this.registerForm.value.associations));
//   this.ds.add(this.donations).subscribe(
   
//     response=>{
//       this.donations=response;
//       this.id=this.donations.id;
//       console.log(response);
//       this.donations.associations=this.listass.find(name=> this.id === this.donations.associations.id);
//       this.
//       this.registerForm.reset();

//     }
//   )
// }
loadDonations() {
  this.ds.getDonationsList()
    .subscribe((donations: Donations[]) => {
      this.donations = donations;
    });
}

loadAssociations() {
  this.as.getAssociationList()
    .subscribe((associations: Associations[]) => {
      this.associations = associations;
    });
}

onDonationClick(donationId: number) {
  this.showAssociations[donationId] = true;
  this.selectedDonationId = donationId;
}

onDonationSubmit() {
  this.ds.add(this.newDonation)
  .subscribe(donation => {
    console.log('New donation added:', donation);
   // this.donations.push(donation);
    this.newDonation = 
    { description: '', user:null!, date: null!,
     quantite: 0, associations: null!,suivi:false,id:0 };})
}
todayDate() {
  const currentDate = new Date();
  const day = ("0" + currentDate.getDate()).slice(-2);
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  return `${currentDate.getFullYear()}-${month}-${day}`;
}
}