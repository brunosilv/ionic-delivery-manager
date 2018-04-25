import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddCourierPage} from './add-courier';

@NgModule({
    declarations: [
        AddCourierPage,
    ],
    imports: [
        IonicPageModule.forChild(AddCourierPage),
    ],
})
export class AddCourierPageModule {
}
