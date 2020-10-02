import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

// Metadados
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],

  // primeiro componente a iniciar
  bootstrap: [AppComponent]
})

// Gerando a classe em typescript
export class AppModule { }
