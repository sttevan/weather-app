import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { TempCardComponent } from './components/temp-card/temp-card.component';
import { TempCardSmallComponent } from './components/temp-card-small/temp-card-small.component';

@NgModule({
  declarations: [
    AppComponent,
    TempCardComponent,
    TempCardSmallComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
