import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiURL: string = 'https://libros.ioasystem.com/login.php';

  constructor(private http: HttpClient) { }
  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiURL, data);
  }

  async crearSession(resp: any) {
    await Preferences.set({
      key: 'usuario',
      value: JSON.stringify(resp.usuario)
    });
  }
}
