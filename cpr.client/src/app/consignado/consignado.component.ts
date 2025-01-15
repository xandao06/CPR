import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';


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

  constructor(private http: HttpClient, private fb: FormBuilder) {
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
  }

  async getConsignados() {
    const result = await lastValueFrom(
      this.http.get<{ syncedConsignados: number; equipamentos: Equipamento[] }>('https://192.168.10.230:7048/consignados/sync/getConsignados').pipe(
        map(response => response.equipamentos)
      )
    );
    this.equipamentos = result;
  }

  async createConsignado(equipamento: Equipamento) {
    const newConsignado = await lastValueFrom(this.http.post<Equipamento>('https://192.168.10.230:7048/consignados/sync/createConsignados', equipamento));
    if (newConsignado) {
      this.equipamentos.push(newConsignado);
      await this.getConsignados();
    }
  }

  async editConsignado(equipamento: Equipamento) {
    const updatedConsignado = await lastValueFrom(
      this.http.put<Equipamento>('https://192.168.10.230:7048/consignados/sync/editConsignado', equipamento)
    );
    if (updatedConsignado) {
      await this.getConsignados();
    }
  }

  async deleteConsignado(id: number) {
      const deleted = await lastValueFrom(
        this.http.delete<boolean>(`https://192.168.10.230:7048/consignados/sync/deleteConsignado/${id}`)
      );
      if (deleted) {
        await this.getConsignados();
      }
  }

  async concluirConsignado(id: number) {
      const concludedConsignado = await lastValueFrom(
        this.http.put<Equipamento>(`https://192.168.10.230:7048/consignados/sync/concluirConsignado/${id}`, {})
      );
    if (concludedConsignado) {
      this.equipamentos = this.equipamentos.filter(c => c.id !== id);
      await this.getConsignados();
      }
    }
}

