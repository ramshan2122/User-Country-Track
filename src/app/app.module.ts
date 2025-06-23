import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';



import { MatSelectModule } from '@angular/material/select';

import { MatDialogModule } from '@angular/material/dialog';
import { ExitConfirmDialogComponent } from './components/exit-confirm-dialog/exit-confirm-dialog.component';
import { AlertdialogComponent } from './components/alertdialog/alertdialog.component';
import { ConfirmdialogComponent } from './shared/confirmdialog/confirmdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    ExitConfirmDialogComponent,
    AlertdialogComponent,
    ConfirmdialogComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,AsyncPipe,
    CommonModule, HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule 
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
