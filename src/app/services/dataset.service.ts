import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {from, Observable, of} from "rxjs";
import {Course} from "../model/course";
import {concatMap, map} from "rxjs/operators";
import {convertSnaps} from "./db-utils";
import { Dataset } from "../model/dataset";


@Injectable({
    providedIn: "root"
})
export class DatasetsService {

    constructor(private db: AngularFirestore) {

    }

    findDatasetByUrl(datasetUrl: string): Observable<Course | null> {
        return this.db.collection("dataset",
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
        return from(this.db.doc(`dataset/${datasetId}`).delete());
    }

    updateDataset(datasetId:string, changes: Partial<Course>):Observable<any> {
        return from(this.db.doc(`dataset/${datasetId}`).update(changes));
    }

    createDataset(newDataset: Partial<Dataset>, datasetId?:string) {
        return this.db.collection("dataset",
                ref => ref.orderBy("seqNo", "desc").limit(1))
            .get()
            .pipe(
                concatMap(result => {

                    const datasets = convertSnaps<Dataset>(result);

                    const lastDatasetSeqNo = datasets[0]?.seqNo ?? 0;

                    const dataset = {
                        ...newDataset,
                        seqNo: lastDatasetSeqNo + 1
                    }

                    let save$: Observable<any>;

                    if (datasetId) {
                        save$ = from(this.db.doc(`dataset/${datasetId}`).set(dataset));
                    }
                    else {
                        save$ = from(this.db.collection("dataset").add(dataset));
                    }

                    return save$
                        .pipe(
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

    loadDataSetsByCategory(category:string): Observable<Course[]> {
         return this.db.collection(
            "courses",
            ref => ref.where("categories", "array-contains", category)
                .orderBy("seqNo")
            )
            .get()
             .pipe(
                 map(result => convertSnaps<Dataset>(result))
             );

    }

}








