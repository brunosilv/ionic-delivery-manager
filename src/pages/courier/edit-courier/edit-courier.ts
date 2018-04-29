import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Courier} from "../../../models/courier/courier.model";
import {CourierListService} from "../../../services/courier-list/courier-list.service";
import {ToastService} from "../../../services/toast/toast.service";

/**
 * Generated class for the EditCourierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-edit-courier',
    templateUrl: 'edit-courier.html',
})
export class EditCourierPage {

    courier: Courier;

    constructor(public navCtrl: NavController, public navParams: NavParams, private couries: CourierListService, private toast: ToastService) {
    }

    ionViewWillLoad() {
        this.courier = this.navParams.get('courier');
    }

    saveCourier(courier: Courier) {
        this.couries.editCourier(courier)
            .then(() => {
                this.toast.show(`${courier.name} saved!`, 5000);
                this.navCtrl.setRoot('HomePage');
            })
    }

    removeCourier(courier: Courier) {
        this.couries.removeCourier(courier)
            .then(() => {
                this.toast.show(`${courier.name} deleted!`, 5000);
                this.navCtrl.setRoot('HomePage');
            })
    }
}
