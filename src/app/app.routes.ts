import { ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { ReactiveformsComponent } from './reactiveforms/reactiveforms.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ReuseComponent } from './reuse/reuse.component';

export const routes: Routes = [

    {path:'json',component:ReactiveformsComponent},
    {path:'crud',component:CreateEmployeeComponent},
    {path:'reuse',component:ReuseComponent}
];
