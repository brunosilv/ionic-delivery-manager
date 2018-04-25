import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {CourierListService} from "../../services/courier-list/courier-list.service";
import {Observable} from "rxjs/Observable";
import {Courier} from "../../modals/courier/courier.model";

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

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
