import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import { Course } from 'src/app/model/course';
import { Dataset_Stats } from 'src/app/model/dataset';
import { CoursesService } from 'src/app/services/courses.service';
import { DatasetsService } from 'src/app/services/dataset.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnersCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    datasets$: Observable<Dataset_Stats[]>;


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
