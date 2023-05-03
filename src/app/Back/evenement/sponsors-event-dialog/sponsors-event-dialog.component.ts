import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'app/Back/_services/event.service';
@Component({
  selector: 'app-sponsors-event-dialog',
  templateUrl: './sponsors-event-dialog.component.html',
  
})
export class SponsorsEventDialogComponent  {
  sponsors:any[];
  constructor(public dialogRef: MatDialogRef<SponsorsEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public id:number,private EventService: EventService
    ) {
      this.getSponsors(this.id);

    }
  getSponsors(id) {
    this.EventService.getSponsorsDuEvent(id).subscribe(data=>{
      this.sponsors=data;
    })
  }

  removeFromEvent(numEvent:number,numSponsor:number) {
    this.EventService.unassign(numEvent,numSponsor).subscribe(data => {
      this.dialogRef.close();
      })
  }

}
