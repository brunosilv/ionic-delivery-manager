import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EditCourierPage} from './edit-courier';

@NgModule({
    declarations: [
        EditCourierPage,
    ],
    imports: [
        IonicPageModule.forChild(EditCourierPage),
    ],
})
export class EditCourierPageModule {
}
