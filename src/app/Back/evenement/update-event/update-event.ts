import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EventService } from "../../_services/event.service";


@Component({
    selector: 'update-event',
    templateUrl: 'update-event.html',
    styleUrls: ['./update-event.css'],
  })
  export class UpdateEventComponent implements OnInit {
    updateEventForm: FormGroup;
  
    constructor(
      public dialogRef: MatDialogRef<UpdateEventComponent>,
      @Inject(MAT_DIALOG_DATA) public numEvent: any,
      private EventService: EventService,
      private _snackBar: MatSnackBar,
      private formBuilder: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.updateEventForm = this.formBuilder.group({
        nomEvent: [null, Validators.required],
        description: [null,Validators.required],
        dateDebut: [null, Validators.required],
        dateFin: [null,Validators.required],
        nbrPlace: [null,Validators.required],
        prix: [null,Validators.required],
      });
    }
  
    openSuccessSnackBar(message: string) {
      this._snackBar.open(message, 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success-style'],
      });
    }
  
    submit() {
      if (!this.updateEventForm.valid) {
        return;
      }
      this.EventService.update(this.numEvent,this.updateEventForm.value.nomEvent,this.updateEventForm.value.description,this.updateEventForm.value.dateDebut,this.updateEventForm.value.dateFin,this.updateEventForm.value.nbrPlace,this.updateEventForm.value.prix).subscribe(
        data => {
          this.openSuccessSnackBar('event mis à jour avec succès !')     
          this.dialogRef.close();
     
        });
    }
  
}