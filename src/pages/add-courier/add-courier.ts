import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Courier} from "../../modals/courier/courier.model";
import {CourierListService} from "../../services/courier-list/courier-list.service";
import {ToastService} from "../../services/toast/toast.service";

/**
 * Generated class for the AddCourierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-courier',
    templateUrl: 'add-courier.html',
})
export class AddCourierPage {

    courier: Courier = {
        name: undefined,
        mobile: undefined,
        nif: undefined
    }

    constructor(public navCtrl: NavController, public navParams: NavParams, private couriers: CourierListService, private toast: ToastService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddCourierPage');
    }

    addCourier(courier: Courier) {
        this.couriers.addCourier(courier).then(ref => {
            this.toast.show(`${courier.name} added!`, 5000);
            this.navCtrl.setRoot('HomePage', {key: ref.key})
        });
    }
}
