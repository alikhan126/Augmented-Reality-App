import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGaurdService } from 'src/app/auth-gaurd.service';
import { ArComponent } from './ar/ar.component';

const routes:Routes=[
  {path:'digital-mi-display',component:ArComponent,canActivate:[AuthGaurdService]},
  {path: '',   redirectTo: '/', pathMatch: 'full'}

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
