import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyPage } from './company-page';
import { TranslateModule } from "@ngx-translate/core";
import { BasicComponentsModule } from '../../components/components.module';

@NgModule({
	declarations: [
		CompanyPage
	],
	imports: [
		IonicPageModule.forChild(CompanyPage),
		TranslateModule,
		BasicComponentsModule
	],
	entryComponents: [CompanyPage]
})
export class CompanyPageModule {}
