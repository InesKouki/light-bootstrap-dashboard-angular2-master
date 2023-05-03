import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AssociationsService } from '../_services/associations.service';


@Component({
  selector: 'app-update-association',
  templateUrl: './update-association.component.html',
  styleUrls: ['./update-association.component.css']
})
export class UpdateAssociationComponent implements OnInit {
  updateEventForm!: FormGroup;
  constructor( public dialogRef: MatDialogRef<UpdateAssociationComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public id: any,
    private _snackBar: MatSnackBar,
    private as: AssociationsService) { }

  ngOnInit(): void {
    this.updateEventForm = this.formBuilder.group({
      nom: [null, Validators.required],
      adresse: [null,Validators.required],
      mail: [null, Validators.required],
      tel: [null,Validators.required],
    
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
    this.as.update(this.id,this.updateEventForm.value.adresse,this.updateEventForm.value.mail,this.updateEventForm.value.nom,this.updateEventForm.value.tel).subscribe(
      data => {
        this.openSuccessSnackBar('associations mis à jour avec succès !')     
        this.dialogRef.close();
   
      });

    }
}
