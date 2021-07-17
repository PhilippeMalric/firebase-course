import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {CoursesService} from "../services/courses.service";
import { DatasetsService } from '../services/dataset.service';
import { Dataset } from '../model/dataset';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnersCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    datasets$: Observable<Dataset[]>;


    constructor(
      private router: Router,
      private coursesService: CoursesService,
      private dataSetsService: DatasetsService) {

    }

    ngOnInit() {

        this.reloadCourses();
        this.reloadDataSets();
    }

    reloadCourses() {

        this.beginnersCourses$ = this.coursesService.loadCoursesByCategory("BEGINNER").pipe(tap(console.log));

        this.advancedCourses$ = this.coursesService.loadCoursesByCategory("ADVANCED");

    }

    reloadDataSets() {

       this.datasets$ = this.dataSetsService.loadDataSets();
    }

}
