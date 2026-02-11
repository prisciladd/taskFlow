import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
/* import { Pages } from './constants/pages.enum'; */
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SidebarComponent, MainPanelComponent],
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
    count = 0

    obs = new Observable((observer) => {
      
      observer.next(this.count);
      this.count++
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
