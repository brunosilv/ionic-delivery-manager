import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Profile} from "../../models/profile/profile.model";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {FirebaseObjectObservable} from "angularfire2/database-deprecated";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    profile = {} as Profile

    constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
    }


    createProfile() {
        this.afAuth.authState.subscribe(auth => {
            this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
                .then(() => this.navCtrl.setRoot('HomePage'));
        })
    }
}
