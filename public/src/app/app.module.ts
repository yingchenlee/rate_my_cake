import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- import FormsModule.
import { AppComponent } from './app.component';
import { DisplaycakeComponent } from './displaycake/displaycake.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplaycakeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
