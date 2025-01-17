import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';

export interface Chamado {
  id: number;
  data: Date;
  hora: string;
  cliente: string;
  descricao: string;
  contrato: string;
  urgencia: string;
  status: string;
}

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['../app.component.css']
})
export class HistoricoComponent implements OnInit {
  public chamadosConcluidos: Chamado[] = [];
  public filteredChamados: Chamado[] = [];

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    await this.getChamadosConcluidos();
    this.filteredChamados = [...this.chamadosConcluidos];
  }

  async getChamadosConcluidos() {
    this.chamadosConcluidos = await lastValueFrom(
      this.http.get<Chamado[]>('https://192.168.10.230:7048/chamados/sync/getChamadosConcluidos')
    );
    this.filteredChamados = [...this.chamadosConcluidos];
  }

  async deleteChamado(id: number) {
    const deleted = await lastValueFrom(
      this.http.delete<boolean>(`https://192.168.10.230:7048/chamados/sync/deleteChamado/${id}`)
    );
    if (deleted) {
      await this.getChamadosConcluidos();
    }
  }

  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value !== undefined) {
      this.filterChamados(inputElement.value); // Chama a filtragem
    }
  }

  filterChamados(searchTerm: string) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase(); // Convertendo o termo para minúsculas

    this.filteredChamados = this.chamadosConcluidos.filter(chamadosConcluidos =>
      chamadosConcluidos.cliente.toLowerCase().includes(lowerCaseSearchTerm) ||
      chamadosConcluidos.descricao.toLowerCase().includes(lowerCaseSearchTerm) ||
      chamadosConcluidos.status.toLowerCase().includes(lowerCaseSearchTerm) ||
      chamadosConcluidos.urgencia.toLowerCase().includes(lowerCaseSearchTerm) ||
      chamadosConcluidos.contrato.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
}
