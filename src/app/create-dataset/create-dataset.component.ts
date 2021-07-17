import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {catchError, concatMap, last, map, take, tap} from 'rxjs/operators';
import {from, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;
import {CoursesService} from "../services/courses.service";
import { select, Store } from '@ngrx/store';
import { selectFileState } from '../reducers';
import { Dataset } from '../model/dataset';
import { DatasetsService } from '../services/dataset.service';

@Component({
  selector: 'create-dataset',
  templateUrl: 'create-dataset.component.html',
  styleUrls: ['create-dataset.component.css']
})
export class CreateDatasetComponent implements OnInit {

  courseId:string;

  form = this.fb.group({
     description:  ['', Validators.required],
      category: ["BEGINNER"],
      url: ['', Validators.required],
      longDescription: [''],
      promo: [false],
      promoStartAt: [null]
  });

  constructor(private fb:FormBuilder,
              private coursesService:CoursesService,
              private afs: AngularFirestore,
              private router: Router,
              private store:Store,
              private datasetsService:DatasetsService) {

                this.store.pipe(select(selectFileState)).subscribe((data)=>{
                    console.log(data)
                    this.form.patchValue({description:data.fileName})
                }
                    
                )

  }

  ngOnInit() {
      this.courseId = this.afs.createId();
  }

    onCreateCourse() {

        const val = this.form.value;

        const newCourse: Partial<Dataset> = {
            description:  val.description,
            url: val.url,
            longDescription: val.longDescription,
            promo: val.promo,
            categories: [val.category]
        };

        let today = new Date();
        let dd:any = today.getDate();
        
        let mm:any = today.getMonth()+1; 
        let yyyy = today.getFullYear();
        if(dd<10) 
        {
            dd ='0'+dd;
        } 
        
        if(mm<10) 
        {
            mm='0'+mm;
        } 

      console.log(yyyy+"-"+mm+"-"+dd)
      newCourse.promoStartAt = Timestamp.fromDate(new Date());

      this.datasetsService.createDataset(newCourse, this.courseId)
          .pipe(
              tap(course => {
                  console.log("Created new course: ", course);
                  this.router.navigateByUrl("/datasets/"+newCourse.url);
              }),
              catchError(err => {
                  console.log(err);
                  alert("Could not create the course.");
                  return throwError(err);
              })
          )
          .subscribe();




    }
}
