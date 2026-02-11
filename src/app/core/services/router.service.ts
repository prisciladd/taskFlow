import { Injectable } from '@angular/core';
import { Pages } from '../../constants/pages.enum';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  
  private currentPage: Pages = Pages.DASHBOARD;

  constructor() { }

  setCurrentPage(page:Pages):void{
    this.currentPage=page;
  }

  getCurrentPage():Pages{
    return this.currentPage
  }
}
