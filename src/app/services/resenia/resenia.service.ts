import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReseniaService {

  private apiURL = environment.apiURL;
  constructor(
    private http: HttpClient
  ) { }

  obtenerResenias(id: any): Observable<any> {
    const data = { accion: 'consultar', id };
    console.log(data);
    return this.http.post<any>(`${this.apiURL}resenias.php`, data);
  }


  guardarRes(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(`${this.apiURL}resenias.php`, data);
  }
}
