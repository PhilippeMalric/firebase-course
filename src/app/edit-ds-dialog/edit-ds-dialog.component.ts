import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {CoursesService} from "../services/courses.service";
import { DatasetsService } from '../services/dataset.service';
import { Dataset } from '../model/dataset';


@Component({
    selector: 'edit-ds-dialog',
    templateUrl: './edit-ds-dialog.component.html',
    styleUrls: ['./edit-ds-dialog.component.css']
})
export class EditDsDialogComponent {

    form:FormGroup;

    dataset: Dataset;

    constructor(
        private dialogRef: MatDialogRef<EditDsDialogComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) dataset: Dataset,
        private datasetsService: DatasetsService
    ) {

        this.dataset = dataset;

        this.form = this.fb.group({
            description: [dataset.description, Validators.required],
            longDescription: [dataset.longDescription, Validators.required],
            promo: [dataset.promo]
        });

    }

    close() {
        this.dialogRef.close();

    }

    save() {

        const changes = this.form.value;

        this.datasetsService.updateDataset(this.dataset.id, changes)
            .subscribe(() => {

                this.dialogRef.close(changes);

            });


    }
}






