import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlatformContextService } from '../../../platform/services/platform-context.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-root-page',
	template: ''
})
export class RootPage {

	constructor(
		public nav: NavController, 
		public navParams: NavParams,
		private PlatformContextService: PlatformContextService,
		private GoogleAnalytics: GoogleAnalytics,
		private Platform: Platform
	) { }

	ionViewDidLoad() {
		this.Platform.ready().then(() => {
			this.GoogleAnalytics.startTrackerWithId('UA-107045696-1')
			.then(() => {
				console.log('Google analytics is ready now');
				//the component is ready and you can call any method here
				// this.GoogleAnalytics.debugMode();
				// this.GoogleAnalytics.setAllowIDFACollection(true);
			  })
			  .catch(e => console.log('Error starting GoogleAnalytics', e));
		})
	}
	async ionViewCanEnter() {
		const touched = await this.PlatformContextService.isFirstTimeRun();
		if (!touched) {
			this.nav.push('basic-introduction', {}, { animate: false });
		} else {
			this.PlatformContextService.isSignedIn()
				// .catch((err: Error) => {
				// 	console.warn(err.message);
				// 	this.nav.push('basic-login', {}, {
				// 		animate: false
				// 	});
				// 	return Observable.of(err);
				// })
				.subscribe({
					next: valid => {
						if (valid) {
							this.nav.push('desktop', {}, {
								animate: false
							});
						}
					},
					error: err => {
						console.warn('auto login failed: ' + err.message);
						this.nav.push('basic-login', {}, {
							animate: false
						});
					}
				});
		}
	}
}
