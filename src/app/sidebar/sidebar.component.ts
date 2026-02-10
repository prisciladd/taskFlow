import { Component, EventEmitter, Output } from '@angular/core';
import { Pages } from '../constants/pages.enum';
import { MenuIten } from '../models/menu-item.model';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Output() redirectToPageEmitter = new EventEmitter<Pages>();

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
  ];

  redirectToPage(page: Pages): void {
    console.log("sidebar",page);
    this.redirectToPageEmitter.emit(page);
  }
}

/* 

COMUNICAÇÃO ENTRE COMPONENTES
  Pai para filho
    Interpolação de string {{}}
    Property Binding []
  
  Filho para pai
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
