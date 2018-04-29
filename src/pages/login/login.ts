import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user/user.model";
import {AngularFireAuth} from "angularfire2/auth";
import {ToastService} from "../../services/toast/toast.service";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    user = {} as User;

    constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private toast: ToastService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    async loginUser(user: User) {
        try {
            const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
            if (result) {
                this.toast.show(` Welcome, ${user.email}!`, 5000);
                this.navCtrl.setRoot('HomePage')
            }
        }
        catch (e) {
            this.toast.show(`${e}`, 5000);
        }
    }

}
