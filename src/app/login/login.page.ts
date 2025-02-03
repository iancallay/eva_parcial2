import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { LoginService } from '../services/login/login.service';
import { SesionesService } from '../services/sesiones/sesiones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';
  constructor(
    private route: ActivatedRoute,
    private NavController: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private loginService: LoginService,
    private sesionService: SesionesService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  crearCuenta() {
    console.log('login')
  }

  async login() {
    this.presentLoading();

    let data = {
      accion: 'login',
      email: this.username,
      password: this.password
    };

    this.loginService.login(data).subscribe(
      async (resp: any) => {
        if (resp.estado) {
          await this.sesionService.guardarSesion(resp);
          this.router.navigate(['/libros']);
        } else {
          await this.presentAlert(resp.response);
          this.router.navigate(['/login']);
        }
      },
      async (error) => {
        await this.presentAlert('Error de conexión, intenta nuevamente');
      }
    );
  }


  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando información...',
      duration: 500,
      spinner: 'bubbles'
    });
    await loading.present();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  logout() {
    this.presentLoading();
    this.sesionService.cerrarSesion();
    this.router.navigate(['/login']);
  }

}
