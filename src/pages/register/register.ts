import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user/user.model";
import {AngularFireAuth} from "angularfire2/auth";
import {ToastService} from "../../services/toast/toast.service";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {

    user = {} as User;

    constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private toast: ToastService) {
    }

    async registerUser(user: User) {
        try {
            const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
            if (result) {
                this.toast.show(`${user.email} registered successfully!`, 5000);
                this.navCtrl.setRoot('LoginPage')
            }
        }
        catch (e) {
            this.toast.show(`${e}`, 5000);
        }
    }
}
