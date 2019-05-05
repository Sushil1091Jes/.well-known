import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RootPageModule } from './pages/root-page/root-page.module';
import { LoginPageModule } from './pages/login/login-page.module';
import { IntroductionPageModule } from './pages/introduction/introduction-page.module';
import { CompanyPageModule } from './pages/company-page/company-page.module';
import { BasicDataService } from './services/basic-data.service';
import { BasicCompanyService } from './services/basic-company.service';
import { AboutPageModule } from './pages/about/about.module';

@NgModule({
	imports: [
		LoginPageModule,
		RootPageModule,
		IntroductionPageModule,
		CompanyPageModule,
		AboutPageModule
	],
	exports: [
	],
	providers: [ BasicDataService, BasicCompanyService ]
})
/**
 * BasicModule is kind like PlatformModule, the difference is that BasicModule provides data related to business.
 * Never import BasicModule to any other module except AppModule.
 */
export class BasicModule {
	constructor(BasicModule: BasicModule) {
		if (BasicModule) {
			throw new Error(
			'BasicModule is already loaded. Import it in the AppModule only');
		}
	}
}
