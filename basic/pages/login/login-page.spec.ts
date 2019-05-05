// import { TestBed, ComponentFixture, async } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { IonicPageModule, IonicModule } from 'ionic-angular';
// import { LoginPage } from './login-page';
// import { LoginLanguageList } from '../components/login-language-list/login-language-list';
// import { CommonModule } from '../../../common/common.module';
// import { AppComponent } from '../../../app.component';
// import {  } from ''

// let comp: LoginPage;
// let fixture: ComponentFixture<LoginPage>;
// let de: DebugElement;
// let el: HTMLElement;
 
// describe('Page: Home Page', () => {
 
//     beforeEach(async(() => {
 
//         TestBed.configureTestingModule({
 
//             declarations: [
//                 AppComponent,
//                 LoginPage,
//                 LoginLanguageList
//             ],
 
//             providers: [
 
//             ],
 
//             imports: [
//                 IonicModule.forRoot(AppComponent),
//                 CommonModule
//             ]
 
//         }).compileComponents();
 
//     }));
 
//     beforeEach(() => {
 
//         fixture = TestBed.createComponent(LoginPage);
//         comp    = fixture.componentInstance;
 
//     });
 
//     afterEach(() => {
//         fixture.destroy();
//         comp = null;
//         de = null;
//         el = null;
//     });
 
//     it('is created', () => {
 
//         expect(fixture).toBeTruthy();
//         expect(comp).toBeTruthy();
 
//     });
 
//     it('initialises with a title of My Page', () => {
//         expect(comp['title']).toEqual('My Page');
//     });
 
//     it('can set the title to a supplied value', () => {
 
//         de = fixture.debugElement.query(By.css('ion-title'));
//         el = de.nativeElement;  
 
//         // comp.changeTitle('Your Page');
//         // fixture.detectChanges();
//         // expect(comp['title']).toEqual('Your Page');
//         // expect(el.textContent).toContain('Your Page');
 
//     });
 
// });