import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from '../app.component';


export interface Equipamento {
  id: number;
  data: Date;
  hora: string;
  cliente: string;
  descricao: string;
  contrato: string;
  numeroSerie: string;
  status: string;
  marca: string;
  modelo: string;
  preco: string;
  quantidade: number;
  tipo: string;
}

@Component({
  selector: 'app-consignado',
  templateUrl: './consignado.component.html',
  styleUrls: ['../app.component.css']
})
export class ConsignadoComponent implements OnInit {
  public equipamentos: Equipamento[] = [];
  public equipamentoForm: FormGroup;
  public filteredEquipamentos: Equipamento[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder, private apiConfig: AppComponent) {
    this.equipamentoForm = this.fb.group({
      data: [''],
      hora: [''],
      cliente: [''],
      descricao: [''],
      contrato: [''],
      numeroSerie: [''],
      status: 'Emprestado',
      marca: [''],
      modelo: [''],
      preco: [''],
      quantidade: [''],
      tipo: ['']
    });
  }

  async ngOnInit() {
    await this.getConsignados();
    this.filteredEquipamentos = [...this.equipamentos];
  }

  async getConsignados() {
    const result = await lastValueFrom(
      this.http.get<{ syncedConsignados: number; equipamentos: Equipamento[] }>(this.apiConfig.getApiUrl('consignados/sync/getConsignados')).pipe(
        map(response => response.equipamentos)
      )
    );
    this.equipamentos = result;
    this.filteredEquipamentos = [...this.equipamentos];
  }

  async createConsignado(equipamento: Equipamento) {
    const newConsignado = await lastValueFrom(this.http.post<Equipamento>(this.apiConfig.getApiUrl('consignados/sync/createConsignados'), equipamento));
    if (newConsignado) {
      this.equipamentos.push(newConsignado);
      await this.getConsignados();
    }
  }

  async editConsignado(equipamento: Equipamento) {
    const updatedConsignado = await lastValueFrom(
      this.http.put<Equipamento>(this.apiConfig.getApiUrl('consignados/sync/editConsignado'), equipamento)
    );
    if (updatedConsignado) {
      await this.getConsignados();
    }
  }

  async deleteConsignado(id: number) {
      const deleted = await lastValueFrom(
        this.http.delete<boolean>(this.apiConfig.getApiUrl(`consignados/sync/deleteConsignado/${id}`,))
      );
      if (deleted) {
        await this.getConsignados();
      }
  }

  async concluirConsignado(id: number) {
      const concludedConsignado = await lastValueFrom(
        this.http.put<Equipamento>(this.apiConfig.getApiUrl(`consignados/sync/concluirConsignado/${id}`,), {})
      );
    if (concludedConsignado) {
      this.equipamentos = this.equipamentos.filter(c => c.id !== id);
      await this.getConsignados();
      }
  }

  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value !== undefined) {
      this.filterConsignados(inputElement.value);
    }
  }

  filterConsignados(searchTerm: string) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    this.filteredEquipamentos = this.equipamentos.filter(equipamentos =>
      equipamentos.cliente.toLowerCase().includes(lowerCaseSearchTerm) ||
      equipamentos.descricao.toLowerCase().includes(lowerCaseSearchTerm) ||
      equipamentos.status.toLowerCase().includes(lowerCaseSearchTerm) ||
      equipamentos.numeroSerie.toLowerCase().includes(lowerCaseSearchTerm) ||
      equipamentos.tipo.toLowerCase().includes(lowerCaseSearchTerm) ||
      equipamentos.marca.toLowerCase().includes(lowerCaseSearchTerm) ||
      equipamentos.modelo.toLowerCase().includes(lowerCaseSearchTerm) ||
      equipamentos.contrato.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

}

