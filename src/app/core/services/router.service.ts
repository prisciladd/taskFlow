import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pages } from '../../constants/pages.enum';
import { HttpClient } from '@angular/common/http';
import { TransactionsPagesEnum } from '../../main-panel/pages/transactions/constants/transaction-pages.enum';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  page!:Pages;
  /* private currentPage: Pages = Pages.DASHBOARD; */
  private readonly currentPageSubject = new BehaviorSubject<Pages>(Pages.DASHBOARD);
  private transactionPage$ = new BehaviorSubject<TransactionsPagesEnum>(TransactionsPagesEnum.LIST,);
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
  
  setTransactionPage(page:TransactionsPagesEnum):void{
    /* this.currentPage=page; */
    this.transactionPage$.next(page); //next dispara uma msg que será lida por quem se subscribe nele
    
  }
  
  getTransactionPage(){
    /* return this.currentPage */;
    return this.transactionPage$;
  } 
}

  /* 
Fonte: Behavior Subject https://dev.to/artem_turlenko/using-rxjs-subjects-and-behaviorsubjects-in-angular-45ag */