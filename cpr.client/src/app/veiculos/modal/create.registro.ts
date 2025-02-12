import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'create-registro-modal',
  templateUrl: './create.registro.html',
  styleUrls: ['./modal.css']
})
export class CreateRegistroModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();
  public registrosForm: FormGroup;
  public showModal: boolean = false;
  public registroVeiculoId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.registrosForm = this.fb.group({
      id: [''],
      dataUltimaRevisao: [''],
      dataUltimoAbastecimento: [''],
      dataUltimaTrocaOleo: [''],
      dataUltimaCalibragem: [''],
      quilometrosRodados: [''],
      quilometrosProximaTrocaOleo: [''],
      dataUltimoBalanceamento: [''],
      pecasJaTrocadas: [''],
      pecasParaTrocar: [''],
      dataTrocaPeca: [''],
      precoEtanol: [''],
      precoGasolina: [''],
      observacao: [''],
      litrosAbastecido: [''],
      precoAbastecimento: [''],
      combustivel: [''],
      mediaPorLitro: ['']
    });
  }

  ngOnInit(): void {
    this.resetForm();
  }

  openCreateModal(registroVeiculoId: number) {
    this.registroVeiculoId = registroVeiculoId; // Armazena o ID do veículo selecionado
    this.resetForm();
    this.registrosForm.patchValue({ id: registroVeiculoId }); // Define o ID no formulário
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.close.emit();
  }

  async submitRegistroVeiculo() {
    const registrosData = {
      id: this.registroVeiculoId || 0, // Garante que o ID seja enviado corretamente
      dataUltimaRevisao: this.registrosForm.value.dataUltimaRevisao || '',
      dataUltimoAbastecimento: this.registrosForm.value.dataUltimoAbastecimento || '',
      dataUltimaTrocaOleo: this.registrosForm.value.dataUltimaTrocaOleo || '',
      dataUltimaCalibragem: this.registrosForm.value.dataUltimaCalibragem || '',
      quilometrosRodados: this.registrosForm.value.quilometrosRodados || '',
      quilometrosProximaTrocaOleo: this.registrosForm.value.quilometrosProximaTrocaOleo || '',
      dataUltimoBalanceamento: this.registrosForm.value.dataUltimoBalanceamento || '',
      pecasJaTrocadas: this.registrosForm.value.pecasJaTrocadas || '',
      pecasParaTrocar: this.registrosForm.value.pecasParaTrocar || '',
      dataTrocaPeca: this.registrosForm.value.dataTrocaPeca || '',
      precoEtanol: this.registrosForm.value.precoEtanol || '',
      precoGasolina: this.registrosForm.value.precoGasolina || '',
      observacao: this.registrosForm.value.observacao || '',
      litrosAbastecido: this.registrosForm.value.litrosAbastecido || '',
      precoAbastecimento: this.registrosForm.value.precoAbastecimento || '',
      combustivel: this.registrosForm.value.combustivel || '',
      mediaPorLitro: this.registrosForm.value.mediaPorLitro || ''
    };

    console.log('Enviando JSON para API:', JSON.stringify(registrosData));

    this.create.emit(registrosData);
  }


  private resetForm()
  {
    this.registrosForm.reset({
      id: [''],
      dataUltimaRevisao: [''],
      dataUltimoAbastecimento: [''],
      dataUltimaTrocaOleo: [''],
      dataUltimaCalibragem: [''],
      quilometrosRodados: [''],
      quilometrosProximaTrocaOleo: [''],
      dataUltimoBalanceamento: [''],
      pecasJaTrocadas: [''],
      pecasParaTrocar: [''],
      dataTrocaPeca: [''],
      precoEtanol: [''],
      precoGasolina: [''],
      observacao: [''],
      litrosAbastecido: [''],
      precoAbastecimento: [''],
      combustivel: [''],
      mediaPorLitro: ['']
    });
  }
    

}

