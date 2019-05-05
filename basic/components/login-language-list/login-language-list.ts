import { Component, ViewChild } from '@angular/core';
import { PlatformContextService } from '../../../platform/services/platform-context.service';
import { FabContainer } from 'ionic-angular';
import { ISysContext } from '../../../platform/interfaces/platform.interface';
import { SecureSubscribeForComponent } from '../../../platform/services/secure-subscribe';
import 'rxjs/add/operator/takeUntil';

@Component({
	selector: 'login-language-list',
	templateUrl: 'login-language-list.html'
})
export class LoginLanguageList extends SecureSubscribeForComponent {

	text: string;
	languageList: any [] = [];
	selected: string;
	mapping: any;
	@ViewChild('fab') fab: FabContainer;
	constructor(
		private PlatformContextService: PlatformContextService
	) {
		super();
		enum mapping {en = <any>'EN', zh = <any>'中', de = <any>'DE'};
		this.mapping = mapping;
	}
	ngOnInit() {
		this.PlatformContextService.isReady.then(() => {
			this.PlatformContextService.getLocalLanguageList()
				.switchMap(data => {
					data.forEach(lang => {
						this.languageList.push(this.mapping[lang.lang]);
					});
					this.languageList.reverse();
					return this.PlatformContextService.getSysContext();
				})
				.takeUntil(this.ngUnsubscribe)
				.subscribe((value: ISysContext) => {
					this.selected = this.mapping[value.language];
				});
		});
		// this.PlatformContextService.languageList.forEach(lang => {
		// 	this.languageList.push(this.mapping[lang.lang]);
		// });
		// this.PlatformContextService.getSysContext()
		// .takeUntil(this.ngUnsubscribe)
		// .subscribe((value:ISysContext) => {
		// 	this.selected = this.mapping[value.language];
		// });
		// 	this.languageList.reverse();
		// });
	}
	changeLang(lang) {
		this.PlatformContextService.setLanguage(this.mapping[lang]).subscribe(() => {
			this.selected = lang;
			this.fab.close();
		})
	}
}
