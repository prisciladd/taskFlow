import {
  Component,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  OnInit,
  inject,
} from '@angular/core';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { DashboardService } from './main-panel/pages/dashboard/services/dashboard.service';
import { LoginComponent } from './login/login.component';
import { RouterModule } from "@angular/router";

registerLocaleData(ptBr);

@Component({
  selector: 'app-root',
  imports: [LoginComponent, RouterModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly translate = inject(TranslateService);

  ngOnInit(): void {
    this.dashboardService.getAccountData();
  }

  constructor() {
    this.translate.addLangs(['pt-br', 'pt-pt']);
    this.translate.setFallbackLang(environment.defaultLang);
    this.translate.use(environment.defaultLang);
  }
}
