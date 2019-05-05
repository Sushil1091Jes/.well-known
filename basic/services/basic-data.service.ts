import { Injectable } from '@angular/core';
import { HttpService } from '../../platform/services/http.service';
import { HttpConfigService } from '../../platform/services/http-config.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/finally';
// import { ILoginForm } from '../../platform/interfaces/basic.interface';
import { IUserInfo } from '../../platform/interfaces/platform.interface';
// import { IToken } from '../../platform/interfaces/platform.interface';
import { PlatformContextService } from '../../platform/services/platform-context.service';
import { LoadingService } from '../../platform/services/loading.service';
import { HttpCacheService } from '../../platform/services/http-cache.service';
import { API } from '../../platform/constants/API';
@Injectable()
export class BasicDataService {
	userInfo: IUserInfo;
	constructor(
		private http: HttpService, 
		private PlatformContextService: PlatformContextService,
		private LoadingService: LoadingService,
		private HttpConfigService: HttpConfigService,
		private HttpCacheService: HttpCacheService
	) { }
	
	login(username: string, password: string) {
		this.LoadingService.showNoBackDrop();
		let token_type = "Bearer";//hard code
		let expires_in = 604800;//hard code
		return this.http.getToken(username, password, false)
		.concatMap((token: string) => {
			const _token = `${token_type} ${token}`; 
			this.HttpConfigService.setAuthHeader(_token);
			const expire = new Date().getTime() + (expires_in - 600) * 1000;
			this.PlatformContextService.setToken(_token, expire);
			this.HttpCacheService.clearCache();
			return this.PlatformContextService.getUserInfo();
		})
		.map((userInfo: IUserInfo) => {
			this.userInfo = userInfo;
			return userInfo;
		})
		.finally(() => {
			this.LoadingService.hide();
		});
	}
	changePassword(obj){
		return this.http.$post(API.Basic.ChangePassword, obj, true)
	}
}
