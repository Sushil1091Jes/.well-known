import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { BasicCompanyService } from './basic-company.service';
import { HttpService } from '../../platform/services/http.service';
import { PlatformContextService } from '../../platform/services/platform-context.service';
import { LoadingService } from '../../platform/services/loading.service';
import { Observable } from 'rxjs/Observable';
import { IAssignedCompany } from '../../platform/interfaces/basic.interface';
import { DataStructureService } from '../../platform/services/data-structure.service';
import * as _ from 'lodash';

let service: BasicCompanyService;
const companyData: IAssignedCompany = JSON.parse('{"companies":[{"id":3,"parentId":null,"companyType":2,"name":"iTWO Sample Data","code":"900","canLogin":true,"children":[{"id":1,"parentId":3,"companyType":1,"name":"German Client 1","code":"901","canLogin":true,"children":null},{"id":78,"parentId":3,"companyType":1,"name":"Testdata","code":"902","canLogin":true,"children":null},{"id":79,"parentId":3,"companyType":1,"name":"US Client 2","code":"903","canLogin":true,"children":null},{"id":124,"parentId":3,"companyType":1,"name":"CN Client 1","code":"904","canLogin":true,"children":[]},{"id":125,"parentId":3,"companyType":1,"name":"iTWO China Best Practice (User Profile)","code":"906","canLogin":true,"children":null},{"id":126,"parentId":3,"companyType":1,"name":"iTWO China Best Practice (Owner)","code":"905","canLogin":true,"children":null},{"id":205,"parentId":3,"companyType":1,"name":"iTWO Best Practice (Owner)","code":"908","canLogin":true,"children":null}]},{"id":14,"parentId":null,"companyType":2,"name":"Köster Gruppe","code":"100","canLogin":false,"children":[{"id":15,"parentId":14,"companyType":1,"name":"Köster GmbH","code":"101","canLogin":true,"children":[]},{"id":16,"parentId":14,"companyType":1,"name":"Baresel GmbH","code":"102","canLogin":true,"children":null}]},{"id":54,"parentId":null,"companyType":2,"name":"Testmandanten","code":"001","canLogin":false,"children":[{"id":55,"parentId":54,"companyType":1,"name":"MAX BÖGL Bauservice GmbH & Co. KG","code":"002","canLogin":true,"children":[]},{"id":56,"parentId":54,"companyType":1,"name":"MAX BÖGL Stiftung GmbH & Co. KG","code":"003","canLogin":true,"children":null},{"id":59,"parentId":54,"companyType":1,"name":"MAX BÖGL Wind AG","code":"006","canLogin":true,"children":null},{"id":60,"parentId":54,"companyType":1,"name":"MAX BÖGL Transport & Geräte GmbH & Co. KG","code":"007","canLogin":true,"children":null},{"id":61,"parentId":54,"companyType":1,"name":"MAX BÖGL International SE","code":"008","canLogin":true,"children":null},{"id":62,"parentId":54,"companyType":1,"name":"GOLLER BÖGL GmbH","code":"009","canLogin":true,"children":null},{"id":65,"parentId":54,"companyType":1,"name":"MAX BÖGL Romania S.R.L.","code":"010","canLogin":true,"children":null}]},{"id":179,"parentId":null,"companyType":1,"name":"PRESTO","code":"RIB SPAIN","canLogin":true,"children":null},{"id":221,"parentId":null,"companyType":2,"name":"YTWO","code":"990","canLogin":false,"children":[{"id":222,"parentId":221,"companyType":1,"name":"German Client 2","code":"998","canLogin":true,"children":[]},{"id":224,"parentId":221,"companyType":1,"name":"US Client","code":"999","canLogin":true,"children":null},{"id":484,"parentId":221,"companyType":1,"name":"EU Client","code":"996","canLogin":true,"children":null},{"id":485,"parentId":221,"companyType":1,"name":"YTWO Formative                            ","code":"991             ","canLogin":true,"children":null},{"id":489,"parentId":221,"companyType":1,"name":"CN Client                                 ","code":"997             ","canLogin":true,"children":null}]},{"id":227,"parentId":null,"companyType":1,"name":"Midea","code":"200","canLogin":true,"children":null},{"id":228,"parentId":null,"companyType":1,"name":"Vono testing","code":"VT","canLogin":true,"children":null},{"id":233,"parentId":null,"companyType":1,"name":"GUANGDONG2017001","code":"GUANGDONG2017001","canLogin":true,"children":null},{"id":238,"parentId":null,"companyType":1,"name":"JIANGSU2017002","code":"JIANGSU2017002","canLogin":true,"children":null},{"id":263,"parentId":null,"companyType":1,"name":null,"code":"UI-TEST","canLogin":true,"children":null},{"id":336,"parentId":null,"companyType":2,"name":"Master Data Context 001","code":"M0001","canLogin":true,"children":[{"id":337,"parentId":336,"companyType":1,"name":"MDC0001","code":"DC00001","canLogin":true,"children":null}]},{"id":348,"parentId":null,"companyType":2,"name":"Test","code":"0001","canLogin":true,"children":[{"id":349,"parentId":348,"companyType":1,"name":"TEST_01","code":"00011","canLogin":true,"children":null}]},{"id":351,"parentId":null,"companyType":1,"name":"BEST ITWO","code":"112233","canLogin":true,"children":null},{"id":388,"parentId":null,"companyType":1,"name":"test company","code":"TEST19","canLogin":true,"children":null},{"id":391,"parentId":null,"companyType":2,"name":"GZ Construction Group","code":"800","canLogin":true,"children":[{"id":392,"parentId":391,"companyType":2,"name":"GZ Headqueter","code":"801","canLogin":true,"children":[{"id":394,"parentId":392,"companyType":1,"name":"Tanhe District","code":"801-1","canLogin":true,"children":null},{"id":395,"parentId":392,"companyType":1,"name":"LuoGang District","code":"801-2","canLogin":true,"children":[{"id":396,"parentId":395,"companyType":3,"name":"Branch1","code":"801-2-1","canLogin":true,"children":null},{"id":397,"parentId":395,"companyType":3,"name":"Branch2","code":"802-2-2","canLogin":true,"children":null}]},{"id":398,"parentId":392,"companyType":2,"name":"BeiJing City","code":"802","canLogin":true,"children":[{"id":399,"parentId":398,"companyType":1,"name":"BeiJing1","code":"802-1","canLogin":true,"children":[{"id":400,"parentId":399,"companyType":3,"name":"B B1","code":"802-1-1","canLogin":true,"children":null},{"id":401,"parentId":399,"companyType":3,"name":"B B2","code":"802-1-2","canLogin":true,"children":null}]}]},{"id":471,"parentId":392,"companyType":1,"name":"GZ-SAA","code":"803","canLogin":true,"children":null},{"id":473,"parentId":392,"companyType":1,"name":"GZ2-SAA","code":"804","canLogin":true,"children":null}]}]},{"id":427,"parentId":null,"companyType":1,"name":"German Client 3","code":"950","canLogin":true,"children":null},{"id":462,"parentId":null,"companyType":2,"name":"SAA Group","code":"SAA","canLogin":true,"children":[{"id":463,"parentId":462,"companyType":1,"name":"SAA-Australia","code":"S1","canLogin":true,"children":null},{"id":464,"parentId":462,"companyType":1,"name":"SAA-China","code":"S2","canLogin":true,"children":[{"id":465,"parentId":464,"companyType":3,"name":"SAA-China-GZ","code":"S2-1","canLogin":true,"children":null},{"id":466,"parentId":464,"companyType":3,"name":"SAA-China-SH","code":"S2-2","canLogin":true,"children":null},{"id":467,"parentId":464,"companyType":3,"name":"SAA-China-BJ","code":"S2-3","canLogin":true,"children":null}]}]},{"id":487,"parentId":null,"companyType":2,"name":"Suppliers Company","code":"1000","canLogin":true,"children":[{"id":488,"parentId":487,"companyType":1,"name":"Other Supplier                            ","code":"1010            ","canLogin":true,"children":null}]}],"roles":[{"clientId":1,"roleIds":[1,2,31,35]},{"clientId":3,"roleIds":[1]},{"clientId":14,"roleIds":[2]},{"clientId":15,"roleIds":[1]},{"clientId":54,"roleIds":[2]},{"clientId":79,"roleIds":[1,2]},{"clientId":124,"roleIds":[1]},{"clientId":125,"roleIds":[1]},{"clientId":126,"roleIds":[1]},{"clientId":168,"roleIds":[1,4]},{"clientId":176,"roleIds":[27]},{"clientId":177,"roleIds":[42]},{"clientId":179,"roleIds":[1]},{"clientId":205,"roleIds":[1]},{"clientId":221,"roleIds":[1]},{"clientId":222,"roleIds":[1]},{"clientId":224,"roleIds":[1]},{"clientId":227,"roleIds":[1]},{"clientId":228,"roleIds":[4]},{"clientId":233,"roleIds":[1]},{"clientId":238,"roleIds":[1]},{"clientId":263,"roleIds":[1]},{"clientId":337,"roleIds":[1]},{"clientId":348,"roleIds":[1]},{"clientId":349,"roleIds":[1]},{"clientId":351,"roleIds":[1]},{"clientId":388,"roleIds":[1]},{"clientId":391,"roleIds":[1]},{"clientId":427,"roleIds":[1]},{"clientId":462,"roleIds":[1]},{"clientId":484,"roleIds":[1]},{"clientId":485,"roleIds":[1]},{"clientId":488,"roleIds":[1]},{"clientId":489,"roleIds":[1]}],"rolesLookup":[{"key":1,"value":"1 Admin"},{"key":2,"value":"3 Sales"},{"key":31,"value":"MFE_100"},{"key":35,"value":"KH Test"},{"key":4,"value":"2 Management"},{"key":27,"value":"5 On Site"},{"key":42,"value":"Peter Test"}]}');
function getData():IAssignedCompany {
    return JSON.parse('{"companies":[{"id":3,"parentId":null,"companyType":2,"name":"iTWO Sample Data","code":"900","canLogin":true,"children":[{"id":1,"parentId":3,"companyType":1,"name":"German Client 1","code":"901","canLogin":true,"children":null},{"id":78,"parentId":3,"companyType":1,"name":"Testdata","code":"902","canLogin":true,"children":null},{"id":79,"parentId":3,"companyType":1,"name":"US Client 2","code":"903","canLogin":true,"children":null},{"id":124,"parentId":3,"companyType":1,"name":"CN Client 1","code":"904","canLogin":true,"children":[]},{"id":125,"parentId":3,"companyType":1,"name":"iTWO China Best Practice (User Profile)","code":"906","canLogin":true,"children":null},{"id":126,"parentId":3,"companyType":1,"name":"iTWO China Best Practice (Owner)","code":"905","canLogin":true,"children":null},{"id":205,"parentId":3,"companyType":1,"name":"iTWO Best Practice (Owner)","code":"908","canLogin":true,"children":null}]},{"id":14,"parentId":null,"companyType":2,"name":"Köster Gruppe","code":"100","canLogin":false,"children":[{"id":15,"parentId":14,"companyType":1,"name":"Köster GmbH","code":"101","canLogin":true,"children":[]},{"id":16,"parentId":14,"companyType":1,"name":"Baresel GmbH","code":"102","canLogin":true,"children":null}]},{"id":54,"parentId":null,"companyType":2,"name":"Testmandanten","code":"001","canLogin":false,"children":[{"id":55,"parentId":54,"companyType":1,"name":"MAX BÖGL Bauservice GmbH & Co. KG","code":"002","canLogin":true,"children":[]},{"id":56,"parentId":54,"companyType":1,"name":"MAX BÖGL Stiftung GmbH & Co. KG","code":"003","canLogin":true,"children":null},{"id":59,"parentId":54,"companyType":1,"name":"MAX BÖGL Wind AG","code":"006","canLogin":true,"children":null},{"id":60,"parentId":54,"companyType":1,"name":"MAX BÖGL Transport & Geräte GmbH & Co. KG","code":"007","canLogin":true,"children":null},{"id":61,"parentId":54,"companyType":1,"name":"MAX BÖGL International SE","code":"008","canLogin":true,"children":null},{"id":62,"parentId":54,"companyType":1,"name":"GOLLER BÖGL GmbH","code":"009","canLogin":true,"children":null},{"id":65,"parentId":54,"companyType":1,"name":"MAX BÖGL Romania S.R.L.","code":"010","canLogin":true,"children":null}]},{"id":179,"parentId":null,"companyType":1,"name":"PRESTO","code":"RIB SPAIN","canLogin":true,"children":null},{"id":221,"parentId":null,"companyType":2,"name":"YTWO","code":"990","canLogin":false,"children":[{"id":222,"parentId":221,"companyType":1,"name":"German Client 2","code":"998","canLogin":true,"children":[]},{"id":224,"parentId":221,"companyType":1,"name":"US Client","code":"999","canLogin":true,"children":null},{"id":484,"parentId":221,"companyType":1,"name":"EU Client","code":"996","canLogin":true,"children":null},{"id":485,"parentId":221,"companyType":1,"name":"YTWO Formative                            ","code":"991             ","canLogin":true,"children":null},{"id":489,"parentId":221,"companyType":1,"name":"CN Client                                 ","code":"997             ","canLogin":true,"children":null}]},{"id":227,"parentId":null,"companyType":1,"name":"Midea","code":"200","canLogin":true,"children":null},{"id":228,"parentId":null,"companyType":1,"name":"Vono testing","code":"VT","canLogin":true,"children":null},{"id":233,"parentId":null,"companyType":1,"name":"GUANGDONG2017001","code":"GUANGDONG2017001","canLogin":true,"children":null},{"id":238,"parentId":null,"companyType":1,"name":"JIANGSU2017002","code":"JIANGSU2017002","canLogin":true,"children":null},{"id":263,"parentId":null,"companyType":1,"name":null,"code":"UI-TEST","canLogin":true,"children":null},{"id":336,"parentId":null,"companyType":2,"name":"Master Data Context 001","code":"M0001","canLogin":true,"children":[{"id":337,"parentId":336,"companyType":1,"name":"MDC0001","code":"DC00001","canLogin":true,"children":null}]},{"id":348,"parentId":null,"companyType":2,"name":"Test","code":"0001","canLogin":true,"children":[{"id":349,"parentId":348,"companyType":1,"name":"TEST_01","code":"00011","canLogin":true,"children":null}]},{"id":351,"parentId":null,"companyType":1,"name":"BEST ITWO","code":"112233","canLogin":true,"children":null},{"id":388,"parentId":null,"companyType":1,"name":"test company","code":"TEST19","canLogin":true,"children":null},{"id":391,"parentId":null,"companyType":2,"name":"GZ Construction Group","code":"800","canLogin":true,"children":[{"id":392,"parentId":391,"companyType":2,"name":"GZ Headqueter","code":"801","canLogin":true,"children":[{"id":394,"parentId":392,"companyType":1,"name":"Tanhe District","code":"801-1","canLogin":true,"children":null},{"id":395,"parentId":392,"companyType":1,"name":"LuoGang District","code":"801-2","canLogin":true,"children":[{"id":396,"parentId":395,"companyType":3,"name":"Branch1","code":"801-2-1","canLogin":true,"children":null},{"id":397,"parentId":395,"companyType":3,"name":"Branch2","code":"802-2-2","canLogin":true,"children":null}]},{"id":398,"parentId":392,"companyType":2,"name":"BeiJing City","code":"802","canLogin":true,"children":[{"id":399,"parentId":398,"companyType":1,"name":"BeiJing1","code":"802-1","canLogin":true,"children":[{"id":400,"parentId":399,"companyType":3,"name":"B B1","code":"802-1-1","canLogin":true,"children":null},{"id":401,"parentId":399,"companyType":3,"name":"B B2","code":"802-1-2","canLogin":true,"children":null}]}]},{"id":471,"parentId":392,"companyType":1,"name":"GZ-SAA","code":"803","canLogin":true,"children":null},{"id":473,"parentId":392,"companyType":1,"name":"GZ2-SAA","code":"804","canLogin":true,"children":null}]}]},{"id":427,"parentId":null,"companyType":1,"name":"German Client 3","code":"950","canLogin":true,"children":null},{"id":462,"parentId":null,"companyType":2,"name":"SAA Group","code":"SAA","canLogin":true,"children":[{"id":463,"parentId":462,"companyType":1,"name":"SAA-Australia","code":"S1","canLogin":true,"children":null},{"id":464,"parentId":462,"companyType":1,"name":"SAA-China","code":"S2","canLogin":true,"children":[{"id":465,"parentId":464,"companyType":3,"name":"SAA-China-GZ","code":"S2-1","canLogin":true,"children":null},{"id":466,"parentId":464,"companyType":3,"name":"SAA-China-SH","code":"S2-2","canLogin":true,"children":null},{"id":467,"parentId":464,"companyType":3,"name":"SAA-China-BJ","code":"S2-3","canLogin":true,"children":null}]}]},{"id":487,"parentId":null,"companyType":2,"name":"Suppliers Company","code":"1000","canLogin":true,"children":[{"id":488,"parentId":487,"companyType":1,"name":"Other Supplier                            ","code":"1010            ","canLogin":true,"children":null}]}],"roles":[{"clientId":1,"roleIds":[1,2,31,35]},{"clientId":3,"roleIds":[1]},{"clientId":14,"roleIds":[2]},{"clientId":15,"roleIds":[1]},{"clientId":54,"roleIds":[2]},{"clientId":79,"roleIds":[1,2]},{"clientId":124,"roleIds":[1]},{"clientId":125,"roleIds":[1]},{"clientId":126,"roleIds":[1]},{"clientId":168,"roleIds":[1,4]},{"clientId":176,"roleIds":[27]},{"clientId":177,"roleIds":[42]},{"clientId":179,"roleIds":[1]},{"clientId":205,"roleIds":[1]},{"clientId":221,"roleIds":[1]},{"clientId":222,"roleIds":[1]},{"clientId":224,"roleIds":[1]},{"clientId":227,"roleIds":[1]},{"clientId":228,"roleIds":[4]},{"clientId":233,"roleIds":[1]},{"clientId":238,"roleIds":[1]},{"clientId":263,"roleIds":[1]},{"clientId":337,"roleIds":[1]},{"clientId":348,"roleIds":[1]},{"clientId":349,"roleIds":[1]},{"clientId":351,"roleIds":[1]},{"clientId":388,"roleIds":[1]},{"clientId":391,"roleIds":[1]},{"clientId":427,"roleIds":[1]},{"clientId":462,"roleIds":[1]},{"clientId":484,"roleIds":[1]},{"clientId":485,"roleIds":[1]},{"clientId":488,"roleIds":[1]},{"clientId":489,"roleIds":[1]}],"rolesLookup":[{"key":1,"value":"1 Admin"},{"key":2,"value":"3 Sales"},{"key":31,"value":"MFE_100"},{"key":35,"value":"KH Test"},{"key":4,"value":"2 Management"},{"key":27,"value":"5 On Site"},{"key":42,"value":"Peter Test"}]}');
}
let httpStub = {
    $get: (url) => Observable.of(companyData)
};
let loadingStub = {
    show: () => { },
    hide: () => { }
};
let platformStub = {
    setCompanyInfo: (...arg) => { },
    setContextKey: () => { },
    setCompanyContext: (...art) => { }
};
describe('Company service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: HttpService, useValue: httpStub },
                { provide: LoadingService, useValue: loadingStub },
                { provide: PlatformContextService, useValue: platformStub }
            ]
        });
        // service = new BasicCompanyService(TestBed.get(HttpService), TestBed.get(LoadingService), TestBed.get(PlatformContextService));
    });

    it('service is created', () => {
        expect(service).toBeTruthy();
    });

    it('master data are ready', () => {
        service['setMasterData'](getData());
        //expect(service.masterData).toBeTruthy();
    })

    it('linear data are ready: linear, sorted', () => {
        service['setLinearData'](getData().companies);
        const data = service.linearData['data'];
        expect(service.linearData instanceof DataStructureService).toBeTruthy();
        expect(data.every((value, index, arr) => {
            if (index === arr.length - 1) {
                return true;
            }
            return value.id < arr[index + 1].id;
        })).toBeTruthy();
        let companyCount = 58; // the mock data contains 58 companies.
        expect(companyCount === data.length).toBeTruthy();
    });

    it('get the correct company by id: 58 companies total', () => {
        function _test(id: number) {
            let company = service.getCompanyById(id);
            expect(company).toBeTruthy();
            expect(company.id).toBe(id);
        }
        service['setLinearData'](getData().companies);
        service.linearData['data'].forEach((item) => {
            _test(item.id);
        });
    });

    it('get the correct rolelookup by key', () => {
        service['setMasterData'](getData());
        // service.masterData.rolesLookup.forEach((item) => {
        //     const rolelookup = service.getRoleLookupByKey(item.key);
        //     expect(rolelookup.key).toBe(item.key);
        // });
    });

    it('get the correct role list', () => {
        service['setMasterData'](getData());
        // service['setLinearData'](service.masterData.companies);
        // _.take(service.linearData['data']).forEach((comp) => {
        //     let expectedRoleIdList = service.masterData.roles.find(item => {
        //         return item.clientId === comp.id;
        //     });
        //     if (expectedRoleIdList && (comp.companyType !== 2)) {
        //         const list = service.getRoleList(comp);
        //         list.forEach(item => {
        //             expect(expectedRoleIdList.roleIds.find(id => {
        //                 return id === item.key;
        //             })).toBeTruthy();
        //         });
        //     }
            
        // });
    });
});