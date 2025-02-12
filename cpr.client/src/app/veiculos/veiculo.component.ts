import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from '../app.component';


export interface Veiculo {
  id: number;
  modelo: string;
  placa: string;
  ano: string;
  renavan: string;
}

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['../app.component.css']
})
export class VeiculoComponent implements OnInit {
  public veiculos: Veiculo[] = [];
  public veiculoForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private apiConfig: AppComponent) {
    this.veiculoForm = this.fb.group({
      id: [''],
      modelo: [''],
      placa: [''],
      ano: [''],
      renavan: [''],
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
    const headers = { 'Content-Type': 'application/json' };

    console.log('Enviando JSON para API:', JSON.stringify(veiculo));

    const newVeiculo = await lastValueFrom(
      this.http.post<Veiculo>(
        this.apiConfig.getApiUrl('veiculos/sync/createVeiculos'),
        JSON.stringify(veiculo), 
        { headers }
      )
    );

    if (newVeiculo) {
      this.veiculos.push(newVeiculo);
      await this.getVeiculos();
    }
  }


  async editVeiculo(veiculo: Veiculo) {
    const updatedVeiculo = await lastValueFrom(
      this.http.put<Veiculo>(this.apiConfig.getApiUrl('veiculos/sync/editVeiculo'), veiculo)
    );
    if (updatedVeiculo) {
      await this.getVeiculos();
    }
  }

  async deleteVeiculo(id: number) {
    const deleted = await lastValueFrom(
      this.http.delete<boolean>(this.apiConfig.getApiUrl(`veiculos/sync/deleteVeiculo/${id}`),)
    );
    if (deleted) {
      await this.getVeiculos();
    }
  }

}

