import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpAddEditComponent } from './component/emp-add-edit/emp-add-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthComponent } from './auth/auth.component';
import { FormAuthComponent } from './auth/form-auth/form-auth.component';
import { MaterialModule } from './module/material.module';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../environments/environment.prod';
import { DecodedState } from './services/storeNgxs/states/user.state';
import { TokenState } from './services/storeNgxs/states/token.state';
import { GuardService } from './services/guard.service';
import {  NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { DialogWindowAddManagerComponent } from '../app/component/dialog-window-add-manager/dialog-window-add-manager.component';
import { InterceptorService } from './services/interceptor.service';
import { EmpState } from './services/storeNgxs/states/empState.state';

import { EmployeeComponent } from './component/employee/employee.component';
import { DashboardsComponent } from './component/dashboards/dashboards.component';
import { SettingsComponent } from './component/settings/settings.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { BreadCrumbComponent } from './component/bread-crumb/bread-crumb.component';
import { LayoutComponent } from './component/layout/layout.component';
import {SideNavModule} from '../app/component/sidenav/sidenav.module';

import { RouterModule, Routes } from '@angular/router';
import { BookmarkComponent } from './component/bookmark/bookmark.component';
import { ManagersComponent } from './component/managers/managers.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ManagersState } from './services/storeNgxs/states/managers.state';
import { AuthGuard } from './guards/auth.guard';
import { LOGIN_ROUTE } from './constants';


const routes: Routes = [
	{path: "", redirectTo: `/home`, pathMatch: 'full'},
	{path: 'home', component: DashboardsComponent, canActivate: [AuthGuard]}, //canActivate: [AuthGuard]
	{path: 'bookmark', component: BookmarkComponent, canActivate: [AuthGuard]},
	{path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
	{path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
	{path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard]},
	{path: 'manager', component: ManagersComponent, canActivate: [AuthGuard]},
	{path: "signin", component: FormAuthComponent },
	

]

@NgModule({
	declarations: [
		AppComponent,
		EmpAddEditComponent,
		AuthComponent,
		FormAuthComponent,
		
		EmployeeComponent,
		DashboardsComponent,
		SettingsComponent,
		DialogWindowAddManagerComponent,
		ToolbarComponent,
		BreadCrumbComponent,
		LayoutComponent,
		BookmarkComponent,
		ManagersComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule, 
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,
		MaterialModule,
		MatToolbarModule,
		NgxsModule.forRoot([DecodedState, TokenState, EmpState, ManagersState], {
			developmentMode: !environment.production
		}),
		NgxsReduxDevtoolsPluginModule.forRoot(),
		NgxsStoragePluginModule.forRoot({
			key: "myToken",	
		}),
		SideNavModule,
  		RouterModule.forRoot(routes),
		MatPaginatorModule,
		MatInputModule,
		MatFormFieldModule,
		MatSortModule,
		MatTableModule,
		
	],
	exports: [FormsModule, ReactiveFormsModule],
	providers: [
		GuardService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptorService,
			multi: true 
		},
		
		
	],
	bootstrap: [AppComponent], 
})
export class AppModule { 

	

}
