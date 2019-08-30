import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from "angularfire2/auth";

export interface Dinner {
  id?: string;
  Name: string;
  Description: string;
  DisplayOrder: number;
  UpdatedAt: number;
  CreatedAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class DinnerService {
  private dinnersCollection: AngularFirestoreCollection<Dinner>;
  private dinners: Observable<Dinner[]>;

  constructor(public db: AngularFirestore) { 
    this.dinnersCollection = db.collection('Dinners');
      this.dinners = this.dinnersCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getDinnersToDisplay() {
    return this.dinners;
  }

  getDinners() {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('Dinners').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }
 
  getDinner(id) {
    let dinnersCollection = this.db.collection('Dinners');
    return dinnersCollection.doc<Dinner>(id).valueChanges();
  }
 
  updateDinner(dinner: Dinner, id: string) {
    let dinnersCollection = this.db.collection('Dinners');
    return dinnersCollection.doc(id).update(dinner);
  }
 
  addDinner(dinner: Dinner) {
    let dinnersCollection = this.db.collection('Dinners');
    return dinnersCollection.add(dinner);
  }
 
  removeDinner(id) {
    let dinnersCollection = this.db.collection('Dinners');
    return dinnersCollection.doc(id).delete();
  }

}
