import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';
import { EditcategoryComponent } from './pages/category/editcategory/editcategory.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrderLdetailsComponent } from './pages/orders/order-details/order-details.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { ProductCreateComponent } from './pages/products/product-create/product-create.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { UserCreateComponent } from './pages/users/user-create/user-create.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { DisplayComponent } from './shared/display/display.component';
import { AuthGuard, UsersModule } from '@aditya/users';
const routes: Routes = [
    {
        path: '',
        component: DisplayComponent,
        canActivate:[AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'categories',
                component: CategoryComponent
            },
            {
                path: 'categories/:id',
                component: EditcategoryComponent
            },
            {
                path: 'products',
                component: ProductListComponent
            },
            {
                path: 'products/:id',
                component: ProductCreateComponent
            },
            {
                path: 'Addproduct',
                component: ProductCreateComponent
            },
            {
                path: 'users',
                component: UserListComponent
            },
            {
                path: 'users/:id',
                component: UserCreateComponent
            },
            {
                path: 'usersCreate',
                component: UserCreateComponent
            },
            {
                path: 'orders',
                component: OrderListComponent
            },
            {
                path: 'ordersCreate',
                component: OrderLdetailsComponent
            },
            {
                path: 'ordersDetail/:id',
                component: OrderLdetailsComponent
            },
            {
                path: 'logout',
                component: DashboardComponent
            }
        ]
    },
    {path:'**',
    redirectTo:'',
    pathMatch:'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),UsersModule],
    exports: [RouterModule]
})
export class AppRoutingModule {}
