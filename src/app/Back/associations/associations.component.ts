import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AssociationsService } from '../_services/associations.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
 import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UpdateAssociationComponent } from '../update-association/update-association.component';
import { environment } from 'environments/environment';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-associations',
  templateUrl: './associations.component.html',
  styleUrls: ['./associations.component.css']
})
export class AssociationsComponent implements OnInit {
 
  BASE_URL =` ${environment.apiBaseUrl}/association/`;
  
  
  displayedColumns: string[] = ['nom', 'adresse', 'mail', 'tel','imageFileName','actions'];
  dataSource: MatTableDataSource<any>  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  @ViewChild('formDirective1') private formDirective1: NgForm;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("fileInput") fileInput:ElementRef;
  eventSearch:any[];
  lstAsso: any[] 
  newForm!: FormGroup;
  currentEvent = null;
  currentIndex = -1;
  titre = '';
  panelOpenState = false;
  step = 4;
  registerForm: FormGroup;

   
   constructor(private as:AssociationsService
    , private _snackBar: MatSnackBar,
      private formBuilder: FormBuilder,
      public dialog:MatDialog
    ) 
    {  this.dataSource = new MatTableDataSource();
     

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        
        return  data.nom.toLocaleLowerCase().includes(filter) ||
        data.adresse.toLocaleLowerCase().includes(filter) ||
        data.mail.toLocaleLowerCase().includes(filter) ||
        data.tel.toLocaleLowerCase().includes(filter) ;
        
      }}
      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
      ngAfterViewInit() {
       // this.divView.nativeElement.scrollIntoView();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
  
 
   ngOnInit(): void {
      
      
      this.newForm = this.formBuilder.group({
        nom: [null, Validators.required],
        adresse: [null,Validators.required],
       mail: [null, Validators.required],
        tel: [null,Validators.required],
        imageFileName:[null,Validators.required]
       
     });
     this.getAllAssociation();
   }
   getAllAssociation(){
      this.as.getAssociationList().subscribe(data=>
       { 
        //console.log(data);
        
        
        this.lstAsso= data
        console.log( data);
        this.dataSource.data= data;
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
        return data;
       } )
      }
      setStep(index: number) {
        this.step = index;
    }
      deleteAssociation(id : any){
     
          this.as.deleteAssciation(id).subscribe(data=>
            {
            this.getAllAssociation();})
       
      
      }
  openDialogUpdateAssociation(id:any) {
     const dialogRef=this.dialog.open(UpdateAssociationComponent,
       { data:id
       });
       dialogRef.afterClosed().subscribe(result => {
          this.getAllAssociation();
         });
  }
     
    openSuccessSnackBar(message: string) {
        this._snackBar.open(message, '', {
           duration: 4000,
           horizontalPosition:'center',
           verticalPosition:'bottom',
           panelClass:["snackbar-success-style"]
        });
      }
      downloadPdf() {
        this.as.exportAll().subscribe(data => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        });
     }
      submit(registerForm:any) {
        if (!this.newForm.valid) {
          return;
        }
        if (this.newForm.valid) {
     
        this.as.addA(registerForm.value).subscribe(
        data => {
          console.log(data)
          registerForm.reset();
          this.openSuccessSnackBar('Evenement crée avec succès !')
          this.getAllAssociation();
         
       });
        this.formDirective1.resetForm();
        this.newForm.reset();
       this.step=4;
      }
      }

}
