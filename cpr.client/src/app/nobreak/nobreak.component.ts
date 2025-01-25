import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from '../app.component';


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
  public today: string = '';
  public filteredNobreaks: Nobreak[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder, private apiConfig: AppComponent) {
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
    this.today = new Date().toISOString().split('T')[0];
    await this.getNobreaks();
    this.filteredNobreaks = [...this.nobreaks];

    this.checkProximaTroca();

    setInterval(() => {
      this.checkProximaTroca();
    }, 3600000); 
  }



  async getNobreaks() {
    const result = await lastValueFrom(
      this.http.get < { syncedNobreaks: number; nobreaks: Nobreak[] } > (this.apiConfig.getApiUrl('nobreaks/sync/getNobreaks')).pipe(
        map(response => response.nobreaks)
      )
    );
    this.nobreaks = result;
    this.filteredNobreaks = [...this.nobreaks];
    this.checkProximaTroca();
  }

  async createNobreak(nobreak: Nobreak) {
    const newNobreak = await lastValueFrom(this.http.post<Nobreak>(this.apiConfig.getApiUrl('nobreaks/sync/createNobreaks'), nobreak));
    if (newNobreak) {
      this.nobreaks.push(newNobreak);
      await this.getNobreaks();
    }
  }

  async editNobreak(nobreak: Nobreak) {
    const updatedNobreak = await lastValueFrom(
      this.http.put<Nobreak>(this.apiConfig.getApiUrl('nobreaks/sync/editNobreak'), nobreak)
    );
    if (updatedNobreak) {
      await this.getNobreaks();
    }
  }

  async deleteNobreak(id: number) {
      const deleted = await lastValueFrom(
        this.http.delete<boolean>(this.apiConfig.getApiUrl('nobreaks/sync/editNobreak/${id}'),)
      );
      if (deleted) {
        await this.getNobreaks();
      }
  }

  checkProximaTroca() {
    const today = new Date().setHours(0, 0, 0, 0);
    const lastAlertTime = localStorage.getItem('lastAlertTime'); 

    const now = Date.now();
    if (lastAlertTime && now - parseInt(lastAlertTime, 10) < 3600000) {
      return; 
    }

    this.nobreaks.forEach((nobreak) => {
      const proximaTroca = new Date(nobreak.dataProximaTroca).setHours(0, 0, 0, 0);
      if (proximaTroca === today) {
        alert(`O nobreak ${nobreak.modelo} do cliente ${nobreak.cliente} está com a troca agendada para hoje!`);
        localStorage.setItem('lastAlertTime', now.toString());
      }
    });
  }

  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value !== undefined) {
      this.filterNobreaks(inputElement.value);
    }
  }

  filterNobreaks(searchTerm: string) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    this.filteredNobreaks = this.nobreaks.filter(nobreaks =>
      nobreaks.cliente.toLowerCase().includes(lowerCaseSearchTerm) ||
      nobreaks.descricao.toLowerCase().includes(lowerCaseSearchTerm) ||
      nobreaks.numeroSerie.toLowerCase().includes(lowerCaseSearchTerm) ||
      nobreaks.voltagemEntrada.toLowerCase().includes(lowerCaseSearchTerm) ||
      nobreaks.voltagemSaida.toLowerCase().includes(lowerCaseSearchTerm) ||
      nobreaks.marca.toLowerCase().includes(lowerCaseSearchTerm) ||
      nobreaks.modelo.toLowerCase().includes(lowerCaseSearchTerm) ||
      nobreaks.capacidade.toLowerCase().includes(lowerCaseSearchTerm) ||
      nobreaks.funcao.toLowerCase().includes(lowerCaseSearchTerm) ||
      nobreaks.ordemServico.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
  
}

