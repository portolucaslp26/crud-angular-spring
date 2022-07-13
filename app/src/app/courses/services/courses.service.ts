import { catchError, map, Observable, tap } from 'rxjs';
import { Course } from './../model/course';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  edit: boolean = false;
  courses: Course[] = [];

  private readonly API = 'api/courses'

  constructor(
    private httpClient: HttpClient,
    ) { }

  listCourses() {
    return this.httpClient.get<Course[]>(this.API)
  }

  save(course: Course) {
    return this.httpClient.post<Course>(this.API, course);
  }

  updateCourse(id: any, requestBody: Course) {
    return this.httpClient.put<Course>(`${this.API}/${id}`, requestBody);
  }

  deleteCourse(course: Course) {
    return this.httpClient.delete<Course>(`${this.API}/${course._id}`)
  }

  getCourse(course: Course): Observable<Course> {
    const url = `${this.API}/${course._id}`;
    return this.httpClient.get<Course>(url);
  }

  findById(id: number): Observable<Course> {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  onEdit() {

  }
}
