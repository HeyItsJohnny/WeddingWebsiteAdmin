import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Time } from '@angular/common';
import { AngularFireAuth } from "angularfire2/auth";

export interface RsvpAttendingNoDetails {
  id?: string;
  rsvpID: string;
  rsvpGuestID: string;
}

@Injectable({
  providedIn: 'root'
})
export class RsvpAttendingNoService {
  private rsvpAttendingCollection: AngularFirestoreCollection<RsvpAttendingNoDetails>;
  private rsvpAttending: Observable<RsvpAttendingNoDetails[]>;

  constructor(
    public db: AngularFirestore,
    private afAuth: AngularFireAuth) { 
      this.rsvpAttendingCollection = db.collection('RSVPNoAttending');
 
      this.rsvpAttending = this.rsvpAttendingCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }

  getRsvpAttending(rsvpName: string) {
    return this.rsvpAttendingCollection.doc<RsvpAttendingNoDetails>(rsvpName).valueChanges();
  }
 
  updateRsvpAttending(rsvpAttend: RsvpAttendingNoDetails, rsvpName: string) {
    return this.rsvpAttendingCollection.doc(rsvpName).update(rsvpAttend);
  }
 
  addRsvpAttending(rsvpAttend: RsvpAttendingNoDetails, rsvpName: string) {
    return this.rsvpAttendingCollection.doc(rsvpName).set(rsvpAttend);
  }

  removeRsvpAttending(id) {
    return this.rsvpAttendingCollection.doc(id).delete();
  }
}
