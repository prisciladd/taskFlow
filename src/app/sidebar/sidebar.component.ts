import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Pages } from '../constants/pages.enum';
import { MenuIten } from '../models/menu-item.model';
import {MatButtonModule} from '@angular/material/button';
import { RouterService } from '../core/services/router.service';


@Component({
  selector: 'app-sidebar',
  imports: [MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent{

  /* page!:Pages; */
  /* @Output() redirectToPageEmitter = new EventEmitter<Pages>(); */

  private readonly routerService = inject(RouterService);

  menuItems: MenuIten[] = [
    {
      label: 'Dashboard',
      selected: true,
      icon: '',
      page: Pages.DASHBOARD,
    },
    {
      label: 'Extrato',
      selected: false,
      icon: '',
      page: Pages.TRANSACTIONS,
    },
    {
      label: 'Crédito',
      selected: false,
      icon: '',
      page: Pages.CREDIT,
    },
    {
      label: 'Transferências',
      selected: false,
      icon: '',
      page: Pages.TRANSFERS,
    },
  ];
  
  redirectToPage(page: Pages) {
    
    this.routerService.setCurrentPage(page);
    
    /* 
    Usado com @Input @Output
    this.redirectToPageEmitter.emit(page);
    */
}

/* 

COMUNICAÇÃO ENTRE COMPONENTES
  
  Do .ts para o template
    Interpolação de string {{}}

  Pai para filho
    @Input
    Property Binding []
  
  Filho para pai tem que emitir evento
    @Output
    Event Binding () (click)=""

  Pai para filho & Filho para pai
    two-way binding [()]

  Irmãos
    Estado centralizado (services ou ngrx)

    Exercício: fazer demais components e comunicações

    DashboardComponent
    TransactionListComponent
    TransferComponent
    CreditSimulatorComponent
    ProfileComponent
*/
}