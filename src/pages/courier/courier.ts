import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Courier} from "../../models/courier/courier.model";
import {Observable} from "rxjs/Observable";
import {CourierListService} from "../../services/courier-list/courier-list.service";

/**
 * Generated class for the CourierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-courier',
    templateUrl: 'courier.html',
})
export class CourierPage {

    courierList$: Observable<Courier[]>;

    constructor(public navCtrl: NavController, private couries: CourierListService) {
        this.courierList$ = this.couries
            .getCourierList() //Lista da BD
            .snapshotChanges() // Key e value
            .map(
                changes => {
                    return changes.map(c => ({
                        key: c.payload.key, ...c.payload.val()
                    }))
                }
            );
    }
}
