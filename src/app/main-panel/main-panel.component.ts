import { Component, inject, Input, OnInit } from '@angular/core';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { TransactionsListComponent } from "./pages/transactions-list/transactions-list.component";
import { Pages } from '../constants/pages.enum';
import { CreditComponent } from "./pages/credit/credit.component";
import { TransfersComponent } from "./pages/transfers/transfers.component";
import { RouterService } from '../core/services/router.service';

@Component({
  selector: 'app-main-panel',
  imports: [DashboardComponent, TransactionsListComponent, CreditComponent, TransfersComponent],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.css'
})
export class MainPanelComponent implements OnInit{
  /* @Input() page:Pages = Pages.DASHBOARD; */
  private readonly routerService = inject(RouterService); // em vez do construtor
  page!:Pages;
  pagesEnum=Pages;
  
  /* constructor(private readonly routerService: RouterService){} */
  
  ngOnInit(): void {
    console.log("Antes do Service=",this.page);
    this.page = this.routerService.getCurrentPage();
    console.log("Depois do Service=",this.page);
  }
}
