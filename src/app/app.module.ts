import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth';


import { AppComponent } from './app.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ArComponent } from './ar/ar.component';

@NgModule({
  declarations: [
    AppComponent,
    ArComponent
  ],
  imports: [
    BrowserModule,
    WebBluetoothModule.forRoot({
      // Cannot be made false. GitHub issue: https://github.com/manekinekko/angular-web-bluetooth/issues/41
      enableTracing: true
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
