import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'preguntas', loadChildren: './preguntas/preguntas.module#PreguntasPageModule' },
  { path: 'modal-perdio', loadChildren: './modal-perdio/modal-perdio.module#ModalPerdioPageModule' },
  { path: 'modal-ganador', loadChildren: './modal-ganador/modal-ganador.module#ModalGanadorPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
