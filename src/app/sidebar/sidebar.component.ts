import { Component, HostListener, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MenuIten } from '../models/menu-item.model';
import { MatDividerModule } from '@angular/material/divider';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  imports: [MatButtonModule, RouterModule, MatIconModule, MatDividerModule, TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  router = inject(Router);

  menuItems: MenuIten[] = [
    {
      label: 'SIDEBAR.DASHBOARD',
      selected: true,
      icon: 'account_balance',
      page: '/home/dashboard',
    },
    {
      label: 'SIDEBAR.TRANSACTIONS',
      selected: false,
      icon: 'receipt_long',
      page: '/home/transacoes',
    },
    {
      label: 'SIDEBAR.LOAN',
      selected: false,
      icon: 'payments',
      page: '/home/emprestimo',
    },
    {
      label: 'SIDEBAR.TRANSFER',
      selected: false,
      icon: 'transfer_within_a_station',
      page: '/home/transferencia',
    },
    {
      label: 'SIDEBAR.PROFILE',
      selected: false,
      icon: 'person',
      page: '/home/perfil',
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
