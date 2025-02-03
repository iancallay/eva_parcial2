import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SesionesService } from '../services/sesiones/sesiones.service';
import { LibrosService } from '../services/libros/libros.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
  standalone: false,
})
export class LibrosPage implements OnInit {

  libros: any = [];
  usuario: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sesionService: SesionesService,
    private librosService: LibrosService,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    try {
      const session = await this.sesionService.obtenerSesion();
      if (session) {
        this.usuario = session.data; // Asigna la sesión completa o solo la parte relevante
      } else {
        console.warn('No se encontró ninguna sesión activa');
        this.router.navigate(['/login']);
      }
      this.todos();
    } catch (error) {
      console.error('Error al cargar la sesión:', error);
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.sesionService.cerrarSesion();
    this.router.navigate(['/login']);
  }

  nuevoLibro() {
    this.router.navigate(['/nuevo-libro']);
  }

  todos() {
    let data = {
      accion: 'consultar'
    };
    this.librosService.todosLibros(data).subscribe(
      (data) => {
        this.libros = data.data;
        console.log('Libros obtenidos:', this.libros);
      },
      (error) => {
        console.error('Error al obtener los libros:', error);
      }
    );
  }

  verResenias(id: any) {
    this.router.navigate(['/listar-resenias', id]);
  }

  borrarLibro(id: any) {

    let data = {
      accion: 'eliminar',
      codigo: 9
    };

    this.librosService.eliminarLibro(data).subscribe(
      async (resp) => {
        await this.presentAlert(resp.response);
        this.todos();
      },
      async (resp) => {
        await this.presentAlert(resp.response);
        console.error('Error al guardar el libro:', resp.response);
      }
    );
  }

  buscarLibros(event: any) {
    // Lógica para buscar libros
    // Puedes filtrar los libros por título, autor, género, etc.
  }

  backPage() {
    this.router.navigate(['/home']);
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
