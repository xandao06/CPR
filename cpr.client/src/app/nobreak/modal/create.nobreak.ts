import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nobreak } from '../nobreak.component';

@Component({
  selector: 'create-nobreak-modal',
  templateUrl: './create.nobreak.html',
  styleUrls: ['./modal.css']
})
export class CreateNobreakModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();
  @Input() nobreaks: Nobreak[] = [];
  public nobreakForm: FormGroup;
  public showModal: boolean = false;

  constructor(private fb: FormBuilder) {
    this.nobreakForm = this.fb.group({
      id: [''],
      dataTroca: ['', Validators.required],
      dataProximaTroca: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: [''],
      numeroSerie: ['', Validators.required],
      cliente: ['', Validators.required],
      descricao: [''],
      bateria: ['', Validators.required],
      quantidadeBateria: ['', Validators.required],
      voltagemEntrada: ['', Validators.required],
      voltagemSaida: ['', Validators.required],
      capacidade: [''],
      funcao: [''],
      ordemServico: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.resetForm();

    // Escuta mudanças no campo "numeroSerie" e chama a função de preenchimento automático
    this.nobreakForm.get('numeroSerie')?.valueChanges.subscribe((value) => {
      if (value) {
        this.autoFillFields(value);
      }
    });
  }

  openCreateModal() {
    this.resetForm();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.close.emit();
  }

  async submitNobreak() {

    this.nobreakForm.markAllAsTouched();

    if (this.nobreakForm.invalid) {
      return;
    }

    const nobreakData: any = {
      id: this.nobreakForm.value.id ? Number(this.nobreakForm.value.id) : 0,
      dataTroca: this.nobreakForm.value.dataTroca || '',
      dataProximaTroca: this.nobreakForm.value.dataProximaTroca || '',
      marca: this.nobreakForm.value.marca || '',
      modelo: '',
      numeroSerie: this.nobreakForm.value.numeroSerie || '',
      cliente: this.nobreakForm.value.cliente || '',
      descricao: '',
      bateria: this.nobreakForm.value.bateria || '',
      quantidadeBateria: this.nobreakForm.value.quantidadeBateria || '',
      voltagemEntrada: this.nobreakForm.value.voltagemEntrada || '',
      voltagemSaida: this.nobreakForm.value.voltagemSaida || '',
      capacidade: '',
      funcao: '',
      ordemServico: this.nobreakForm.value.ordemServico || '',
    }

    const addDateIfValid = (key: string, value: any) => {
      const date = new Date(value);
      if (value && !isNaN(date.getTime())) {
        nobreakData[key] = date.toISOString();
      }
    };

    addDateIfValid('dataTroca', this.nobreakForm.value.dataTroca);
    addDateIfValid('dataProximaTroca', this.nobreakForm.value.dataProximaTroca);

    this.create.emit(nobreakData);
    this.closeModal();
  }

  private resetForm() {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const twoYearsLater = new Date(now.setFullYear(now.getFullYear() + 2));
    const formattedNextDate = twoYearsLater.toISOString().split('T')[0];

    this.nobreakForm.reset({
      dataTroca: formattedDate,
      dataProximaTroca: formattedNextDate,
      marca: '',
      modelo: '',
      numeroSerie: '',
      cliente: '',
      descricao: '',
      bateria: '',
      quantidadeBateria: '',
      voltagemEntrada: '',
      voltagemSaida: '',
      capacidade: '',
      funcao: '',
      ordemServico: ''
    });
  }

  private autoFillFields(numeroSerie: string) {
    const foundNobreak = this.nobreaks.find((n) => n.numeroSerie === numeroSerie);

    if (foundNobreak) {
      // Formata as datas no formato YYYY-MM-DD
      const formattedDate = new Date(foundNobreak.dataTroca).toISOString().split('T')[0];
      const formattedNextDate = new Date(foundNobreak.dataProximaTroca).toISOString().split('T')[0];

      this.nobreakForm.patchValue({
        dataTroca: formattedDate,
        dataProximaTroca: formattedNextDate,
        marca: foundNobreak.marca,
        modelo: foundNobreak.modelo,
        cliente: foundNobreak.cliente,
        descricao: foundNobreak.descricao,
        bateria: foundNobreak.bateria,
        quantidadeBateria: foundNobreak.quantidadeBateria,
        voltagemEntrada: foundNobreak.voltagemEntrada,
        voltagemSaida: foundNobreak.voltagemSaida,
        capacidade: foundNobreak.capacidade,
        funcao: foundNobreak.funcao,
      });
    }
  }
}

