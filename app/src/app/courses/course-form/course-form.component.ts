import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Course } from '../model/course';
import { Observable, catchError, of } from 'rxjs';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;
  listCourses: any;

  constructor(
    private formBuilder: FormBuilder,
    public courseService: CoursesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private location: Location
    ) {
    this.form = this.formBuilder.group({
      name: [''],
      category: [''],
    });
  }

  ngOnInit(): void {
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onSuccess(successMsg: string) {
    this.snackBar.open(successMsg, 'Fechar', {duration: 3000});
    this.location.back();
    this.courseService.onEdit();
  }

  onSubmit() {
    if (!this.form.value.name || !this.form.value.category) {
      this.onError('Preencha todos os campos');
      return;
    }
    else if (this.form.valid) {
      this.courseService.save(this.form.value)
        .subscribe(() => {
          this.onSuccess('Curso criado com sucesso');
        }, error => {
          this.onError(error.error.message);
        }
      );
    }
  }

  onCancel() {
    this.location.back()
    this.courseService.onEdit();
  }
}

