import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR} from '@angular/fire/auth';
import {AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR} from '@angular/fire/firestore';
import {AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from '@angular/fire/functions';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {EditCourseDialogComponent} from './edit-course-dialog/edit-course-dialog.component';
import {LoginComponent} from './login/login.component';
import {CoursesCardListComponent} from './courses-card-list/courses-card-list.component';
import {AppRoutingModule} from './app-routing.module';
import {CourseComponent} from './course/course.component';
import {CreateCourseComponent} from './create-course/create-course.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CreateUserComponent} from './create-user/create-user.component';
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import { Dialogdd, LoadCSVComponent } from './load-csv/load-csv.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { VarViewComponent } from './var-view/var-view.component';
import { VarTestComponent } from './var-test/var-test.component';
import { Svg1Component } from './svg1/svg1.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './reducers/main.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MainEffects } from './effects/main.effects';
import { DataDivComponent } from './data-div/data-div.component';
import { StreamDivComponent } from './stream-div/stream-div.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { LoadCSV_mapComponent } from './load-csv_map/load-csv_map.component';
import { Svg1_mapComponent } from './svg1_map/svg1_map.component';
import { D3Service } from './d3';
import {MatSliderModule} from '@angular/material/slider';
import { SwitchDivComponent } from './switch-div/switch-div.component';
import { StatDivComponent } from './stat-div/stat-div.component';
import { TestChartComponent } from './chart/test-chart/test-chart.component';

import { myTableComponent } from './chart/table/mytable.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { LoadCSV_ddComponent } from './load-csv_dd/load-csv_dd.component';
import { TestddComponent } from './dd/testdd/testdd.component';
import { TableauCroiseComponent } from './tableau-croise/tableau-croise.component';
import { SelectVarsComponent } from './select-vars/select-vars.component';
import { DdVarNameComponent } from './dd/dd-var-name/dd-var-name.component';
import { CrossVarComponent } from './chart/cross-var/cross-var.component';

import {MatExpansionModule} from '@angular/material/expansion';
import { CrossVarMultiComponent } from './chart/cross-var-multi/cross-var-multi.component';
import { DatasetComponent } from './dataset/dataset.component';
import { DataSetCardListComponent } from './dataSet-card-list/dataSet-card-list.component';
import { CreateDatasetComponent } from './create-dataset/create-dataset.component';
import { Svg2Component } from './svg2/svg2.component';
import { EditDsDialogComponent } from './edit-ds-dialog/edit-ds-dialog.component';
import { DataViewTestComponent, DialogTest } from './data-view-test/data-view-test.component';
import { Graph1Component } from './chart/graph1/graph1.component';


@NgModule({
  declarations: [
    Svg2Component,
    AppComponent,
    HomeComponent,
    AboutComponent,
    DatasetComponent,
    DataSetCardListComponent,
    CourseComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    LoginComponent,
    CreateCourseComponent,
    CreateDatasetComponent,
    CreateUserComponent,
    LoadCSVComponent,
    VarViewComponent,
    VarTestComponent,
    Svg1Component,
    DataDivComponent,
    StreamDivComponent,
    LoadCSV_mapComponent,
    Svg1_mapComponent,
    SwitchDivComponent,
    StatDivComponent,
    TestChartComponent,
    myTableComponent,
    LoadCSV_ddComponent,
    TestddComponent,
    TableauCroiseComponent,
    SelectVarsComponent,
    DdVarNameComponent,
    CrossVarComponent,
    CrossVarMultiComponent,
    EditDsDialogComponent,
    Dialogdd,
    DataViewTestComponent,
    Graph1Component,
    DialogTest
  ],
  imports: [
    MatCheckboxModule,
    MatSliderModule,
    MatGridListModule,
    NgxCsvParserModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatExpansionModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    StoreModule.forRoot({ main: reducer }),
    EffectsModule.forRoot([MainEffects]),
    Ng2GoogleChartsModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
      D3Service,
      { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9099] : undefined },
      { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
      { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 5001] : undefined }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



