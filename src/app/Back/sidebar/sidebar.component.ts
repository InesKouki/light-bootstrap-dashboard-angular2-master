import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },

    { path: '/user', title: 'Utilisteurs',  icon:'pe-7s-user', class: '' },
    { path: '/Organisation', title: 'Organisations',  icon:'pe-7s-user', class: '' },

    { path: '/Evenement', title: 'Evenement',  icon:'pe-7s-note2', class: '' },
    { path: '/Sponsors', title: 'Sponsors',  icon:'pe-7s-news-paper', class: '' },

    { path: '/Associations', title: 'Associations',  icon:'pe-7s-news-paper', class: '' },
    { path: '/Dons', title: 'Dons',  icon:'pe-7s-news-paper', class: '' },

    { path: '/Categorie', title: 'Categories',  icon:'pe-7s-science', class: '' },
    { path: '/Produits', title: 'Produits',  icon:'pe-7s-map-marker', class: '' },

    { path: '/Reclamations', title: 'Reclamations',  icon:'pe-7s-bell', class: '' },
    { path: '/Type Reclamation', title: 'Type Reclamations',  icon:'pe-7s-bell', class: '' },

    { path: '/Blog', title: 'Blogs',  icon:'pe-7s-bell', class: '' },
    { path: '/Article', title: 'Articles',  icon:'pe-7s-bell', class: '' },


    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
