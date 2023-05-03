import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SponsorService } from '../_services/sponsor.service';
import { UpdateSponsorComponent } from '../sponsor/update-sponsor/update-sponsor.component';
import { RemoveSponsorDialogContent } from '../sponsor/remove-sponsor-dialog-content';
import { saveAs } from 'file-saver';
import { environment } from 'environments/environment';
import { AssociationsService } from '../_services/associations.service';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent implements OnInit {
  BASE_URL = `${environment.apiBaseUrl}/association/`;
  displayedColumns: string[] = ['nom', 'adresse', 'mail', 'tel','imageFileName','actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('formDirective1') private formDirective1: NgForm;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("myDiv") divView: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  sponsorSearch:any[];
  lstAsso: any[];
  newForm: FormGroup;
  details:any;
  currentEvent = null;
  currentIndex = -1;
  titre = '';
  panelOpenState = false;
  step = 4;

  constructor(
    private associationsService: AssociationsService,
    public dialog:MatDialog,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,) {

      this.dataSource = new MatTableDataSource();
     

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        
        return  data.nom.toLocaleLowerCase().includes(filter) ||
        data.adresse.toLocaleLowerCase().includes(filter) ||
        data.mail.toLocaleLowerCase().includes(filter) ||
        data.tel.toLocaleLowerCase().includes(filter) ;
        
      }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.divView.nativeElement.scrollIntoView();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  getAllAssociation(){
    this.associationsService.getAssociationList().subscribe(data=>
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

  getListSponsors(){
    this.associationsService.getAssociationList().subscribe((data: any) => {
      this.lstAsso=data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      return data;
      
     
      });
  }

  
  
  imageURL: any;
  public message :string;
  userFile;
  public imagePath;

  onFileSelected(event: any) {
    if (event.target.files.length> 0)
    {
      const file: File = event.target.files[0];
      this.userFile = file;

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/)== null){
        this.openErrorSnackBar('Only images are supported')
        //this.message ="Only images are supported";
        console.log(this.message);
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

  submit() {
    if (!this.newForm.valid) {
      return;
    }
    if (this.newForm.valid) {
      const formData = new FormData();
      const sponsor = this.newForm.value;
      formData.append('association',JSON.stringify(sponsor));
      formData.append('file',this.userFile);
  
    this.associationsService.addA(formData).subscribe(
    data => {
      this.openSuccessSnackBar('Sponsor ajoutée avec succès !')
      this.getListSponsors();
      
    });
    this.formDirective1.resetForm();
    this.newForm.reset();
    this.step=4;
  }
  }
  


  deleteSponsor(numSponsor) {
    const dialogRef = this.dialog.open(RemoveSponsorDialogContent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.supprimerSponsor(numSponsor);
      }
    });
  }

  supprimerSponsor(numSponsor: any) {
    this.associationsService.deleteAssciation(numSponsor).subscribe(data => {
      this.getListSponsors();
    })
  }
  
  openDialogUpdateSponsor(numSponsor) {
    const dialogRef=this.dialog.open(UpdateSponsorComponent,
      { data:numSponsor
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getListSponsors();
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

  openErrorSnackBar(message: string) {
    this._snackBar.open(message, '', {
       duration: 4000,
       horizontalPosition:'center',
       verticalPosition:'bottom',
       panelClass:["snackbar-error-style"]
    });
  }



  refresh(): void {
    window.location.reload();
  }
  
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

 


}

