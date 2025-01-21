import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'create-veiculo-modal',
  templateUrl: './create.veiculo.html',
  styleUrls: ['./modal.css']
})
export class CreateRegistroModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();
  public veiculoForm: FormGroup;
  public showModal: boolean = false;

  constructor(private fb: FormBuilder) {
    this.veiculoForm = this.fb.group({
      data: [''],
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
      problemasObservados: ['']
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

  async submitVeiculo() {
    const veiculoData = this.veiculoForm.value;
    this.create.emit(veiculoData);
    this.closeModal();
  }

  //private resetForm() {
  //  const now = new Date();
  //  const formattedDate = now.toISOString().split('T')[0];
  //  const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  private resetForm()
  {
    this.veiculoForm.reset({
      data: [''],
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
      problemasObservados: [''],
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

