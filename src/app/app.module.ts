import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NumberOnlyDirective } from './NumberOnly.directive';

@NgModule({
  declarations: [
    AppComponent, NumberOnlyDirective
  ],
  imports: [
    BrowserModule,
    HttpModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
