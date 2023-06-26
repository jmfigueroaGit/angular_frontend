import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientPostComponent } from './components/client-post/client-post.component';
import { ClientListComponent } from './components/client-list/client-list.component';

import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table/table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ClientUpdateComponent } from './components/client-update/client-update.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    ClientPostComponent,
    ClientListComponent,
    TableComponent,
    SnackBarComponent,
    ClientUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/edit.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/delete.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'check_circle',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/check_circle.svg'
      )
    );
  }
}
