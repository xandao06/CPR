import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from '../app.component';


export interface Veiculo {
  id: number;
  data: Date;
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
  modelo: string;
  precoEtanol: string;
  precoGasolina: string;
  placa: string;
  ano: string;
  renavan: string;
  mediaPorLitro: string;
  observacao: string;
  litrosAbastecido: number;
  precoAbastecimento: string;
  combustivel: string;
}

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['../app.component.css']
})
export class VeiculoComponent implements OnInit {
  public veiculos: Veiculo[] = [];
  public veiculoForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.veiculoForm = this.fb.group({
      data: [''],
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
      modelo: [''],
      precoEtanol: [''],
      precoGasolina: [''],
      placa: [''],
      observacao: [''],
      ano: [''],
      renavan: [''],
      mediaPorLitro: [''],
      combustivel: [''],
      litrosAbastecido: [''],
      precoAbastecimento: ['']

    });
  }

  async ngOnInit() {
    await this.getVeiculos();
  }

  async getVeiculos() {
    const result = await lastValueFrom(
      this.http.get<{ syncedVeiculos: number; veiculos: Veiculo[] }>(
        this.apiConfig.getApiUrl('veiculos/sync/getVeiculos')
      ).pipe(map(response => response.veiculos))
    );
    this.veiculos = result;
  }

  async createVeiculo(veiculo: Veiculo) {
    const newVeiculo = await lastValueFrom(
      this.http.post<Veiculo>(
        this.apiConfig.getApiUrl('veiculos/sync/createVeiculos'),
        veiculo
      )
    );
    if (newVeiculo) {
      this.veiculos.push(newVeiculo);
      await this.getVeiculos();
    }
  }

  async editVeiculo(veiculo: Veiculo) {
    const updatedVeiculo = await lastValueFrom(
      this.http.put<Veiculo>(this.apiConfig.getApiUrl('veiculos/sync/editVeiculos'), veiculo)
    );
    if (updatedVeiculo) {
      await this.getVeiculos();
    }
  }

  async deleteVeiculo(id: number) {
    const deleted = await lastValueFrom(
      this.http.delete<boolean>(this.apiConfig.getApiUrl('veiculos/sync/deleteVeiculos/${id}'),)
    );
    if (deleted) {
      await this.getVeiculos();
    }
  }

}

