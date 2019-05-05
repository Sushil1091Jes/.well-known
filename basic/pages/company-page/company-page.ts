import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasicCompanyService } from '../../services/basic-company.service';
import { PlatformContextService } from '../../../platform/services/platform-context.service';
import { ICompany } from '../../../platform/interfaces/basic.interface';
import { PageGateProvider, TokenGuard, PageGate } from '../../../platform/services/page-gate.service';
import 'rxjs/add/operator/takeUntil';

@IonicPage({
	name: 'basic-company'
})
@Component({
	selector: 'page-company-page',
	templateUrl: 'company-page.html',
	providers: [PageGateProvider([TokenGuard])]
})
export class CompanyPage extends PageGate {
	companies: ICompany [];
	goToDesktop: boolean;
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private BasicCompanyService: BasicCompanyService,
		private PlatformContextService: PlatformContextService,
		public TokenGuard: TokenGuard
		) {
		super([TokenGuard]);
	}
	ionViewDidLoad() {
		let childCompany: ICompany = this.navParams.get('item');
		this.goToDesktop = this.navParams.get('goToDesktop') || false;
		if (childCompany) {
			this.companies = childCompany.children;
		} else {
			this.PlatformContextService.isReady.then(() => {
				this.BasicCompanyService.getCompanyList()
				.takeUntil(this.ngUnsubscribe)
				.subscribe((data: ICompany []) => {
					this.companies = data;
				});
			});
		}
	}

}
