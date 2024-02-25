import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppsContolComponent } from './Components/apps-contol/apps-contol.component';

const routes: Routes = [
  { path: 'apps', component: AppsContolComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
