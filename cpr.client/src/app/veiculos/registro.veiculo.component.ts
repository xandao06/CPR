import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';


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
  observacao: string;
  litrosAbastecido: number;
  precoAbastecimento: string;
  combustivel: string;
  mediaPorLitro: string;
  ano: string;
  renavan: string;
}

@Component({
  selector: 'app-registro-veiculo',
  templateUrl: './registro.veiculo.component.html',
  styleUrls: ['../app.component.css']
})
export class RegistroVeiculoComponent implements OnInit {
  public veiculos: Veiculo[] = [];
  public veiculoForm: FormGroup;
  public filteredVeiculos: Veiculo[] = [];

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
      ano: [''],
      renavan: [''],
      observacao: [''],
      litrosAbastecido: [''],
      precoAbastecimento: [''],
      combustivel: [''],
      mediaPorLitro: ['']
    });
  }

  async ngOnInit() {
    await this.getVeiculos();
  }

  async getVeiculos() {
    const result = await lastValueFrom(
      this.http.get<{ syncedVeiculos: number; veiculos: Veiculo[] }>('https://192.168.10.230:7048/veiculos/sync/getVeiculos').pipe(
        map(response => response.veiculos)
      )
    );
    this.veiculos = result;
  }

  async createVeiculo(veiculo: Veiculo) {
    const newVeiculo = await lastValueFrom(this.http.post<Veiculo>('https://192.168.10.230:7048/veiculos/sync/createVeiculos', veiculo));
    if (newVeiculo) {
      this.veiculos.push(newVeiculo);
      await this.getVeiculos();
    }
  }

  async editVeiculo(veiculo: Veiculo) {
    const updatedVeiculo = await lastValueFrom(
      this.http.put<Veiculo>('https://192.168.10.230:7048/veiculos/sync/editVeiculo', veiculo)
    );
    if (updatedVeiculo) {
      await this.getVeiculos();
    }
  }

  async deleteVeiculo(id: number) {
      const deleted = await lastValueFrom(
        this.http.delete<boolean>(`https://192.168.10.230:7048/veiculos/sync/deleteVeiculo/${id}`)
      );
      if (deleted) {
        await this.getVeiculos();
      }
  }

}

