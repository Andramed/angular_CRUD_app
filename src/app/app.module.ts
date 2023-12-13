import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AuthComponent } from './auth/auth.component';
import { FormAuthComponent } from './auth/form-auth/form-auth.component';
import { MaterialModule } from './module/material.module';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../environments/environment.prod';
import { DecodedState } from './services/storeNgxs/states/user.state';
import { TokenState } from './services/storeNgxs/states/token.state';
import { GuardService } from './services/guard.service';
import { LOCAL_STORAGE_ENGINE, NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { DialogWindowAddManagerComponent } from './dialog-window-add-manager/dialog-window-add-manager.component';
@NgModule({
	declarations: [
		AppComponent,
		EmpAddEditComponent,
		AuthComponent,
		FormAuthComponent,
  DialogWindowAddManagerComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule, 
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,
		MaterialModule,
		NgxsModule.forRoot([DecodedState, TokenState, ], {
			developmentMode: !environment.production
		}),
		NgxsReduxDevtoolsPluginModule.forRoot(),
		NgxsStoragePluginModule.forRoot({
			key: "myToken",
		})
		
	],
	exports: [FormsModule, ReactiveFormsModule],
	providers: [GuardService],
	bootstrap: [AppComponent], 
})
export class AppModule { 

	

}
