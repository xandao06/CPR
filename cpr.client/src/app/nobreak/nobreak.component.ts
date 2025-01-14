import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PrintNobreakModalComponent } from './modal/print-nobreak-modal.component';


export interface Nobreak {
  id: number;
  dataTroca: Date;
  dataProximaTroca: Date;
  marca: string;
  modelo: string;
  numeroSerie: string;
  cliente: string;
  descricao: string;
  bateria: string;
  quantidadeBateria: number;
  voltagemEntrada: string;
  voltagemSaida: string;
  capacidade: string;
  funcao: string;
  ordemServico: string;
}

@Component({
  selector: 'app-nobreak',
  templateUrl: './nobreak.component.html',
  styleUrls: ['../app.component.css']
})



export class NobreakComponent implements OnInit {
  public nobreaks: Nobreak[] = [];
  public nobreakForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.nobreakForm = this.fb.group({
      dataTroca: [''],
      dataProximaTroca: [''],
      marca: [''],
      modelo: [''],
      numeroSerie: [''],
      cliente: [''],
      descricao: [''],
      bateria: [''],
      quantidadeBateria: [''],
      voltagemEntrada: [''],
      voltagemSaida: [''],
      capacidade: [''],
      funcao: [''],
      ordemServico: ['']
    });
  }

  async ngOnInit() {
    await this.getNobreaks();
  //  this.sortChamados('data');
  }

  async getNobreaks() {
    const result = await lastValueFrom(
      this.http.get<{ syncedNobreaks: number; nobreaks: Nobreak[] }>('https://192.168.10.230:7048/nobreaks/sync/getNobreaks').pipe(
        map(response => response.nobreaks)
      )
    );
    this.nobreaks = result;
  //  this.sortChamados(this.sortColumn || 'data');
  }

  async createNobreak(nobreak: Nobreak) {
    const newNobreak = await lastValueFrom(this.http.post<Nobreak>('https://192.168.10.230:7048/nobreaks/sync/createNobreaks', nobreak));
    if (newNobreak) {
      this.nobreaks.push(newNobreak);
      await this.getNobreaks();
    //  this.sortChamados(this.sortColumn || 'data');
    }
  }

  async editNobreak(nobreak: Nobreak) {
    const updatedNobreak = await lastValueFrom(
      this.http.put<Nobreak>('https://192.168.10.230:7048/nobreaks/sync/editNobreak', nobreak)
    );
    if (updatedNobreak) {
      await this.getNobreaks();
    //  this.sortChamados(this.sortColumn || 'data');
    }
  }

  async deleteNobreak(id: number) {
      const deleted = await lastValueFrom(
        this.http.delete<boolean>(`https://192.168.10.230:7048/nobreaks/sync/deleteNobreak/${id}`)
      );
      if (deleted) {
        await this.getNobreaks();
      //  this.sortChamados(this.sortColumn || 'data');
      }
  }

  @ViewChild('printModal') printModal!: PrintNobreakModalComponent;

  printNobreak(nobreak: Nobreak) {
    this.printModal.openPrintModal(nobreak);
  }

  onModalClose() {
    console.log('Modal fechado');
  }


  //sortColumn: keyof Chamado | '' = ''; 
  //sortDirection: 'asc' | 'desc' = 'asc'; 

  //sortChamados(column: keyof Chamado) {
  //  if (this.sortColumn === column) {
  //    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  //  } else {
  //    this.sortColumn = column;
  //    this.sortDirection = 'asc';
  //  }

  //  this.chamados.sort((a, b) => {
  //    if (a.status === 'Pendente' && b.status !== 'Pendente') return -1;
  //    if (a.status !== 'Pendente' && b.status === 'Pendente') return 1;

  //    let valueA = a[column];
  //    let valueB = b[column];

  //    if (column === 'data') {
  //      valueA = new Date(valueA).getTime();
  //      valueB = new Date(valueB).getTime();
  //    }

  //    if (column === 'urgencia') {
  //      const prioridade = ['Alta', 'Média', 'Baixa'];
  //      valueA = prioridade.indexOf(valueA as string);
  //      valueB = prioridade.indexOf(valueB as string);
  //    }

  //    if (typeof valueA === 'string' && typeof valueB === 'string') {
  //      return this.sortDirection === 'asc'
  //        ? valueA.localeCompare(valueB)
  //        : valueB.localeCompare(valueA);
  //    }

  //    if (typeof valueA === 'number' && typeof valueB === 'number') {
  //      return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
  //    }

  //    return 0;
  //  });
  //}

}

