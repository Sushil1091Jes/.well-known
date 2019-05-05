import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage({
	name: 'basic-introduction'
})
@Component({
	selector: 'page-introduction-page',
	templateUrl: 'introduction-page.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroductionPage {
	@ViewChild(Slides) slides: Slides;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private Platform: Platform,
		private StatusBar: StatusBar,
	) {
		Platform.ready().then(() => {
			StatusBar.hide();
		});

	}
	ionViewWillLeave() {
		this.Platform.ready().then(() => {
			this.StatusBar.show();
		});
	}
	ionViewDidLoad() {
		// console.log('%c', 'background: url(http://localhost:8100/assets/img/YTWO Formative.svg) no-repeat;line-height:150px;padding:50px 100px;background-size:200px');
		setTimeout(() => {
			this.slides.setElementClass('fadeIn', true);
		}, 800);
	}
	enter() {
		this.navCtrl.push('basic-login', {}, {
			animation: 'wp-transition'
		});
	}
	// ionViewWillLeave() {
	// 	var dom = $(this.ViewController.pageRef().nativeElement);
	// 	dom.fadeOut();
	// }
}