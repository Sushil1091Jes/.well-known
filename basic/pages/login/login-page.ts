import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController, NavController } from 'ionic-angular';
import { ILoginForm } from '../../../platform/interfaces/basic.interface';
import { BasicDataService } from '../../services/basic-data.service';
import { AlertService } from '../../../platform/services/alert.service';
import { IUserInfo } from '../../..//platform/interfaces/platform.interface';
// import { TranslateService } from '@ngx-translate/core';
import { HttpConfigService } from '../../../platform/services/http-config.service';
// import { Observable } from 'rxjs/Observable';
import { SecureSubscribe } from '../../../platform/services/secure-subscribe';
import 'rxjs/add/operator/takeUntil';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
// import { Keyboard } from '@ionic-native/keyboard';
import { BasicCompanyService } from '../../services/basic-company.service';
import 'particles.js';
import { HttpCacheService } from '../../../platform/services/http-cache.service';
import { LoginHelp } from '../../components/login-help/login-help';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
// import { offlineDataProvider } from '../../../platform/services/sqlite';
import { PlatformContextService } from '../../../platform/services/platform-context.service';
import { Storage } from '@ionic/storage';
@IonicPage({
	name: 'basic-login'
})
@Component({
	selector: 'page-login-page',
	templateUrl: 'login-page.html',
})
export class LoginPage extends SecureSubscribe {
	formData: ILoginForm = {
		serverURL: '',
		username: '',
		password: '',
		grant_type: 'password',
		client_id: 'iTWO.Cloud',
		client_secret: '{fec4c1a6-8182-4136-a1d4-81ad1af5db4a}',
		scope: 'default',
	};
	isFromLogout: string = localStorage.getItem('isFromLogout') ? localStorage.getItem('isFromLogout') : 'N';
	sacnDisabled: boolean = false;
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private BasicDataService: BasicDataService,
		private AlertService: AlertService,
		// private AlertController: AlertController,
		// private TranslateService: TranslateService,
		private HttpConfigService: HttpConfigService,
		private Platform: Platform,
		private StatusBar: StatusBar,
		private BasicCompanyService: BasicCompanyService,
		private HttpCacheService: HttpCacheService,
		// private Keyboard: Keyboard,
		// private Config: Config,
		// private NavController: NavController,
		private ModalController: ModalController,
		private barcodeScanner: BarcodeScanner,
		private GoogleAnalytics: GoogleAnalytics,
		// private database: offlineDataProvider,
		private Storage: Storage,
		private PlatformContextService: PlatformContextService,
	) {
		super();
		this.Storage.get('username').then((val) => {
			this.formData.username = val;
		})
		// window['particlesJS'].load('particles', 'http://ojew0p47q.bkt.clouddn.com/particles.json');
	}
	ionViewWillEnter() {
		this.Platform.ready().then(() => {
			//this.StatusBar.styleDefault();
			this.StatusBar.hide();
		});
	}
	ionViewWillLeave() {
		this.Platform.ready().then(() => {
			//this.StatusBar.styleLightContent();
			this.StatusBar.show();
		});
		localStorage.setItem('isFromLogout', 'N');
		this.isFromLogout = 'N';
		// this.StatusBar.backgroundColorByHexString('0067b1');
	}
	ionViewDidLoad() {
		this.HttpCacheService.get(Symbol.for('particles config')).subscribe(data => {
			window['particlesJS']('particles', data.json());
		});
		if(this.HttpConfigService.baseUrl.indexOf("services") > 0 ){
			this.formData.serverURL = this.HttpConfigService.baseUrl.substring(0,this.HttpConfigService.baseUrl.lastIndexOf("/"));
		}

	}
	openScanner() {
		// this.database.queryUserTable();
		if(this.sacnDisabled){
			return;
		}
		else{
			this.sacnDisabled = true;
			this.GoogleAnalytics.trackEvent('business', 'open scanner');
			this.barcodeScanner.scan({
				prompt: ''
			}).then((barcodeData) => {
				this.sacnDisabled = false;
				// this.AlertService.showBasic(JSON.stringify(barcodeData));
				if (barcodeData.text) {
					this.formData.serverURL = barcodeData.text;

					if(this.HttpConfigService.baseUrl && (this.HttpConfigService.baseUrl !==barcodeData.text && this.HttpConfigService.baseUrl !==barcodeData.text+'/' && this.HttpConfigService.baseUrl !==barcodeData.text+'/services')){
						this.PlatformContextService.clearFilter();
					}
				}
				// Success! Barcode data is here
			}, (err) => {
				this.sacnDisabled = false;
				this.AlertService.showBasic(err, false);
				console.log(err);
				// An error occurred
			})
		}
	}
	openHelpModal(){
		let modal = this.ModalController.create(LoginHelp,{cssClass:'login-modal'});
    	modal.present();
    	// modal.dismiss();
	}
	login() {
		this.HttpConfigService.baseUrl = this.formData.serverURL;
		//append the 'services' to base url;
		if(this.HttpConfigService.baseUrl.indexOf("services") <= 0 ){
			let text = this.HttpConfigService.baseUrl;
			text = text.charAt(text.length-1) == '/' ? text : text + '/';
			this.HttpConfigService.baseUrl = text + "services";
		}
		let reg= /^(http:\/\/|https:\/\/)/;
		if(this.HttpConfigService.baseUrl=='' || this.HttpConfigService.baseUrl=='https://' 
		|| !reg.test( this.HttpConfigService.baseUrl )){
			this.AlertService.showBasicNoBackDrop('basic.invalidServer', true);
			return;
		}
		this.BasicDataService.login(this.formData.username.trim(), this.formData.password)
			.takeUntil(this.ngUnsubscribe)
			.subscribe({
				next: (userInfo: IUserInfo) => {
					this.Storage.set('username', this.formData.username);
					this.BasicCompanyService.clearCache();
					this.navCtrl.push('basic-company', { goToDesktop: true });
				},
				error: (err: Error) => {
					localStorage.setItem('isFromLogout', 'N');
					this.isFromLogout = 'N';
					const timeoutMsg = 'TimeoutError: Timeout has occurred';
					if (err.message === timeoutMsg) {
						this.AlertService.showBasicNoBackDrop(timeoutMsg, false);
					} else if (typeof err === 'object') {
						this.AlertService.showBasicNoBackDrop('basic.invalidUser');
					}
				}
			});
	}
	serverConfig() {
		this.isFromLogout = 'N';
		localStorage.setItem('isFromLogout', 'N');
	}
}
