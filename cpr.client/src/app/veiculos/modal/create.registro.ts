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
  public registroVeiculoForm: FormGroup;
  public showModal: boolean = false;

  constructor(private fb: FormBuilder) {
    this.registroVeiculoForm = this.fb.group({
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
      precoAbastecimento: ['']
    });
  }

  ngOnInit(): void {
    this.resetForm();
  }

  openCreateModal() {
    this.resetForm();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.close.emit();
  }

  async submitRegistroVeiculo() {
    const registroVeiculoData = this.registroVeiculoForm.value;
    this.create.emit(registroVeiculoData);
    this.closeModal();
  }

  //private resetForm() {
  //  const now = new Date();
  //  const formattedDate = now.toISOString().split('T')[0];
  //  const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  private resetForm()
  {
    this.registroVeiculoForm.reset({
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
      mediaPorLitro: [''],
      combustivel: ['']
    });
  }
    

  //formatCurrency() {
  //  let preco = this.veiculoForm.get('preco')?.value;

  //  if (preco !== null && preco !== undefined) {
  //    preco = preco.toString().replace(/\D/g, '');
  //    const numericValue = parseFloat(preco) / 100;

  //    if (!isNaN(numericValue)) {
  //      this.veiculoForm.patchValue({
  //        preco: numericValue.toFixed(2) 
  //      });

  //      (document.getElementById('preco') as HTMLInputElement).value =
  //        numericValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  //    }
  //  }
  //}

  //onPriceInput() {
  //  let preco = this.consignadoForm.get('preco')?.value || '';
  //  preco = preco.replace(/\D/g, '');

  //  const numericValue = parseFloat(preco) / 100;

  //  if (!isNaN(numericValue)) {
  //    const formattedValue = numericValue.toLocaleString('pt-BR', {
  //      style: 'currency',
  //      currency: 'BRL'
  //    });

  //    this.consignadoForm.patchValue({ preco: formattedValue }, { emitEvent: false });
  //  }
  //}


}

