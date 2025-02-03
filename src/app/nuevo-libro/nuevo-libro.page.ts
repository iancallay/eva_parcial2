import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrosService } from '../services/libros/libros.service';
import { SesionesService } from '../services/sesiones/sesiones.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-nuevo-libro',
  templateUrl: './nuevo-libro.page.html',
  styleUrls: ['./nuevo-libro.page.scss'],
  standalone: false,
})
export class NuevoLibroPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private libroService: LibrosService,
    private sesionService: SesionesService,
    private alertController: AlertController
  ) { }

  libroId: any;
  titulo: string = '';
  autor: string = '';
  anio: string = '';
  editorial: string = '';
  usuario: any = null;

  async ngOnInit() {
    try {
      const session = await this.sesionService.obtenerSesion();
      if (session) {
        this.usuario = session.data;
        console.log('Usuario:', this.usuario);
      } else {
        console.warn('No se encontró ninguna sesión activa');
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error al cargar la sesión:', error);
      this.router.navigate(['/login']);
    }
  }

  backPage() {
    this.router.navigate(['/libros']);
  }

  nuevoLibro() {
    this.router.navigate(['/nuevo-libro']);
  }

  nuevaResenia() {
    this.router.navigate(['/nueva-resenia']);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  async guardarLibro() {
    let data = {
      accion: 'insertar',
      usuario: this.usuario.usu_id,
      titulo: this.titulo,
      autor: this.autor,
      anio: this.anio,
      editorial: this.editorial
    };

    console.log('Datos del libro:', data);
    this.libroService.guardarLibro(data).subscribe(
      async (resp) => {
        await this.presentAlert(resp.response);

        this.router.navigate(['/libros']);
      },
      async (resp) => {
        await this.presentAlert(resp.response);
        console.error('Error al guardar el libro:', resp.response);
      }
    );

  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
