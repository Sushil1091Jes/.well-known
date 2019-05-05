import { Component } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { ViewController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
/**
 * Generated class for the LoginHelpComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login-help',
  templateUrl: 'login-help.html'
})
export class LoginHelp {

  text: string;
  isIOS: boolean;
  constructor(
  	private ViewController: ViewController,
	  // private TranslateService: TranslateService,
    private platform: Platform
  	) {
    this.isIOS = this.platform.is("ios");
    console.log(this.isIOS);
  }
  dismiss(isPop) {
	this.ViewController.dismiss(isPop);
  }
}
