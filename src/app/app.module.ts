import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GloveComponent } from './glove/glove.component';
import { HelmetComponent } from './helmet/helmet.component';
import { FieldComponent } from './field/field.component';

@NgModule({
  declarations: [
    AppComponent,
    GloveComponent,
    HelmetComponent,
    FieldComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
