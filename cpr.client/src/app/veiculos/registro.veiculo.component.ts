import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from '../app.component';


export interface RegistroVeiculo {
  id: number;
  dataUltimaRevisao: Date;
  dataUltimoAbastecimento: Date;
  dataUltimaTrocaOleo: Date;
  dataUltimaCalibragem: Date;
  quilometrosRodados: number;
  quilometrosProximaTrocaOleo: number;
  dataUltimoBalanceamento: Date;
  pecasJaTrocadas: string;
  pecasParaTrocar: string;
  dataTrocaPeca: Date;
  precoEtanol: string;
  precoGasolina: string;
  observacao: string;
  litrosAbastecido: number;
  precoAbastecimento: string;
  combustivel: string;
  mediaPorLitro: string;
}

@Component({
  selector: 'app-registro-veiculo',
  templateUrl: './registro.veiculo.component.html',
  styleUrls: ['../app.component.css']
})
export class RegistroVeiculoComponent implements OnInit {
  public registroVeiculo: RegistroVeiculo[] = [];
  public registroVeiculoForm: FormGroup;
  public veiculoId: number | null = null;
  public filteredRegistrosVeiculos: RegistroVeiculo[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder, private apiConfig: AppComponent) {
    this.registroVeiculoForm = this.fb.group({
      id: [''],
      dataUltimaRevisao: [''],
      dataUltimoAbastecimento: [''],
      dataUltimaTrocaOleo: [''],
      dataUltimaCalibragem: [''],
      quilometrosRodados: [''],
      quilometrosProximaTrocaOleo: [''],
      dataUltimoBalanceamento: [''],
      pecasJaTrocadas: [''],
      pecasParaTrocar: [''],
      dataTrocaPeca: [''],
      precoEtanol: [''],
      precoGasolina: [''],
      observacao: [''],
      litrosAbastecido: [''],
      precoAbastecimento: [''],
      combustivel: [''],
      mediaPorLitro: ['']
    });
  }

  async ngOnInit() {
    await this.getRegistroVeiculos();
  }

  async getRegistroVeiculos() {
    const result = await lastValueFrom(
      this.http.get<{ syncedRegistroVeiculos: number; registroVeiculos: RegistroVeiculo[] }>(
        this.apiConfig.getApiUrl('registroVeiculos/sync/getRegistroVeiculos')
      ).pipe(map(response => response.registroVeiculos))
    );
    this.registroVeiculo = result;
  }

  async createRegistroVeiculo(veiculo: RegistroVeiculo) {
    const newVeiculo = await lastValueFrom(
      this.http.post<RegistroVeiculo>(
        this.apiConfig.getApiUrl('registroVeiculos/sync/createRegistroVeiculos'),
        veiculo
      )
    );
    if (newVeiculo) {
      this.registroVeiculo.push(newVeiculo);
      await this.getRegistroVeiculos();
    }
  }

  async editRegistroVeiculo(registroVeiculo: RegistroVeiculo) {
    const updatedRegistroVeiculo = await lastValueFrom(
      this.http.put<RegistroVeiculo>(this.apiConfig.getApiUrl('registroVeiculos/sync/editRegistroVeiculo'), registroVeiculo)
    );
    if (updatedRegistroVeiculo) {
      await this.getRegistroVeiculos();
    }
  }

  async deleteRegistroVeiculo(id: number) {
      const deleted = await lastValueFrom(
        this.http.delete<boolean>(this.apiConfig.getApiUrl(`registroVeiculos/sync/deleteRegistroVeiculo/${id}`),)
      );
      if (deleted) {
        await this.getRegistroVeiculos();
      }
  }

  async getVeiculoById(id: number) {
    const registroVeiculo = await lastValueFrom(
      this.http.get<RegistroVeiculo>(this.apiConfig.getApiUrl(`registroVeiculos/sync/getVeiculoById/${id}`))
    );
    if (registroVeiculo) {
      this.registroVeiculo = [registroVeiculo];
    }
  }

}

