import { Component, EventEmitter, inject, OnInit, Output, signal, HostListener, Input } from '@angular/core';
import { Pages } from '../constants/pages.enum';
import { MenuIten } from '../models/menu-item.model';
import {MatButtonModule} from '@angular/material/button';
import { RouterService } from '../core/services/router.service';
import { MatIcon } from "@angular/material/icon";


@Component({
  selector: 'app-sidebar',
  imports: [MatButtonModule, MatIcon],
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
      label: 'Transações',
      selected: false,
      icon: '',
      page: Pages.TRANSACTIONS,
    },
    {
      label: 'Empréstimos',
      selected: false,
      icon: '',
      page: Pages.LOAN,
    },
    {
      label: 'Transferências',
      selected: false,
      icon: '',
      page: Pages.TRANSFERS,
    },
  ];
    
  open = signal(false);

  toggle() { this.open.update(v => !v); }
  close()  { this.open.set(false); }

  // fecha automaticamente quando for desktop
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 960 && this.open()) this.open.set(false);
  }


  redirectToPage(page: Pages) {
    
    this.routerService.setCurrentPage(page);

    this.close();
    
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