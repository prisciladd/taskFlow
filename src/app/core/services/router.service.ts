import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pages } from '../../constants/pages.enum';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  page!:Pages;
  /* private currentPage: Pages = Pages.DASHBOARD; */
  private readonly currentPageSubject = new BehaviorSubject<Pages>(Pages.DASHBOARD);
  pageOn$ = this.currentPageSubject.asObservable(); //convenção utilizar $

  constructor() { }

  setCurrentPage(page:Pages):void{
    /* this.currentPage=page; */
    this.currentPageSubject.next(page); //next dispara uma msg que será lida por quem se subscribe nele
    
  }
  
  getCurrentPage(){
      /* return this.currentPage */;
      return this.pageOn$;
  } 
}
/* 
Fonte: https://dev.to/artem_turlenko/using-rxjs-subjects-and-behaviorsubjects-in-angular-45ag */