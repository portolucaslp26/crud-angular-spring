import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from './../services/courses.service';
import { Course } from './../model/course';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of, map, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$!: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private coursesServices: CoursesService,
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location

  ) {

  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
    this.courses$ = this.coursesServices.listCourses()
      .pipe(
        tap((res) => { console.log(res) }),
        catchError(error => {
          this.onError(`${error.status} ${error.statusText}`);
          return of([]);
        })
      );
  }

  onDelete(course: Course) {
    let text = 'Deseja deletar o curso?'
    if (confirm(text)) {
      this.coursesServices.deleteCourse(course).subscribe(() => {
          this.onSuccess('Curso deletado com sucesso!')
          this.ngOnInit();
      });
    }
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course) {
    this.coursesServices.getCourse(course).subscribe((res) => {
      this.router.navigate(['edit', res._id], { relativeTo: this.route });
    });
  }

  onSuccess(successMsg: string) {
    this.snackBar.open(successMsg, 'Fechar', {duration: 3000});
  }

}
