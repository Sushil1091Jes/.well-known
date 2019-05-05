import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertService } from '../../../platform/services/alert.service';
import { HttpService } from '../../../platform/services/http.service';
import { PlatformContextService } from '../../../platform/services/platform-context.service';
import { IUserInfo } from '../../../platform/interfaces/platform.interface';
import { BasicDataService} from '../../../basic/services/basic-data.service';
@IonicPage({
	name: 'change-password'
})
@Component({
  	selector: 'page-change-password',
  	templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  user: IUserInfo | any = {};
	test: string = '123';
	currentPassword: string = '';
	newPassword: string = '';
	confirmPassword: string = '';
  	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private alertService: AlertService, 
		private http: HttpService,
		private PlatformContextService: PlatformContextService,
		private BasicDataService: BasicDataService,
	) {

  	}

  	ionViewDidLoad() {
      	this.PlatformContextService.getUserInfo()
	        .subscribe(data => {
	        this.user = data;
      	});
  	}
  	submit(){
  		if(this.newPassword !== this.confirmPassword){
          	this.alertService.showBasicNoBackDrop('basic.confirmPasswordError');
          	return;
        }
        else{
        	this.http.getToken(this.user.LogonName, this.currentPassword, false).subscribe(data =>{
	        	let params = {
	        		State: true,
					LogonName: this.user.LogonName,
					Password: this.newPassword
	        	}
	        	this.BasicDataService.changePassword(params).subscribe(data => {
	        		this.alertService.showSubmitted('desktop.profiles.changeSuccess');
		          	setTimeout(()=>{
		            	this.navCtrl.pop();
		          	},2200);
	        	},
	        	err => {
	        		console.log(err)
	        	});
	      	},
	      	err => {
	          	const timeoutMsg = 'TimeoutError: Timeout has occurred';
	          	if (err.message === timeoutMsg) {
	            	this.alertService.showBasicNoBackDrop(timeoutMsg, false);
	          	} else if (typeof err === 'object') {
	            	this.alertService.showBasicNoBackDrop('basic.currentPasswordError');
	          	}
	          	return;
	        });
        }
  	}
}
