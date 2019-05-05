import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { BasicComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
    BasicComponentsModule
  ],
  exports: [
    AboutPage
  ]
})
export class AboutPageModule {}
