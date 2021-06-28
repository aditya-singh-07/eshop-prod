import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'eshop-admin-root',
    templateUrl: './app.component.html'
})
export class AppComponent{
    title = 'eshop-admin';


    constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
     
    }
}


