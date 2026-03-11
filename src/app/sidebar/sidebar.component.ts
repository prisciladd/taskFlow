import { Component, HostListener, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MenuIten } from '../models/menu-item.model';
import { MatDividerModule } from '@angular/material/divider';
import { Pages } from '../constants/pages.enum';

@Component({
  selector: 'app-sidebar',
  imports: [MatButtonModule, RouterModule, MatIconModule, MatDividerModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  menuItems: MenuIten[] = [
    {
      label: 'Dashboard',
      selected: true,
      icon: 'account_balance',
      page: Pages.DASHBOARD,
    },
    {
      label: 'Transações',
      selected: false,
      icon: 'receipt_long',
      page: Pages.TRANSACTIONS,
    },
    {
      label: 'Empréstimos',
      selected: false,
      icon: 'payments',
      page: Pages.LOAN,
    },
    {
      label: 'Transferências',
      selected: false,
      icon: 'transfer_within_a_station',
      page: Pages.TRANSFERS,
    },
    {
      label: 'Perfil',
      selected: false,
      icon: 'person',
      page: Pages.PROFILE,
    }
  ];

  open = signal(false);

  toggle() {
    this.open.update((v) => !v);
  }
  close() {
    this.open.set(false);
  }

  // fecha automaticamente quando for desktop
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 960 && this.open()) this.open.set(false);
  }

  redirectToPage() {
    this.close();
  }
}
