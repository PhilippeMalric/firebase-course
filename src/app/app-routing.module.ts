import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CourseResolver} from "./services/course.resolver";
import { DatasetResolver } from './services/dataset.resolver';
import { AboutComponent } from './app_sections/main_pages/about/about.component';
import { LoadCSV_mapComponent } from './Dataset_related/Load_related/load-csv_map/load-csv_map.component';
import { CourseComponent } from './app_sections/main_pages/course/course.component';
import { HomeComponent } from './app_sections/main_pages/home/home.component';
import { CreateCourseComponent } from './app_sections/main_pages/create-course/create-course.component';
import { CreateDatasetComponent } from './app_sections/main_pages/create-dataset/create-dataset.component';
import { CreateUserComponent } from './app_sections/main_pages/create-user/create-user.component';
import { LoginComponent } from './app_sections/main_pages/login/login.component';
import { DatasetComponent } from './app_sections/main_pages/dataset/dataset.component';
import { VarViewComponent } from './Dataset_related/show_dataset_related/div/var-view/var-view.component';
import { TableauCroiseComponent } from './Dataset_related/show_dataset_related/div/tableau-croise/tableau-croise.component';

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
