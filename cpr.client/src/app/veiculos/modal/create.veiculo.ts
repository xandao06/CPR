import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'create-veiculo-modal',
  templateUrl: './create.veiculo.html',
  styleUrls: ['./modal.css']
})
export class CreateVeiculoModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();
  public veiculoForm: FormGroup;
  public showModal: boolean = false;

  constructor(private fb: FormBuilder) {
    this.veiculoForm = this.fb.group({
      id: [''],
      modelo: [''],
      placa: [''],
      ano: [''],
      renavan: ['']
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
    const veiculoData: any = {
      id: this.veiculoForm.value.id ? Number(this.veiculoForm.value.id) : 0,
      modelo: this.veiculoForm.value.modelo || '',
      placa: this.veiculoForm.value.placa || '',
      ano: this.veiculoForm.value.ano || '',
      renavan: this.veiculoForm.value.renavan || '',
    };

    const addDateIfValid = (key: string, value: any) => {
      const date = new Date(value);
      if (value && !isNaN(date.getTime())) {
        veiculoData[key] = date.toISOString();
      }
    };

    addDateIfValid('dataUltimaRevisao', this.veiculoForm.value.dataUltimaRevisao);
    addDateIfValid('dataUltimoAbastecimento', this.veiculoForm.value.dataUltimoAbastecimento);
    addDateIfValid('dataUltimaTrocaOleo', this.veiculoForm.value.dataUltimaTrocaOleo);
    addDateIfValid('dataUltimaCalibragem', this.veiculoForm.value.dataUltimaCalibragem);
    addDateIfValid('dataUltimoBalanceamento', this.veiculoForm.value.dataUltimoBalanceamento);
    addDateIfValid('dataTrocaPeca', this.veiculoForm.value.dataTrocaPeca);

    console.log('Enviando JSON para API:', JSON.stringify(veiculoData));

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
      id: [''],
      modelo: [''],
      placa: [''],
      ano: [''],
      renavan: ['']
    });
  }
    

}

