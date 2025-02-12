import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AppComponent } from '../app.component';

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

  constructor(private http: HttpClient, private apiConfig: AppComponent) { }

  async ngOnInit() {
    await this.getChamadosConcluidos();
    this.filteredChamados = [...this.chamadosConcluidos];
    this.sortChamados('data');
  }

  async getChamadosConcluidos() {
    this.chamadosConcluidos = await lastValueFrom(
      this.http.get<Chamado[]>(this.apiConfig.getApiUrl('chamados/sync/getChamadosConcluidos'),)
    );
    this.filteredChamados = [...this.chamadosConcluidos];
    this.sortChamados('data');
  }

  async deleteChamado(id: number) {
    const deleted = await lastValueFrom(
      this.http.delete<boolean>(this.apiConfig.getApiUrl(`chamados/sync/deleteChamado/${id}`),)
    );
    if (deleted) {
      await this.getChamadosConcluidos();
    }
  }

  sortColumn: keyof Chamado | '' = ''; 
  sortDirection: 'asc' | 'desc' = 'asc'; 

  sortChamados(column: keyof Chamado) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredChamados.sort((a, b) => {
      let valueA = a[column];
      let valueB = b[column];

      if (column === 'data') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }

      return 0;
    });
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
