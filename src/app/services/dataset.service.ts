import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {from, Observable, of, pipe} from "rxjs";
import {Course} from "../model/course";
import {concatMap, map, tap} from "rxjs/operators";
import {convertSnaps} from "./db-utils";
import { Dataset_Stats } from "../model/dataset";


@Injectable({
    providedIn: "root"
})
export class DatasetsService {

    constructor(private db: AngularFirestore) {

    }

    findDatasetByUrl(datasetUrl: string): Observable<Dataset_Stats | null> {
        return this.db.collection("datasetStats",
            ref => ref.where("url", "==", datasetUrl))
            .get()
            .pipe(
              map(results => {

                  const datasets = convertSnaps<Dataset_Stats>(results);

                  return datasets.length == 1 ? datasets[0] : null;

              })
            );
    }

    

    deleteDataset(datasetId:string) {
        return from(this.db.doc(`datasetStats/${datasetId}`).delete());
    }

    updateDataset(datasetId:string, changes: Partial<Dataset_Stats>):Observable<any> {
        return from(this.db.doc(`datasetStats/${datasetId}`).update(changes));
    }

    createDataset(newDataset: Partial<Dataset_Stats>, datasetId?:string) {
        console.log("createDataset")
        return this.db.collection("datasetStats",
                ref => ref.orderBy("seqNo", "desc").limit(1))
            .get()
            .pipe(
                concatMap(result => {
                    
                    const datasets = convertSnaps<Dataset_Stats>(result);
                    console.log("dataset",datasets)
                    const lastDatasetSeqNo = datasets[0]?.seqNo ?? 0;

                    const dataset = {
                        ...newDataset,
                        seqNo: lastDatasetSeqNo + 1
                    }
                    console.log("dataset",dataset)
                    let save$: Observable<any>;

console.log("datasetId",datasetId)
//this.findDatasetByUrl("test").subscribe(console.log)
//this.db.collection("courses").add(dataset)
//this.db.doc(`dataset/${datasetId}`).set(dataset)
//this.db.collection("ds").add({test:0})
                    if (datasetId) {
                        save$ = from(this.db.doc(`datasetStats/${datasetId}`).set(dataset));
                    }
                    else {
                        save$ = from(this.db.collection("datasetStats").add(dataset));
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

    loadDataSets(): Observable<Dataset_Stats[]> {
         return this.db.collection(
            "datasetStats")
            .get()
             .pipe(
                 tap((data)=>console.log("load datasetStats",data)),
                 map(result => convertSnaps<Dataset_Stats>(result))
             );

    }

}








