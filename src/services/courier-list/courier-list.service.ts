import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {Courier} from "../../modals/courier/courier.model";


@Injectable()
export class CourierListService {

    static get parameters() {
        return [[AngularFireDatabase]];
    }

    private courierListRef = this.db.list<Courier>('courier-list')

    constructor(private db: AngularFireDatabase) {
    }

    getCourierList() {
        return this.courierListRef;
    }

    addCourier(courier: Courier) {
        return this.courierListRef.push(courier);
    }

    editCourier(courier: Courier) {
        return this.courierListRef.update(courier.key, courier);
    }

    removeCourier(courier: Courier) {
        return this.courierListRef.remove(courier.key);
    }
}