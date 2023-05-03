import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../_services/event.service';
import { RemoveEventDialogContent } from './remove-event-dialog-content';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEventComponent } from './update-event/update-event';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SponsorService } from '../_services/sponsor.service';
import { SponsorsEventDialogComponent } from './sponsors-event-dialog/sponsors-event-dialog.component';
import { Router } from '@angular/router';
import { ParticipantsEventComponent } from './participants-event/participants-event.component';
import { environment } from 'environments/environment';




@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss']
})
export class EvenementComponent implements OnInit {
  BASE_URL = `${environment.apiBaseUrl}/association/`;
  displayedColumns: string[] = ['nomEvent', 'description', 'dateDebut', 'dateFin','nbrPlace','prix','imageFile','actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('formDirective3') private formDirective3: NgForm;
  @ViewChild('formDirective1') private formDirective1: NgForm;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("myDiv") divView: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  eventSearch:any[];
  events:any[];
  sponsors: any[];
  users: any[];
  newForm: FormGroup;
  assignToEventForm: FormGroup;
  nonSponsors:any[];
  details:any;
  currentEvent = null;
  currentIndex = -1;
  titre = '';
  panelOpenState = false;
  step = 4;


  constructor(private EventService: EventService,
    private SponsorsService: SponsorService,
    public dialog:MatDialog,
    private router:Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,) {

      this.dataSource = new MatTableDataSource();
     

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        
        return  data.nomEvent.toLocaleLowerCase().includes(filter) ||
        data.description.toLocaleLowerCase().includes(filter) ||
        data.dateDebut.toLocaleLowerCase().includes(filter) ||
        data.dateFin.toLocaleLowerCase().includes(filter) ;
        
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

  ngOnInit() {
    this.newForm = this.formBuilder.group({
      nomEvent: [null, Validators.required],
      description: [null,Validators.required],
      dateDebut: [null, Validators.required],
      dateFin: [null,Validators.required],
      nbrPlace: [null,Validators.required],
      prix: [null,Validators.required],
      fileName: [null, Validators.required]
    });

    this.assignToEventForm = this.formBuilder.group({
      selectEvent: [null, Validators.required],
      selectSponsors: [null, Validators.required]
    });

    this.getListEvents();
    this.getListSponsors();
    
}

setStep(index: number) {
  this.step = index;
}

getListEvents(){
  this.EventService.geteventList().subscribe((data: any) => {
    this.events=data;
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(data);
    return data;
    
   
    });
}

getListSponsors() {
  this.SponsorsService.getSponsorsList().subscribe(data => {
    this.sponsors = data;
  });
  }

  getEventInForm() {
    return this.assignToEventForm.get('selectEvent').value;   
  }

  getNonSponsors(id) {
    this.EventService.getNonSponsorsDuEvent(id).subscribe(data=>{
      this.nonSponsors=data;
    })
  }

  onEventChange() {
    const eventId = this.assignToEventForm.get('selectEvent').value;
    this.getNonSponsors(eventId);
    console.log(eventId);
  }

  hasSponsors(numEvent:number):boolean {
    for (var e of this.events) {
      if (e.numEvent==numEvent) {
        if (e.sponsors.length==0) {
          return false
        }
      }
    }
    return true;
  }



  downloadPDF(numEvent: number) {
    this.EventService.getPDF(numEvent).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      window.open(url);
    });
  }
  openDialogParticipant(id) {
    this.dialog.open(ParticipantsEventComponent, {
      data:id
    });
  
  }
  hasParticipant(numEvent:number):boolean {
    for (var e of this.events) {
      if (e.numEvent==numEvent) {
        if (e.users.length==0) {
          return false
        }
      }
    }
    return true;
  }

  openDialogRemoveUser(ide,idu) {
    const dialogRef = this.dialog.open(ParticipantsEventComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.unassign(ide,idu);
      }
    });
  }

  openDialogUnassign(ide,ids) {
    const dialogRef = this.dialog.open(SponsorsEventDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.unassign(ide,ids);
      }
    });
  }

  getEventDetails(id) {
    this.EventService.getEventDetails(id).subscribe((data: any) => {
      this.details=data;
      });
  }

  unassign(ide: number,ids: number) {
    this.EventService.unassign(ide,ids).subscribe(data => {
    this.getListEvents();
    
    })
  }

  submitAssignToEvent() {
    if (!this.assignToEventForm.valid) {
      return;
    }
    this.EventService.assign(this.assignToEventForm.value.selectEvent,this.assignToEventForm.value.selectSponsors).subscribe(
    data => {
      this.openSuccessSnackBar('Le sponsors a été ajouté a levent !')
      this.getListEvents();
      this.getListSponsors();
  
     
    });
    this.formDirective3.resetForm();
    this.assignToEventForm.reset();
    this.step=4;
  }
  imageURL: any;
  //public message :string;
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
  submit() {
    if (!this.newForm.valid) {
      return;
    }
    if (this.newForm.valid) {
      const formData = new FormData();
      const event = this.newForm.value;
    //  console.log(this.newForm.value);
      formData.append('event',JSON.stringify(event));
      formData.append('file',this.userFile);
  
    this.EventService.add(formData).subscribe(
    data => {
      this.openSuccessSnackBar('Evenement ajoutée avec succès !')
      this.getListEvents();
      
    });
    this.formDirective1.resetForm();
    this.newForm.reset();
    this.step=4;
  }
  }


deleteEvent(numEvent) {
  const dialogRef = this.dialog.open(RemoveEventDialogContent);

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.supprimerEvent(numEvent);
    }
  });
}

supprimerEvent(numEvent: number) {
  this.EventService.deleteEvent(numEvent).subscribe(data => {
    this.getListEvents();
  })
}

openDialogUpdateEvent(numEvent) {
  const dialogRef=this.dialog.open(UpdateEventComponent,
    { data:numEvent
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getListEvents();
    });
}

openDialogSponsors(id) {
  this.dialog.open(SponsorsEventDialogComponent, {
    data:id
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
