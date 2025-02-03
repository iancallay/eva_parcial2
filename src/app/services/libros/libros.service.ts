import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private apiURL = environment.apiURL;
  constructor(
    private http: HttpClient
  ) { }


  todosLibros(data: any): Observable<any> {
    console.log(this.apiURL)
    return this.http.post<any>(`${this.apiURL}libros.php`, data);
  }

  guardarLibro(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}libros.php`, data);
  }

  eliminarLibro(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(`${this.apiURL}libros.php`, data);
  }
}
