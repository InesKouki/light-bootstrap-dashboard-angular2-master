import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { EvenementComponent } from '../evenement/evenement.component';
import { SponsorComponent } from '../sponsor/sponsor.component';
import { TypereclamationComponent } from '../typereclamation/typereclamation.component';

import { AssociationsComponent } from '../associations/associations.component';
import { DonationsComponent } from '../donations/donations.component';
import { AddAssociationComponent } from '../add-association/add-association.component';
import { AddTestComponent } from '../add-test/add-test.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },



    { path: 'Evenement',      component: EvenementComponent },
    { path: 'Sponsors',        component: SponsorComponent },

    { path: 'Associations',          component: AssociationsComponent },
    { path: 'Dons',           component: DonationsComponent },
    { path: 'addTest',        component: AddTestComponent },
    { path: 'Type Reclamation',        component: TypereclamationComponent },
];
