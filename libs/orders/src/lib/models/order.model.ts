import { orderitems} from './orderitems.model';
import { user} from '../../../../users/src/lib/models/user.model';
export class order{
    id?:string;
    orderitems?:orderitems[];
    shippingAddress1?:String;
    shippingAddress2?:String;
    city?:String;
    zipcode?:String;
    country?:String;
    phone?:String;
    status?:string;
    totalPrice?:Number;
    user?:any;
    dateOrder?:string;

}