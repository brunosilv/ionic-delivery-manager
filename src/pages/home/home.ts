import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {AngularFireAuth} from "angularfire2/auth";
import {ToastService} from "../../services/toast/toast.service";

import {AngularFireDatabase} from "angularfire2/database";

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {


    constructor(public navCtrl: NavController, private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, private toast: ToastService) {
    }


    logOutUser() {
        this.afAuth.auth.signOut();
        this.toast.show(`${this.afAuth.auth.currentUser.email} logged out!`, 5000);
        this.navCtrl.setRoot('LoginPage')
    }
}
