import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from "angularfire2/auth";
import { ActivatedRoute } from '@angular/router';
import { Events } from 'ionic-angular';

export interface RsvpGuest {
  id?: string;
  Name: string;
  DietaryRestrictions: string;
}
@Injectable({
  providedIn: 'root'
})
export class RsvpGuestService {

  public rsvpId: any;
  private rsvpGuestsCollection: AngularFirestoreCollection<RsvpGuest>;
  private rsvpGuests: Observable<RsvpGuest[]>;

  constructor(
    public db: AngularFirestore,
    private afAuth: AngularFireAuth,
    public events: Events) { 
    this.events.subscribe('guest:created', set => {
      this.rsvpId = set;
      this.rsvpGuestsCollection = this.db.collection('Rsvps').doc(this.rsvpId).collection('Guests');

      this.rsvpGuests= this.rsvpGuestsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }); 
  }

  getRsvpGuestsForSearch() {
    return this.rsvpGuests;
  }

  getRsvpGuests() {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('Rsvps').doc(this.rsvpId).collection('Guests').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }
 
  getRsvpGuest(id) {
    let rsvpGuestCollection = this.db.collection('Rsvps').doc(this.rsvpId).collection('Guests');
    return rsvpGuestCollection.doc<RsvpGuest>(id).valueChanges();
  }
 
  updateRsvpGuest(rsvpGuest: RsvpGuest, id: string) {
    let rsvpGuestCollection = this.db.collection('Rsvps').doc(this.rsvpId).collection('Guests');
    return rsvpGuestCollection.doc(id).update(rsvpGuest);
  }

  updateRsvpGuestDinnerChoice(dinnerChoiceID: string, id: string) {
    let rsvpGuestCollection = this.db.collection('Rsvps').doc(this.rsvpId).collection('Guests');
    return rsvpGuestCollection.doc(id).update({"DinnerChoice": dinnerChoiceID});
  }

  updateRsvpGuestDinnerChoiceText(dinnerChoiceText: string, id: string) {
    let rsvpGuestCollection = this.db.collection('Rsvps').doc(this.rsvpId).collection('Guests');
    return rsvpGuestCollection.doc(id).update({"DinnerChoiceText": dinnerChoiceText});
  }

  updateRsvpGuestDietaryRestrictions(dinnerNotes: string, id: string) {
    let rsvpGuestCollection = this.db.collection('Rsvps').doc(this.rsvpId).collection('Guests');
    return rsvpGuestCollection.doc(id).update({"DinnerNotes": dinnerNotes});
  }
 
  addRsvpGuest(rsvpGuest: RsvpGuest) {
    let rsvpGuestCollection = this.db.collection('Rsvps').doc(this.rsvpId).collection('Guests');
    return rsvpGuestCollection.add(rsvpGuest);
  }
 
  removeRsvpGuest(id) {
    let rsvpGuestCollection = this.db.collection('Rsvps').doc(this.rsvpId).collection('Guests');
    return rsvpGuestCollection.doc(id).delete();
  }
}
