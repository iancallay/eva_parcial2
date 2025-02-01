import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
  standalone: false,
})
export class LibrosPage implements OnInit {

  tasks: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  cerrarSesion() {
    // Lógica para cerrar sesión
    // Puedes redirigir al usuario a la página de inicio de sesión o realizar otras acciones necesarias
  }

  nuevoLibro() {
    this.router.navigate(['/nuevo-libro']);
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
