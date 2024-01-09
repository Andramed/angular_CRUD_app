import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidenavComponent} from './sidenav.component'
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';
// import { DashboardsComponent } from '../dashboards/dashboards.component';
const routes: Routes = [
	// {path: 'home', component: DashboardsComponent}
]

@NgModule({
	declarations: [SidenavComponent],
	imports: [
		CommonModule,
		MatSidenavModule,
		MatSelectModule,
		MatButtonModule,
		MatFormFieldModule,
		RouterModule.forRoot(routes)
	],
	exports: [SidenavComponent]
})


export class SideNavModule {

}