import { Component, OnInit } from '@angular/core';
import { ReseniaService } from '../services/resenia/resenia.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nueva-resenia',
  templateUrl: './nueva-resenia.page.html',
  styleUrls: ['./nueva-resenia.page.scss'],
  standalone: false
})
export class NuevaReseniaPage implements OnInit {

  libroId: any;
  comentarios: string = '';
  calificacion: number = 0;
  constructor(
    private reseniaService: ReseniaService,
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.libroId = this.route.snapshot.paramMap.get('libroId');
    console.log('ID:', this.libroId);
  }

  backPage() {
    window.history.back();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async guardarRes() {
    let data = {
      accion: 'insertar',
      codigo: 1,
      usuario: 1,
      comentarios: this.comentarios,
      calificacion: this.calificacion,

    };

    this.reseniaService.guardarRes(data).subscribe(
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

}
