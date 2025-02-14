import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'libros',
    loadChildren: () => import('./libros/libros.module').then(m => m.LibrosPageModule)
  },
  {
    path: 'nuevo-libro',
    loadChildren: () => import('./nuevo-libro/nuevo-libro.module').then(m => m.NuevoLibroPageModule)
  },
  {
    path: 'nueva-resenia/:id',
    loadChildren: () => import('./nueva-resenia/nueva-resenia.module').then(m => m.NuevaReseniaPageModule)
  },
  {
    path: 'listar-resenias/:id',
    loadChildren: () => import('./listar-resenias/listar-resenias.module').then(m => m.ListarReseniasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
