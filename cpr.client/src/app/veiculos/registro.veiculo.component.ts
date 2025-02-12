import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { Veiculo } from './veiculo.component';



export interface RegistroVeiculo {
  id: number;
  veiculoId: number;
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
  public veiculos: Veiculo[] = [];
  public registrosVeiculo: RegistroVeiculo[] = [];
  public registrosForm: FormGroup;
  public registroId: number | null = null;
  public filteredRegistros: RegistroVeiculo[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder, private apiConfig: AppComponent, private route: ActivatedRoute) {
    this.registrosForm = this.fb.group({
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
    this.route.paramMap.subscribe(async params => {
      const veiculoId = Number(params.get('id')); // Captura o ID da URL
      if (veiculoId && !isNaN(veiculoId)) {
        this.registroId = veiculoId;
        await this.getRegistroVeiculos(veiculoId);
      }
    });
  }

  async getRegistroVeiculos(veiculoId: number) {
    const result = await lastValueFrom(
      this.http.get<{ syncedRegistros: number; registros: RegistroVeiculo[] }>(
        this.apiConfig.getApiUrl(`registroVeiculos/sync/getRegistroVeiculos/${veiculoId}`)
      ).pipe(map(response => response.registros))
    );
    this.registrosVeiculo = result;
  }

  async createRegistroVeiculo(registro: RegistroVeiculo) {
    registro.veiculoId = this.registroId!; // Garante que o ID do veículo seja passado

    const newRegistro = await lastValueFrom(
      this.http.post<RegistroVeiculo>(
        this.apiConfig.getApiUrl('registroVeiculos/sync/createRegistroVeiculos'),
        registro
      )
    );

    if (newRegistro) {
      this.registrosVeiculo.push(newRegistro);
      await this.getRegistroVeiculos(this.registroId!);
    }
  }



  async editRegistroVeiculo(registros: RegistroVeiculo) {
    registros.id = this.registroId!; // Mantém o vínculo do registro com o veículo

    const updatedRegistro = await lastValueFrom(
      this.http.put<RegistroVeiculo>(
        this.apiConfig.getApiUrl('registroVeiculos/sync/editRegistroVeiculo'),
        registros
      )
    );

    if (updatedRegistro) {
      await this.getRegistroVeiculos(this.registroId!); // Atualiza os registros
    }
  }


  async deleteRegistroVeiculo(id: number) {
    const deleted = await lastValueFrom(
      this.http.delete<boolean>(this.apiConfig.getApiUrl(`registroVeiculos/sync/deleteRegistroVeiculo/${id}`))
    );

    if (deleted) {
      await this.getRegistroVeiculos(this.registroId!); // Atualiza a lista
    }
  }


  //async getVeiculoById(id: number) {
  //  const veiculo = await lastValueFrom(
  //    this.http.get<Veiculo>(this.apiConfig.getApiUrl(`veiculos/sync/getVeiculoById/${id}`))
  //  );
  //  if (veiculo) {
  //    this.veiculos = [veiculo];
  //  }
  //}

}

