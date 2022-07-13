import { Course } from './../model/course';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from './../services/courses.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.scss']
})
export class CourseUpdateComponent implements OnInit {
  form: FormGroup;
  course!: Course;

  constructor(
    private formBuilder: FormBuilder,
    public courseService: CoursesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      name: [''],
      category: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']

    this.courseService.findById(id).subscribe(course => {
      this.course = course;
    });
  }

  onUpdate() {
  }

  onCancel() {
    this.location.back()
  }
}
