import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule, MatCard, MatCardContent } from '@angular/material/card';
import { DashboardService } from './services/dashboard.service';
import { Address } from './models/address.model';
import { Account } from './models/account.model';

@Component({
  selector: 'app-dashboard',
  imports: [MatCard, MatCardContent, CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  private readonly dashbordService = inject(DashboardService)

 /*  address?: Address */
  acount?: Account;

  ngOnInit(): void {
    /* this.dashbordService.getAddressByZipCode().subscribe({
      next: (res) =>{
        this.address = res;
      },
      error: (err) =>{
        console.log(err)
      }
    }) */
   this.dashbordService.getAccount().subscribe({
    next: (res) => {
        this.acount = res;
    },
    error: (err) => {
      console.log("Erro ao buscar dados da conta na api",err);
      
    },
    
   });
   
   
  }
}
