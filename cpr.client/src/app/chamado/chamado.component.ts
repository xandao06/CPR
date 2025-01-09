import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';


export interface Chamado {
  id: number;
  data: Date;
  hora: string;
  cliente: string;
  descricao: string;
  contrato: string;
  urgencia: string;
  status: string;
  opcoes: string;
}

@Component({
  selector: 'app-chamado',
  templateUrl: './chamado.component.html',
  styleUrls: ['../app.component.css']
})
export class ChamadoComponent implements OnInit {
  public chamados: Chamado[] = [];
  public chamadoForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.chamadoForm = this.fb.group({
      data: [''],
      hora: [''],
      cliente: [''],
      descricao: [''],
      contrato: [''],
      urgencia: [''],
      status: ['Pendente'],
      opcoes: ['']
    });
  }

  async ngOnInit() {
    await this.getChamados();
  }

  async getChamados() {
    const result = await lastValueFrom(
      this.http.get<{ syncedChamados: number; chamados: Chamado[] }>('https://localhost:7048/chamados/sync/getChamados').pipe(
        map(response => response.chamados)
      )
    );
    this.chamados = result;
  }

  async createChamado(chamado: Chamado) {
    const newChamado = await lastValueFrom(this.http.post<Chamado>('https://localhost:7048/chamados/sync/createChamados', chamado));
    if (newChamado) {
      this.chamados.push(newChamado);
      await this.getChamados();
    }
  }

  async editChamado(chamado: Chamado) {
    const updatedChamado = await lastValueFrom(
      this.http.put<Chamado>('https://localhost:7048/chamados/sync/editChamado', chamado)
    );
    if (updatedChamado) {
      await this.getChamados(); 
    }
  }

  async deleteChamado(id: number) {
      const deleted = await lastValueFrom(
        this.http.delete<boolean>(`https://localhost:7048/chamados/sync/deleteChamado/${id}`)
      );
      if (deleted) {
        await this.getChamados(); 
      }
  }

  async concluirChamado(id: number) {
    const concludedChamado = await lastValueFrom(
      this.http.put<Chamado>(`https://localhost:7048/chamados/sync/concluirChamado/${id}`, {})
    );
    if (concludedChamado) {
      const index = this.chamados.findIndex(c => c.id === concludedChamado.id);
      if (index !== -1) {
        this.chamados[index] = concludedChamado;
      }
    }
  }


}

