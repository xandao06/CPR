import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    const nobreakData = this.nobreakForm.value;
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

