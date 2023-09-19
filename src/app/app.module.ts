import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatComponent } from './mat/mat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BottomSheetOverviewExampleSheetComponent } from './mat/bottom-sheet-overview-example-sheet/bottom-sheet-overview-example-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
   // BottomSheetOverviewExampleSheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
