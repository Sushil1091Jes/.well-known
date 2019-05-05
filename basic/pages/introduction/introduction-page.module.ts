import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntroductionPage } from './introduction-page';
import { TranslateModule } from "@ngx-translate/core";
import { BasicComponentsModule } from '../../components/components.module';

@NgModule({
	declarations: [
		IntroductionPage,
	],
	imports: [
		IonicPageModule.forChild(IntroductionPage),
		TranslateModule,
		BasicComponentsModule
	],
	exports: [
		IntroductionPage
	]
})
export class IntroductionPageModule {}
