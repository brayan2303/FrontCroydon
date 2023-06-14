import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandPageComponent } from './land-page/land-page.component';
import { MenuComponent } from './menu/menu.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RegistreComponent } from './registre/registre.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './registre/modal/edit.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LandPageComponent,
    MenuComponent,
    RegistreComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LazyLoadImageModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
