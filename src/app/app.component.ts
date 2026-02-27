import { Component, OnInit,DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
/* import { Pages } from './constants/pages.enum'; */
import { Observable } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SidebarComponent, MainPanelComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

 /* Sem Observable  
 
 currentPage: Pages = Pages.DASHBOARD;

  handleRedirectToPages(page:Pages): void{
    console.log("app",page);
    this.currentPage = page;

  } */

/* Com Observable */
    

    obs = new Observable((observer) => {
      
    })

    ngOnInit(){
      this.obs.subscribe({
        next: (res) => {
          console.log(res);
          
        },
        error: (err) =>{
          console.log(err);
          
        },
        complete: () =>{
          console.log("Finalizou");
          
        }
      })
    }
}
