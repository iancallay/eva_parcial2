import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReseniaService } from '../services/resenia/resenia.service';

@Component({
  selector: 'app-listar-resenias',
  templateUrl: './listar-resenias.page.html',
  styleUrls: ['./listar-resenias.page.scss'],
  standalone: false
})
export class ListarReseniasPage implements OnInit {

  libroId: any;

  resenias: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reseniaService: ReseniaService
  ) { }

  ngOnInit() {
    this.libroId = this.route.snapshot.paramMap.get('id');
    console.log('ID del libro:', this.libroId);

    if (!this.libroId) {
      console.error('No se proporcionó un ID de libro válido.');
      this.router.navigate(['/home']);
    } else {
      this.cargarResenia(this.libroId);
    }
  }

  cargarResenia(id: string) {
    this.reseniaService.obtenerResenias(id).subscribe(
      (resp) => {
        this.resenias = resp.data;
        console.log('Reseñas obtenidas:', resp.data);
      },
      (resp) => {
        console.error('Error al obtener las reseñas:', resp.response);
      }
    );
  }

  nuevaResenia(id: any) {
    console.log('ID del libro:', id);
    this.router.navigate(['/nueva-resenia', id]);
  }

  nueva() {

  }

  backPage() {
    this.router.navigate(['/libros']);
  }

}
