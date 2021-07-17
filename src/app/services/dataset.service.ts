import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {from, Observable, of, pipe} from "rxjs";
import {Course} from "../model/course";
import {concatMap, map, tap} from "rxjs/operators";
import {convertSnaps} from "./db-utils";
import { Dataset } from "../model/dataset";


@Injectable({
    providedIn: "root"
})
export class DatasetsService {

    constructor(private db: AngularFirestore) {

    }

    findDatasetByUrl(datasetUrl: string): Observable<Dataset | null> {
        return this.db.collection("ds",
            ref => ref.where("url", "==", datasetUrl))
            .get()
            .pipe(
              map(results => {

                  const datasets = convertSnaps<Dataset>(results);

                  return datasets.length == 1 ? datasets[0] : null;

              })
            );
    }

    

    deleteDataset(datasetId:string) {
        return from(this.db.doc(`ds/${datasetId}`).delete());
    }

    updateDataset(datasetId:string, changes: Partial<Dataset>):Observable<any> {
        return from(this.db.doc(`ds/${datasetId}`).update(changes));
    }

    createDataset(newDataset: Partial<Dataset>, datasetId?:string) {
        return this.db.collection("ds",
                ref => ref.orderBy("seqNo", "desc").limit(1))
            .get()
            .pipe(
                concatMap(result => {
console.log("result",result)
                    const datasets = convertSnaps<Dataset>(result);

                    const lastDatasetSeqNo = datasets[0]?.seqNo ?? 0;

                    const dataset = {
                        ...newDataset,
                        seqNo: lastDatasetSeqNo + 1
                    }
                    console.log("dataset",dataset)
                    let save$: Observable<any>;

console.log("datasetId",datasetId)
this.findDatasetByUrl("test").subscribe(console.log)
//this.db.collection("courses").add(dataset)
//this.db.doc(`dataset/${datasetId}`).set(dataset)

                    if (datasetId) {
                        save$ = from(this.db.doc(`ds/${datasetId}`).set(dataset));
                    }
                    else {
                        save$ = from(this.db.collection("ds").add(dataset));
                    }

                    return save$
                        .pipe(
                            tap(console.log),
                            map(res => {
                                return {
                                    id: datasetId ?? res.id,
                                    ...dataset
                                }
                            })
                        );


                })
            )
    }

    loadDataSets(): Observable<Dataset[]> {
         return this.db.collection(
            "ds")
            .get()
             .pipe(
                 tap((data)=>console.log("loadds",data)),
                 map(result => convertSnaps<Dataset>(result))
             );

    }

}








