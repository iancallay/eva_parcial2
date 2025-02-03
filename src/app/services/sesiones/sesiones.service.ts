import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class SesionesService {

  constructor() { }

  async guardarSesion(usuario: any) {
    await Preferences.set({
      key: 'usuario',
      value: JSON.stringify(usuario)
    });
  }

  async obtenerSesion() {
    const { value } = await Preferences.get({ key: 'usuario' });
    return value ? JSON.parse(value) : null;
  }

  async cerrarSesion() {
    await Preferences.remove({ key: 'usuario' });
  }

}
