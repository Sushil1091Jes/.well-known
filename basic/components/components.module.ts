import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '../../common/common.module';
import { CompanyTree } from './company-tree/company-tree';
import { LoginLanguageList } from './login-language-list/login-language-list';
import { LoginHelp } from './login-help/login-help';

@NgModule({
    declarations: [
        CompanyTree,
        LoginLanguageList,
        LoginHelp
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        CommonModule,
        CompanyTree,
        LoginLanguageList,
        LoginHelp
    ],
    entryComponents: [
        CompanyTree,
        LoginLanguageList,
        LoginHelp
    ]  
})
export class BasicComponentsModule {}
