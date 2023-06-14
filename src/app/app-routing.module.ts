import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandPageComponent } from './land-page/land-page.component';
import { RegistreComponent } from './registre/registre.component';

const routes: Routes = [
  {path: '', component: LandPageComponent},
  {path: 'crear', component: RegistreComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
