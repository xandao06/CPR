import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  public filteredChamados: Chamado[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder, private apiConfig: AppComponent) {
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
    this.filteredChamados = [...this.chamados];
    this.sortChamados('data');
  }

  async getChamados() {
    const result = await lastValueFrom(
      this.http.get<{ syncedChamados: number; chamados: Chamado[] }>(this.apiConfig.getApiUrl('chamados/sync/getChamados')).pipe(
        map(response => response.chamados)
      )
    );
    this.chamados = result;
    this.filteredChamados = [...this.chamados];
    this.sortChamados(this.sortColumn || 'data');
  }

  async createChamado(chamado: Chamado) {
    const newChamado = await lastValueFrom(this.http.post<Chamado>(this.apiConfig.getApiUrl('chamados/sync/createChamados'), chamado));
    if (newChamado) {
      this.chamados.push(newChamado);
      await this.getChamados();
      this.sortChamados(this.sortColumn || 'data');
    }
  }

  async editChamado(chamado: Chamado) {
    const updatedChamado = await lastValueFrom(
      this.http.put<Chamado>(this.apiConfig.getApiUrl('chamados/sync/editChamado'), chamado)
    );
    if (updatedChamado) {
      await this.getChamados();
      this.sortChamados(this.sortColumn || 'data');
    }
  }

  async deleteChamado(id: number) {
      const deleted = await lastValueFrom(
        this.http.delete<boolean>(this.apiConfig.getApiUrl(`chamados/sync/deleteChamado/${id}`))
      );
      if (deleted) {
        await this.getChamados();
        this.sortChamados(this.sortColumn || 'data');
      }
  }

  async concluirChamado(id: number) {
      const concludedChamado = await lastValueFrom(
        this.http.put<Chamado>(this.apiConfig.getApiUrl(`chamados/sync/concluirChamado/${id}`), {})
      );
      if (concludedChamado) {
        await this.getChamados();
        this.sortChamados(this.sortColumn || 'data');
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
      if (a.status === 'Pendente' && b.status !== 'Pendente') return -1;
      if (a.status !== 'Pendente' && b.status === 'Pendente') return 1;

      let valueA = a[column];
      let valueB = b[column];

      if (column === 'data') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }

      if (column === 'urgencia') {
        const prioridade = ['Alta', 'Média', 'Baixa'];
        valueA = prioridade.indexOf(valueA as string);
        valueB = prioridade.indexOf(valueB as string);
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
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

    this.filteredChamados = this.chamados.filter(chamado =>
      chamado.cliente.toLowerCase().includes(lowerCaseSearchTerm) ||
      chamado.descricao.toLowerCase().includes(lowerCaseSearchTerm) ||
      chamado.status.toLowerCase().includes(lowerCaseSearchTerm) ||
      chamado.urgencia.toLowerCase().includes(lowerCaseSearchTerm) ||
      chamado.contrato.toLowerCase().includes(lowerCaseSearchTerm)
    );
    this.sortChamados(this.sortColumn || 'data');
  }

}

