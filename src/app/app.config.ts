import { Routes, provideRouter } from "@angular/router";

import { ApplicationConfig } from "@angular/core";


import { AppsContolComponent } from "./Components/apps-contol/apps-contol.component";
const appRoutes: Routes =[
    { path: 'apps', component: AppsContolComponent},
    
];
 
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes)]
};