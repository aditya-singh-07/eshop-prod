import { category } from './category';

export class product {
    id?:String;
    name?: String;
    description?: String;
    descriptionDetails?: String;
    image?: String;
    images?: String;
    brand?: String;
    price?: Number;
    category?: category;
    productStock?: Number;
    rating?: Number;
    numReview?: Number;
    isFeatured?: Boolean;
    dateCreated?: Date;
}
