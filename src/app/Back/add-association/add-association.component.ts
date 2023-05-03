import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AssociationsService } from '../_services/associations.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-add-association',
  templateUrl: './add-association.component.html',
  styleUrls: ['./add-association.component.css']
})
export class AddAssociationComponent implements OnInit {
  BASE_URL =` ${environment.apiBaseUrl}/association/`;

  selectedFile!: File;
  newForm!: FormGroup;
  currentIndex = -1;
  titre = '';
  panelOpenState = false;
  step = 4;
  sponsors!: any[];
 
  constructor(private as:AssociationsService, private _snackBar:MatSnackBar, private formBuilder:FormBuilder) {
    this.dataSource = new MatTableDataSource();
     

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        
        return  data.nom.toLocaleLowerCase().includes(filter) ||
        data.adresse.toLocaleLowerCase().includes(filter) ||
        data.mail.toLocaleLowerCase().includes(filter) ||
        data.tel.toLocaleLowerCase().includes(filter) ;
        
      }
   }

  ngOnInit(): void {
    this.newForm = this.formBuilder.group({
      nom: [null, Validators.required],
      adresse: [null,Validators.required],
      mail: [null, Validators.required],
      tel: [null,Validators.required],
      imageFileName: [null, Validators.required]
    });

      this.getAllAssociation();
  }

  userFile: any;
  public imagePath : any;
  
imageURL: any;

  onFileSelected(event: any) {
    if (event.target.files.length> 0)
    {
      const file: File = event.target.files[0];
      this.userFile = file;

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/)== null){
        this.openErrorSnackBar('Only images are supported')
        //this.message ="Only images are supported";
        //console.log(this.message);
        return;
      }
      var reader = new FileReader();
      this.imagePath =file;
      reader.readAsDataURL(file);
      reader.onload= (event) => {
      this.imageURL = reader.result;
      }
    }
    
  }
  openSuccessSnackBar(message: string) {
    this._snackBar.open(message, '', {
       duration: 4000,
       horizontalPosition:'center',
       verticalPosition:'bottom',
       panelClass:["snackbar-success-style"]
    });
  }

  openErrorSnackBar(message: string) {
    this._snackBar.open(message, '', {
       duration: 4000,
       horizontalPosition:'center',
       verticalPosition:'bottom',
       panelClass:["snackbar-error-style"]
    });
  }
  displayedColumns: string[] = ['nom', 'adresse', 'mail', 'tel','imageFileName','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild('formDirective1') private formDirective1!: NgForm 
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild("myDiv") divView!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;
  getListSponsors(){
    this.as.getAssociationList().subscribe((data: any) => {
      this.sponsors=data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      return data;
      
     
      });
  }

  submit() {
    if (!this.newForm.valid) {
      return;
    }
    if (this.newForm.valid) {
      const formData = new FormData();
      const sponsor = this.newForm.value;
      formData.append('association',JSON.stringify(sponsor));
      formData.append('file',this.userFile);
  
    this.as.addA(formData).subscribe(
    data => {
      this.openSuccessSnackBar('associations ajoutée avec succès !')
      this.getListSponsors();
      
    });
    this.formDirective1.resetForm();
    this.newForm.reset();
    this.step=4;
  }
  }
  lstAsso: any[] ;
   
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
     

refresh(): void {
    window.location.reload();
  }
  
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
  setStep(index: number) {
    this.step = index;
  }




}
