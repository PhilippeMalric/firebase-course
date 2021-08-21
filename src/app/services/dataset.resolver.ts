import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {CoursesService} from "./courses.service";
import {Observable} from "rxjs";
import { DatasetsService } from "./dataset.service";
import { Dataset_Stats } from "../model/dataset";

@Injectable({
    providedIn: "root"
})
export class DatasetResolver implements Resolve<Dataset_Stats>{

    constructor(private datasetService: DatasetsService) {}

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Dataset_Stats> {

        const datasetUrl = route.paramMap.get("datasetUrl");

        return this.datasetService.findDatasetByUrl(datasetUrl);
    }

}
