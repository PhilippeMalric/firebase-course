
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { concatMap, map, withLatestFrom } from 'rxjs/operators';
import { updateCategories } from '../actions/main.actions';
import { Statistique } from '../model/statistique';
import { Variable } from '../model/variable';
import { selectCrossVar, selectno_na } from '../reducers';
import { convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root'
})
export class DataService {

mainVar$ : BehaviorSubject<String>
dataset$ :  BehaviorSubject<any[]>
datasetSVG$ : BehaviorSubject<any[]>
categories$: BehaviorSubject<Statistique[]>;
categoriesD: {};
dd$: BehaviorSubject<any[]>;
variablesdd$: BehaviorSubject<any[]>;
categoriesdd$: BehaviorSubject<any[]>;
crossVarCompte$: BehaviorSubject<any>;

  constructor(private db: AngularFirestore,private store:Store) { 

    this.mainVar$ = new BehaviorSubject<String>("**premier**")
    this.crossVarCompte$ = new BehaviorSubject<Statistique[]>([])
    this.categories$ = new BehaviorSubject<Statistique[]>([])
    this.categoriesD = {}
    this.dataset$ = new BehaviorSubject<any[]>([])
    this.datasetSVG$ = new BehaviorSubject<any[]>([])
    this.categoriesdd$ = new BehaviorSubject<any[]>([])
    this.variablesdd$ = new BehaviorSubject<any[]>([])

        this.store.subscribe((state:any)=>{
            let clear = state.main.clearState

            if(clear){
                this.categoriesD = {}
      
            }
        })
        this.store.pipe(
          select(selectCrossVar),
          withLatestFrom(this.dataset$,this.store.pipe(select(selectno_na)))).subscribe(([data,dataset,no_na])=>{
            if(data && 
              data["0"] != "" && data["1"] != "" && 
              dataset.length > 0){
                this.crossVarCompte$.next(this.createCompte(data,dataset,no_na))
              }

          
        })
      
  }


  createCompte(vars,dataset,no_na){

    console.log(vars,dataset)
    console.log(vars["0"],vars["1"])
    let n1 = dataset[0].indexOf(vars["0"])
    let n2 = dataset[0].indexOf(vars["1"])
    console.log(n1,n2)
    /*
    if(arr[1].split(" ")[0].split("-").length > 2 ){
      arr = arr.map(x=>x.split(" ")[0])

    }
    */
    let varNamesD1 = []
    let varNamesD2 = []
    for (var i = 1; i < dataset.length; i++) {

      varNamesD1[dataset[i][n1]] = 1
      varNamesD2[dataset[i][n2]] = 1
    }
    let varNames1 = Object.keys(varNamesD1)
    let varNames2 = Object.keys(varNamesD2)

if(varNames1.length + varNames2.length > 30){
  return []
}

    var counts = {};
    for (var i = 1; i < dataset.length; i++) {
      if(! (dataset[i][n1] in counts)){
        counts[dataset[i][n1]] = {}
        for(let e of varNames2){
          counts[dataset[i][n1]][e] = 0
        }
      }
      
        counts[dataset[i][n1]][dataset[i][n2]] = 1 + (counts[dataset[i][n1]][dataset[i][n2]])
      
     }

     if(no_na ){
      delete counts["NA"]
      Object.keys(counts).map((k)=>{
        console.log(counts[k])
        delete counts[k]["NA"]
      })
     }

     const result = []

     for (let i in Object.keys(counts)){
       let e = Object.keys(counts)[i]
       if(result.length == 0){
        console.log("objet intermediaire")
        console.log(counts)
         console.log(Object.keys(counts))
         result[0] = [vars["0"] ,...Object.keys(counts[e])]
       }
        for(let i2 in Object.keys(counts[e])){
          let e2 = Object.keys(counts[e])[i2]
          let index_var2 = Number(i)+1
          if(!result[index_var2]){
            result[index_var2] = []
            result[index_var2][0] = e
          }
            result[index_var2].push(counts[e][e2])
          
        
       
       }
       
     }

console.log("result")
console.log(result)

    return result
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
