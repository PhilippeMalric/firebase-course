import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import { Dataset_Stats } from 'src/app/model/dataset';
import { DatasetsService } from 'src/app/services/dataset.service';


@Component({
    selector: 'edit-ds-dialog',
    templateUrl: './edit-ds-dialog.component.html',
    styleUrls: ['./edit-ds-dialog.component.css']
})
export class EditDsDialogComponent {

    form:FormGroup;

    dataset: Dataset_Stats;

    constructor(
        private dialogRef: MatDialogRef<EditDsDialogComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) dataset: Dataset_Stats,
        private datasetsService: DatasetsService
    ) {

        this.dataset = dataset;

        this.form = this.fb.group({
            description: [dataset.description, Validators.required],
            longDescription: [dataset.longDescription, Validators.required],
            rowsCount: [dataset.rowsCount]
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






