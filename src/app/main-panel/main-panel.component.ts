import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { Pages } from '../constants/pages.enum';
import { CreditComponent } from './pages/credit/credit.component';
import { TransfersComponent } from './pages/transfers/transfers.component';
import { RouterService } from '../core/services/router.service';
import { first } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ListTransactionsComponent } from "./pages/transactions/component/list-transactions/list-transactions.component";

@Component({
  selector: 'app-main-panel',
  imports: [
    DashboardComponent,
    TransactionsComponent,
    CreditComponent,
    TransfersComponent,
    ListTransactionsComponent
],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.css',
})
export class MainPanelComponent implements OnInit {
  /* @Input() page:Pages = Pages.DASHBOARD; */
  private readonly routerService = inject(RouterService); // em vez do construtor
  private readonly destroyRef = inject(DestroyRef);

  page!: Pages;
  pagesEnum = Pages;
  pageActive!: Pages;

  /* constructor(private readonly routerService: RouterService){} */

  ngOnInit() {
    /* this.routerService.pageOn$.pipe(first()).subscribe(page => { */ //subscribe tem até 3 callback next, error, complete. Pipe first para retornar só 1 resutado da api. Take until destroyed fica escutando até o componente ser destruído.
    this.routerService.pageOn$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((page) => {
        //Take until destroyed fica escutando até o componente ser destruído.
        this.pageActive = page;
      });
  }
}
