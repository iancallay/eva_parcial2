import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SesionesService } from '../services/sesiones/sesiones.service';
import { LibrosService } from '../services/libros/libros.service';

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
    private librosService: LibrosService
  ) { }

  async ngOnInit() {
    this.todos();
    console.log('Libros:', this.libros);
    try {
      const session = await this.sesionService.obtenerSesion();
      if (session) {
        this.usuario = session.data; // Asigna la sesión completa o solo la parte relevante
      } else {
        console.warn('No se encontró ninguna sesión activa');
        this.router.navigate(['/login']);
      }
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

  editarLibro(libro: any) {
    // Lógica para editar un libro existente
    // Puedes abrir un formulario para editar los detalles del libro
  }

  borrarLibro(libro: any) {
    // Lógica para borrar un libro
    // Puedes mostrar un cuadro de diálogo de confirmación antes de borrar el libro
  }

  buscarLibros(event: any) {
    // Lógica para buscar libros
    // Puedes filtrar los libros por título, autor, género, etc.
  }

  backPage() {
    this.router.navigate(['/home']);
  }
}
