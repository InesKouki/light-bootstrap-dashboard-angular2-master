import { Component, OnInit } from '@angular/core';
import { AssociationsService } from '../_services/associations.service';
import { DonationsService } from '../_services/donations.service';
import { Donations } from '../entity/donations';
import { Associations } from '../entity/associations';

@Component({
  selector: 'app-list-donations',
  templateUrl: './list-donations.component.html',
  styleUrls: ['./list-donations.component.css']
})
export class ListDonationsComponent implements OnInit {
  donations!: Donations[];
  associations!: Associations[];
  association:any
 // selectedDonation!: Donations;
//  selectedAssociation!: Associations;
  showAssociations: {[donationId: number]: boolean} = {};
  selectedAssociation: {[donationId: number]: Associations} = {};
  selectedDonationId!: number;

  lstDon!: any[]
  
  constructor(private ds: DonationsService,private as:AssociationsService) { }

  ngOnInit(): void {
    this.getLisDonations();
    this.getDonations();
    this.getAssociations();
  this.getCount();
  }
  getLisDonations(){
     this.ds.getDonationsList().subscribe(data=>
      {
        this.lstDon=data
      })
  }
  getAssociationIcon(name: string): string {
    switch (name) {
      case 'Association 1':
        return 'account_balance';
      case 'Association 2':
        return 'people_alt';
      case 'Association 3':
        return 'favorite_border';
      default:
        return 'help_outline';
    }}
  getCount(){
    this.ds.getCountByAssociation().subscribe(
      data => {
        this.association= data;
      },
      error => {
        console.log(error);
      }
    );
  }
  
  downloadExcel() {
    this.ds.downloadExcel().subscribe(
      data => {
        const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();
      },
      error => console.error(error)
    );
  }
  updateDonationStatus(id: number) {
    this.ds.updateDonationsStatus(id).subscribe(
      response => {
        console.log(response);
        // Mettre à jour la liste des donations
        this.getLisDonations();
        window.location.href = window.location.href;
      },
      error => {
        console.log(error);
      }
    );
  }
  getAssociations() {
    this.as.getAssociationList().subscribe(associations => {
      this.associations = associations;
    });
  }
  getDonations(){
    this.ds.getDonationsList().subscribe(donations => this.donations=donations)
  }
  // assignAssociation(donation: Donations): void {
  //   this.selectedDonation = donation;
  // }
  assignAssociationToDonation(donationId: number, associationId: number): void {
    this.ds.assignAssociationToDonation(donationId, associationId)
      .subscribe(updatedDonation => {
        console.log('Association assigned to donation:', updatedDonation);
        // this.selectedDonation = null;
        // this.selectedAssociation = null;
      });
  }
  loadDonations(){
    this.ds.getDonationsList().subscribe((donations:Donations[])=>{this.donations=donations;})
  }
  loadAssociations(donation:Donations){
    this.as.getAssociationList().subscribe((associations: Associations[])=>{
      this.associations =this.associations;
      //this.showAssociations[donation.id]=true;
    })
  }
  onDonationClick(donationId: number) {
    this.showAssociations[donationId] = true;
    this.selectedDonationId = donationId;
    
  }
  assignAssociation(donationId: number) {
    const associationId = this.selectedAssociation[donationId].id;
    this.ds.assignAssociationToDonation(donationId, associationId)
      .subscribe((donation: Donations) => {
        console.log('Donation updated:', donation);
        window.location.reload();
      });
  }
  deleteDonations(id:any){
    this.ds.deleteDonation(id).subscribe(data=>{
      this.getLisDonations();
      window.location.reload();
    })
    }
  }
  // assignAssociation(donation: Donations) {
  //   const associationId = this.selectedAssociation[donation.id].id;
  //   this.ds.assignAssociationToDonation(donation.id, associationId)
  //     .subscribe((donation: Donations) => {
  //       console.log('Donation updated:', donation);
  //     });
  // }
  // assignAssociationToDonation(donationId: number, associationId: number): void {
  //   this.ds.assignAssociationToDonation(donationId, associationId).subscribe(
  //     response => {
  //       console.log('Association assigned successfully');
  //       // Do something else if needed
  //     },
  //     error => {
  //       console.log('Error assigning association to donation:', error);
  //     }
  //   );
  // }


