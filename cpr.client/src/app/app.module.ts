import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChamadoComponent } from './chamado/chamado.component';
import { CreateChamadoModalComponent } from '../app/chamado/modal/create.chamado'
import { EditChamadoModalComponent } from '../app/chamado/modal/edit.chamado'
import { DeleteChamadoModalComponent } from '../app/chamado/modal/delete.chamado'
import { ConcluirChamadoModalComponent } from '../app/chamado/modal/concluir.chamado'
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { HistoricoComponent } from './chamado/historico.component';
import { NobreakComponent } from './nobreak/nobreak.component';
import { CreateNobreakModalComponent } from './nobreak/modal/create.nobreak';
import { EditNobreakModalComponent } from './nobreak/modal/edit.nobreak';
import { DeleteNobreakModalComponent } from './nobreak/modal/delete.nobreak';
import { PrintNobreakModalComponent } from './nobreak/modal/print-nobreak-modal.component';
import { ConsignadoComponent } from './consignado/consignado.component';
import { ConcluirConsignadoModalComponent } from './consignado/modal/concluir.consignado';
import { CreateConsignadoModalComponent } from './consignado/modal/create.consignado';
import { DeleteConsignadoModalComponent } from './consignado/modal/delete.consignado';
import { EditConsignadoModalComponent } from './consignado/modal/edit.consignado';
import { VeiculoComponent } from './veiculos/veiculo.component';
import { CreateVeiculoModalComponent } from './veiculos/modal/create.veiculo';
import { EditVeiculoModalComponent } from './veiculos/modal/edit.veiculo';
import { DeleteVeiculoModalComponent } from './veiculos/modal/delete.veiculo';
import { CreateRegistroModalComponent } from './veiculos/modal/create.registro';
import { EditRegistroModalComponent } from './veiculos/modal/edit.registro';
import { DeleteRegistroModalComponent } from './veiculos/modal/delete.registro';
import { RegistroVeiculoComponent } from './veiculos/registro.veiculo.component';

@NgModule({
  declarations: [
    AppComponent,
    ChamadoComponent,
    CreateChamadoModalComponent,
    EditChamadoModalComponent,
    DeleteChamadoModalComponent,
    ConcluirChamadoModalComponent,
    HistoricoComponent,
    NobreakComponent,
    CreateNobreakModalComponent,
    EditNobreakModalComponent,
    DeleteNobreakModalComponent,
    PrintNobreakModalComponent,
    ConsignadoComponent,
    CreateConsignadoModalComponent,
    EditConsignadoModalComponent,
    DeleteConsignadoModalComponent,
    ConcluirConsignadoModalComponent,
    VeiculoComponent,
    CreateVeiculoModalComponent,
    DeleteVeiculoModalComponent,
    EditVeiculoModalComponent,
    CreateRegistroModalComponent,
    EditRegistroModalComponent,
    DeleteRegistroModalComponent,
    RegistroVeiculoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})

export class AppModule { }
