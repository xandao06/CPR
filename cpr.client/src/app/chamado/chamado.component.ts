import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface Chamado {
  id: number;
  data: string;
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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getChamados();
  }

  getChamados() {
    this.http.get<Chamado[]>('/chamados/sync').subscribe(
      (result) => {
        this.chamados = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
