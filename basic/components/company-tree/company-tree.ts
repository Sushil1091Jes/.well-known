import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NavController, AlertController, Events } from 'ionic-angular';
import { ICompany, IRoleLookup } from '../../../platform/interfaces/basic.interface';
import { BasicCompanyService } from '../../services/basic-company.service';
import { PlatformContextService } from '../../../platform/services/platform-context.service';
import { TranslateService } from '@ngx-translate/core';
import { SecureSubscribeForComponent } from '../../../platform/services/secure-subscribe';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';

@Component({
	selector: 'company-tree',
	templateUrl: 'company-tree.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyTree extends SecureSubscribeForComponent {

	@Input() companies: ICompany [];
	@Input() goToDesktop: boolean;
	company : ICompany;
	rolelookup :IRoleLookup;
	found: boolean = false;
	constructor(
		private NavController: NavController,
		private BasicCompanyService: BasicCompanyService,
		private AlertController: AlertController,
		private TranslateService: TranslateService,
		private Events: Events,
		// private App: App,
		private PlatformContextService: PlatformContextService,
	) {
		
		super();
		this.PlatformContextService.getCompanyInfo().then((data: any) => {
			if(data){
				({ company: this.company, rolelookup: this.rolelookup } = data);
			}
			
		});
	}

	ionViewWillEnter() {
		alert("ok")
		// this.PlatformContextService.getCompanyInfo().then((data: any) => {
		// 	({ company: this.company, rolelookup: this.rolelookup } = data);
		// });
	}
	ionViewDidLoad() {
		alert("ok")
	}
	classByType = function (rs) {
		let cls = ['svg-icon-comp-businessunit', 'svg-icon-comp-root', 'svg-icon-comp-profitcenter'],
			index = 0;
		if (rs && rs.companyType) {
			index = (rs.companyType - 1) % 3;
		}
		return cls[index];
	}
	isLeaf(item: ICompany) {
		return (!item.children) || (item.children.length === 0);
	}
	itemSelected(item: ICompany) {
		if (!this.isLeaf(item)) {
			this.NavController.push('basic-company', { item: item, goToDesktop: this.goToDesktop });
		} else if (item.companyType) {
			if(this.company){
				if(this.company.id===item.id){
					this.found=true;
				}else{
					this.found=false;
				}
			}
			Observable.forkJoin(
				this.BasicCompanyService.getRoleList(item),
				this.TranslateService.get(['platform.alert.ok', 'platform.alert.cancel','basic.company.selectRole']))
				.takeUntil(this.ngUnsubscribe)
				.subscribe(data => {
					const roles = data[0];
					const trans = data[1];
					let alert = this.AlertController.create({
						cssClass: 'alertCustomCss',
						subTitle:item.code + ' ' + item.name,
						title:trans['basic.company.selectRole']
					});
					// alert.setSubTitle(item.code + ' ' + item.name );
					// alert.setTitle(trans['basic.company.selectRole']);
					roles.forEach((data, index) => {
						alert.addInput({
							type: 'radio',
							label: data.value,
							value: data.key.toString(),
							checked:this.found===true ?this.rolelookup.value === data.value: index===0
						});
					});
					alert.addButton(trans['platform.alert.cancel']);
					alert.addButton({
						text: trans['platform.alert.ok'],
						handler: data => {
							if (data) {
								this.BasicCompanyService.saveContext(item.id, data);
								if (this.goToDesktop) {
									this.NavController.setRoot('desktop', {}, {
										animate: false
									});
								} else {
									this.Events.publish('change-company');
									this.Events.publish('clear-filter'),
									//this.App.getRootNav().setRoot('desktop');
									 
									 this.NavController.popToRoot();
									 //this.NavController.push('desktop');
									 //this.NavController.setRoot('desktop')
									// this.NavController.setRoot('desktop', {}, {
									// 	// 	animate: false
									// });
								}
							} 
						}
					});
					alert.present();
				});
		}
	}
}
