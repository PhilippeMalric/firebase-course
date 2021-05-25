
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { updateCategories } from '../actions/main.actions';
import { Statistique } from '../model/statistique';
import { Variable } from '../model/variable';
import { convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root'
})
export class DataService {

mainVar$ : BehaviorSubject<String>
dataset$ :  BehaviorSubject<any[]>
categories$: BehaviorSubject<Statistique[]>;
categoriesD: {};

  constructor(private db: AngularFirestore,private store:Store) { 

        this.store.subscribe((state:any)=>{
            let clear = state.main.clearState

            if(clear){
                this.categoriesD = {}
      
            }
        })

      this.mainVar$ = new BehaviorSubject<String>("**premier**")
      this.categories$ = new BehaviorSubject<Statistique[]>([])
      this.categoriesD = {}
      this.dataset$ = new BehaviorSubject<any[]>([])
  }

  modifieCategories(data: String) {
    
    if( Object.keys(this.categoriesD).includes(""+data) ){
      this.categoriesD[""+data] = this.categoriesD[""+data] +1
    }else{
      this.categoriesD[""+data] = 1
    }

    let categories = Object.keys(this.categoriesD).map((cat)=>{
      return {categorie:cat,count:this.categoriesD[""+cat]}
    })
    //this.store.dispatch(updateCategories({data:categories}))
    //console.log(categories)
    this.categories$.next(categories)
    
  }



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
