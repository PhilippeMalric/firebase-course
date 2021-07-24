import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {CourseComponent} from './course/course.component';
import {LoginComponent} from './login/login.component';
import {CreateCourseComponent} from './create-course/create-course.component';
import {AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {CreateUserComponent} from './create-user/create-user.component';
import {CourseResolver} from "./services/course.resolver";
import { LoadCSVComponent } from './load-csv/load-csv.component';
import { VarViewComponent } from './var-view/var-view.component';
import { DataDivComponent } from './data-div/data-div.component';
import { LoadCSV_mapComponent } from './load-csv_map/load-csv_map.component';
import { TableauCroiseComponent } from './tableau-croise/tableau-croise.component';
import { DatasetComponent } from './dataset/dataset.component';
import { DatasetResolver } from './services/dataset.resolver';
import { CreateDatasetComponent } from './create-dataset/create-dataset.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create-course',
    component: CreateCourseComponent

  },
  {
    path: 'create-dataset',
    component: CreateDatasetComponent

  },
  {
    path: 'varview',
    component: VarViewComponent

  },
  {
    path: 'svg',
    component: LoadCSV_mapComponent

  },
  
  {
    path: 'create-user',
    component: CreateUserComponent

  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'courses/:courseUrl',
    component: CourseComponent,
    resolve: {
        course: CourseResolver
    }
  },
  {
    path: 'datasets/:datasetUrl',
    component: DatasetComponent,
    resolve: {
      dataset: DatasetResolver
    }
  },
  {
    path: 'tb',
    component: TableauCroiseComponent
  },
  
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
