import { Injectable } from '@angular/core';
import { HttpService } from '../../platform/services/http.service';
import { IAssignedCompany, ICompany, IRole, IRoleLookup } from '../../platform/interfaces/basic.interface';
import { DataStructureService }  from '../../platform/services/data-structure.service';
import { LoadingService } from '../../platform/services/loading.service';
import { PlatformContextService } from '../../platform/services/platform-context.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { HttpCacheService } from '../../platform/services/http-cache.service';
import { API } from '../../platform/constants/API';
import { Events } from 'ionic-angular';
@Injectable()
export class BasicCompanyService {
	public linearData: DataStructureService<ICompany>;
	public selectedCompany: ICompany;
	public selectedRole: IRoleLookup;
	masterDataSym = Symbol.for('master company data');
	constructor(
		public http: HttpService,
		private LoadingService: LoadingService,
		private PlatformContextService: PlatformContextService,
		private HttpCacheService: HttpCacheService,
		private Events: Events
	) {
		this.HttpCacheService.addSource(
			this.masterDataSym,
			() => this.http.$get(API.Company.List).do(data => {
				this.setLinearData(data.companies);
			}), 600000);
	}
	getCompanyList(): Observable<ICompany[]> {
		this.LoadingService.show();
		return this.HttpCacheService.get(this.masterDataSym)
			.map((data: IAssignedCompany) => data.companies)
			.finally(() => this.LoadingService.hide());
	}
	private setLinearData(companies: ICompany []) {
		let _data = [];
		companies.forEach(item => {
			let _obj = {};
			Object.assign(_obj, item);
			_data.push(_obj);
		});
		_data = this.toLinear(_data);
		this.linearData = new DataStructureService<ICompany>('id', _data);
		this.linearData.sort();
	}
	private toLinear(data: ICompany []): ICompany [] {
		let arrays: ICompany [] = [],
			rootIds = [];
		this._toLinear(data, arrays, rootIds);
		return arrays;
	}
	private _toLinear(data: ICompany [], arrays: ICompany [], childrenIds: number []) {
		for (let i = 0; i < data.length; i++) {
			childrenIds.push(data[i].id);
			if (data[i].children && data[i].children.length > 0) {
				let _childrenIds = [];
				this._toLinear(data[i].children, arrays, _childrenIds);
				//data[i].children = _childrenIds;
			} else {
				data[i].children = null;
			}
			arrays.push(data[i]);
		}
	}
	getCompanyById(id: number): ICompany {
		if (id) {
			return <ICompany>this.linearData.find(id);
		}
	}
	getRoleLookupByKey(key: number) {
		return this.HttpCacheService.get(this.masterDataSym)
			.map((data: IAssignedCompany) => data.rolesLookup.find(item => item.key === key))
	}
	private _getRoleList(id: number, arr: IRole []) {
		for (let i = 0; i < arr.length; i++) {
			if (id == arr[i].clientId) {
				return arr[i].roleIds;
			}
		}
		let company = this.getCompanyById(id);
		if (company.parentId) {
			let returning = this._getRoleList(company.parentId, arr);
			//alert(returning)
			return returning;
			
		}
		return null;
	}
	getRoleList(company: ICompany): Observable<IRoleLookup[]> {
		return this.HttpCacheService.get(this.masterDataSym)
			.map((data: IAssignedCompany) => {
				if (company.companyType === 2) {
					return null;
				}
				const roleIds = this._getRoleList(company.id, data.roles);
				let result = [];
				if (roleIds) {
					for (let i = 0; i < data.rolesLookup.length; i++) {
						if (roleIds.indexOf(data.rolesLookup[i].key) > -1) {
							result.push(data.rolesLookup[i]);
						}
					}
				}
				return result;
			});
	}
	private _getClientId(id) {
		var company = this.getCompanyById(id);
		if (company && company.companyType === 1) {
			return id;
		}
		if (company.parentId) {
			return this._getClientId(company.parentId);
		}
		return null;
	}
	saveContext(companyId: number, roleId: number) {
		roleId = Number(roleId);
		this.selectedCompany = this.getCompanyById(companyId);
		this.getRoleLookupByKey(roleId).subscribe(data => {
			this.selectedRole = data;
			this.PlatformContextService.setCompanyInfo(this.selectedCompany, this.selectedRole).then((data: any) => {
            this.Events.publish('change-company');
        });
		});
		
		const signedInClientId = companyId;
		const clientId = this._getClientId(signedInClientId);
		// this.PlatformContextService.setContextKey();
		this.PlatformContextService.setCompanyContext(signedInClientId, clientId, companyId, roleId);
	}
	clear() {
		this.linearData = null;
		this.selectedCompany = null;
		this.selectedRole = null;
	}
	clearCache() {
		this.HttpCacheService.clearCache(this.masterDataSym);
	}
}
