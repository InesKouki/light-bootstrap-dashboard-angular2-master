import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SponsorService } from 'app/Back/_services/sponsor.service';

@Component({
  selector: 'app-update-sponsor',
  templateUrl: './update-sponsor.component.html',
  styleUrls: ['./update-sponsor.css']
})
export class UpdateSponsorComponent implements OnInit {
  updateSponsorForm: FormGroup;
  
    constructor(
      public dialogRef: MatDialogRef<UpdateSponsorComponent>,
      @Inject(MAT_DIALOG_DATA) public numSponsor: any,
      private SponsorService: SponsorService,
      private _snackBar: MatSnackBar,
      private formBuilder: FormBuilder
    ) {}
  ngOnInit(): void {
    this.updateSponsorForm = this.formBuilder.group({
      nomSponsor: [null, Validators.required],
      description: [null,Validators.required],
      debutContract: [null, Validators.required],
      finContract: [null,Validators.required],
     
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
    if (!this.updateSponsorForm.valid) {
      return;
    }
    this.SponsorService.update(this.numSponsor,this.updateSponsorForm.value.nomSponsor,this.updateSponsorForm.value.description,this.updateSponsorForm.value.debutContract,this.updateSponsorForm.value.finContract).subscribe(
      data => {
        this.openSuccessSnackBar('Sponsor mis à jour avec succès !')     
        this.dialogRef.close();
   
      });
  }
}
