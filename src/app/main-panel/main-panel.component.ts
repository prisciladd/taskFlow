import { Component } from '@angular/core';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { TransactionsListComponent } from "./pages/transactions-list/transactions-list.component";

@Component({
  selector: 'app-main-panel',
  imports: [DashboardComponent, TransactionsListComponent],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.css'
})
export class MainPanelComponent {

}
