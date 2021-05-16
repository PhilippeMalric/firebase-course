
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { Variable } from '../model/variable';
import { convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFirestore) { }
  findVariableByNom(nom: string): Observable<Variable | null> {
    return this.db.collection("variables",
        ref => ref.where("nom", "==", nom))
        .get()
        .pipe(
          map(results => {

              const courses = convertSnaps<Variable>(results);

              return courses.length == 1 ? courses[0] : null;

          })
        );
  }
  createVar(newVar: Partial<Variable>, courseId?:string) {
    console.log('newVar')
    console.log(newVar)
    return this.db.collection("variables",
            ref => ref.orderBy("seqNo", "desc").limit(1))
        .get()
        .pipe(
            concatMap(result => {

              
                const v = convertSnaps<Variable>(result);
                console.log('result')
                console.log(result)
                console.log(v)

                const lastVSeqNo = v[0]?.seqNo ?? 0;

                const v2 = {
                    ...newVar,
                    seqNo: lastVSeqNo + 1
                }

                let save$: Observable<any>;

                if (courseId) {
                    save$ = from(this.db.doc(`variables/${courseId}`).set(v2));
                }
                else {
                    save$ = from(this.db.collection("variables").add(v2));
                }

                return save$
                    .pipe(
                        map(res => {
                            return {
                                id: courseId ?? res.id,
                                ...v2
                            }
                        })
                    );


            })
        )
}
}
