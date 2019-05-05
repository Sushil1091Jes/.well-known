import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login-page';
import { BasicComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		LoginPage
	],
	imports: [
		IonicPageModule.forChild(LoginPage),
		BasicComponentsModule,
		TranslateModule
	],
	entryComponents: [
		LoginPage
	]
})
export class LoginPageModule {}
