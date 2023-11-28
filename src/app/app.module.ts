import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
	declarations: [
		AppComponent,
		EmpAddEditComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule, 
		MatToolbarModule,
		MatIconModule,
		MatButtonModule, 
		MatDialogModule, 
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatRadioModule,
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule

	],
	exports: [FormsModule, ReactiveFormsModule],
	providers: [],
	bootstrap: [AppComponent], 
})
export class AppModule { 

	

}
