import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pages } from '../../constants/pages.enum';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  page!:Pages;
  /* private currentPage: Pages = Pages.DASHBOARD; */
  private readonly currentPageSubject = new BehaviorSubject<Pages>(Pages.DASHBOARD);
  pageOn$ = this.currentPageSubject.asObservable();

  constructor() { }

  setCurrentPage(page:Pages):void{
    /* this.currentPage=page; */
    this.currentPageSubject.next(page);
    
  }
  
  getCurrentPage(){
      /* return this.currentPage */;
      return this.pageOn$;
  } 
}
/* 
Fonte: https://dev.to/artem_turlenko/using-rxjs-subjects-and-behaviorsubjects-in-angular-45ag */