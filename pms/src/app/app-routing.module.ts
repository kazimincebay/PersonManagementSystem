import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';

const routes: Routes = [
  {
    path:"",
    component:AppComponent,
  },
  {
    path:"Person",
    component:AppComponent,
  },
  {
    path:"Person/:personId",
    component:DialogComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
