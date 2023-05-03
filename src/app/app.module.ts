import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './Back/sidebar/sidebar.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './Back/admin-layout/admin-layout.component';
import { EvenementComponent } from './Back/evenement/evenement.component';
import { SponsorComponent } from './Back/sponsor/sponsor.component';
import { TypereclamationComponent } from './Back/typereclamation/typereclamation.component';
import { RemoveEventDialogContent } from './Back/evenement/remove-event-dialog-content';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatExpansionModule } from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UpdateEventComponent } from './Back/evenement/update-event/update-event';
import { SponsorsEventDialogComponent } from './Back/evenement/sponsors-event-dialog/sponsors-event-dialog.component';
import { ParticipantsEventComponent } from './Back/evenement/participants-event/participants-event.component';
import { UpdateSponsorComponent } from './Back/sponsor/update-sponsor/update-sponsor.component';
import { RemoveSponsorDialogContent } from './Back/sponsor/remove-sponsor-dialog-content';
import { HomeComponent } from './Back/home/home.component';
import { NgChartsModule } from 'ng2-charts';
import { AssociationsComponent } from './Back/associations/associations.component';
import { DonationsComponent } from './Back/donations/donations.component';
import { UpdateAssociationComponent } from './Back/update-association/update-association.component';
import { ListDonationsComponent } from './Back/list-donations/list-donations.component';
import { AddAssociationComponent } from './Back/add-association/add-association.component';
import { AddTestComponent } from './Back/add-test/add-test.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatCardModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgChartsModule,

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    EvenementComponent,
    SponsorComponent,
    DonationsComponent,
    AssociationsComponent,
    TypereclamationComponent,
    RemoveEventDialogContent,
    UpdateEventComponent,
    SponsorsEventDialogComponent,
    ParticipantsEventComponent,
    UpdateSponsorComponent,
    RemoveSponsorDialogContent,
    HomeComponent,
    UpdateAssociationComponent,
    ListDonationsComponent,
    AddAssociationComponent,
    AddTestComponent
    

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
