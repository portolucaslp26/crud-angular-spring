import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CoursesService } from 'src/app/courses/services/courses.service';
import { Course } from 'src/app/courses/model/course';
import { Router } from '@angular/router';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  course!: Course;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    @Inject(MAT_DIALOG_DATA) public method: any,
    private snackbar : MatSnackBar,
    private coursesServices: CoursesService,
    private router: Router,
    private FormBuilder: FormBuilder
  ) {
    this.form = this.FormBuilder.group({
      name: [''],
      category: [''],
    });
  }

  ngOnInit(): void {
  }

  onSuccess(successMsg: string) {
    this.snackbar.open(successMsg, 'Fechar', {duration: 3000});
  }

  updateCourse(course : Course) {
    let text = 'Deseja atualizar o curso?'
    if (confirm(text)) {
      this.coursesServices.updateCourse(this.course._id, this.form.value).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }

  onSubmit() {
    this.coursesServices.save(this.form.value)
    .subscribe(() => {this.onSuccess('Curso salvo com sucesso')});
  }

  deleteCourse(course: Course) {
    this.coursesServices.deleteCourse(course).subscribe(() => {
      this.onSuccess('Curso deletado com sucesso!')
      this.ngOnInit();
  });
  }

}
