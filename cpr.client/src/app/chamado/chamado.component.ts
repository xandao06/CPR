import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom, map } from 'rxjs';


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
  //public chamadoForm: FormGroup;
  public showModal: boolean = false;

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    await this.getChamados();
  }

  async getChamados() {
      const result = await lastValueFrom(
        this.http.get<{ syncedChamados: number; chamados: Chamado[] }>('/chamados/sync/getChamados').pipe(
          map(response => response.chamados) // Extrai apenas a propriedade 'chamados'
        )
      );
      this.chamados = result;
    }


  async createChamado(chamado: Chamado) {
    try {
      const newChamado = await lastValueFrom(this.http.post<Chamado>('/chamados/sync/createChamados', chamado));
      if (newChamado) {
        this.chamados.push(newChamado);
        console.log('Novo chamado criado:', newChamado);
      }
    } catch (error) {
      console.error('Erro ao criar chamado:', error);
    }
  }



  openCreateModal() {
    this.showModal = true;
  }

  closeCreateModal() {
    this.showModal = false;
  }

}

