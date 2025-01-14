import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChamadoComponent } from './chamado/chamado.component';
import { HistoricoComponent } from './chamado/historico.component';
import { NobreakComponent } from './nobreak/nobreak.component';

const routes: Routes = [
  { path: 'chamados', component: ChamadoComponent },
  { path: 'historico', component: HistoricoComponent },  
  { path: 'nobreaks', component: NobreakComponent },  
  { path: '', redirectTo: '/chamados', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/chamados' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
