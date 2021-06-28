import { CartsService } from '@aditya/orders';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'eshop-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private cartService:CartsService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.cartService.isUpdated.subscribe((data)=>{

      if(data){
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: "Removed Item"
      });
      }else{
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: "Added to Cart"
      });
      }

    },
    ()=>{
      this.messageService.add({
        severity: 'Danger',
        summary: 'Failed',
        detail: "failed to Update cart"
    });
    }
    )

  }

}
