import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'app/Back/_services/event.service';

@Component({
  selector: 'app-participants-event',
  templateUrl: './participants-event.component.html',

})
export class ParticipantsEventComponent  {

  users:any[];
  constructor(public dialogRef: MatDialogRef<ParticipantsEventComponent>,
    @Inject(MAT_DIALOG_DATA) public id:number,private EventService: EventService
    ) {
      this.getParticipants(this.id);

    }
  getParticipants(id) {
    this.EventService.getParticipantDuEvent(id).subscribe(data=>{
      this.users=data;
    })
  }

  removeFromEvent(numEvent:number,id:number) {
    this.EventService.removeReservation(numEvent,id).subscribe(data => {
      this.dialogRef.close();
      })
  }
  
}
