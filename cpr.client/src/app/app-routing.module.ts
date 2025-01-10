import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChamadoComponent } from './chamado/chamado.component';
import { HistoricoComponent } from './chamado/historico.component';

const routes: Routes = [
  { path: 'chamados', component: ChamadoComponent },
  { path: 'historico', component: HistoricoComponent },  // Rota para a página de histórico
  { path: '', redirectTo: '/chamados', pathMatch: 'full' },  // Redireciona para 'chamados' por padrão
  { path: '**', redirectTo: '/chamados' }  // Redireciona para 'chamados' caso a rota não exista
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
