import {
  Component,
  OnInit,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  inject,
} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { Observable } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { AccountStore } from './main-panel/pages/dashboard/services/account.store';
registerLocaleData(ptBr);

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SidebarComponent, MainPanelComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private accountState = inject(AccountStore);
  private translate = inject(TranslateService);

  ngOnInit(): void {
    this.accountState.getAccount();
  }

  constructor() {
    this.translate.addLangs(['pt-br','pt-pt']);
    this.translate.setFallbackLang(environment.defaultLang);
    this.translate.use(environment.defaultLang);

  }
}
