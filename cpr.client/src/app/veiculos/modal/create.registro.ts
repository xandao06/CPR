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
  public veiculoForm: FormGroup;
  public showModal: boolean = false;
  public veiculoId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.veiculoForm = this.fb.group({
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

  openCreateModal(veiculoId: number) {
    this.veiculoId = veiculoId; // Armazena o ID do veículo selecionado
    this.resetForm();
    this.veiculoForm.patchValue({ id: veiculoId }); // Define o ID no formulário
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.close.emit();
  }

  async submitVeiculo() {
    const veiculoData = {
      id: this.veiculoId || 0, // Garante que o ID seja enviado corretamente
      dataUltimaRevisao: this.veiculoForm.value.dataUltimaRevisao || '',
      dataUltimoAbastecimento: this.veiculoForm.value.dataUltimoAbastecimento || '',
      dataUltimaTrocaOleo: this.veiculoForm.value.dataUltimaTrocaOleo || '',
      dataUltimaCalibragem: this.veiculoForm.value.dataUltimaCalibragem || '',
      quilometrosRodados: this.veiculoForm.value.quilometrosRodados || '',
      quilometrosProximaTrocaOleo: this.veiculoForm.value.quilometrosProximaTrocaOleo || '',
      dataUltimoBalanceamento: this.veiculoForm.value.dataUltimoBalanceamento || '',
      pecasJaTrocadas: this.veiculoForm.value.pecasJaTrocadas || '',
      pecasParaTrocar: this.veiculoForm.value.pecasParaTrocar || '',
      dataTrocaPeca: this.veiculoForm.value.dataTrocaPeca || '',
      precoEtanol: this.veiculoForm.value.precoEtanol || '',
      precoGasolina: this.veiculoForm.value.precoGasolina || '',
      observacao: this.veiculoForm.value.observacao || '',
      litrosAbastecido: this.veiculoForm.value.litrosAbastecido || '',
      precoAbastecimento: this.veiculoForm.value.precoAbastecimento || '',
      combustivel: this.veiculoForm.value.combustivel || '',
      mediaPorLitro: this.veiculoForm.value.mediaPorLitro || ''
    };

    console.log('Enviando JSON para API:', JSON.stringify(veiculoData));

    this.create.emit(veiculoData);
  }


  private resetForm()
  {
    this.veiculoForm.reset({
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

