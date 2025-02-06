import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'create-consignado-modal',
  templateUrl: './create.consignado.html',
  styleUrls: ['./modal.css']
})
export class CreateConsignadoModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();
  public consignadoForm: FormGroup;
  public showModal: boolean = false;

  constructor(private fb: FormBuilder) {
    this.consignadoForm = this.fb.group({
      id: [''],
      data: ['', Validators.required],
      hora: ['', Validators.required],
      cliente: ['', Validators.required],
      descricao: [''],
      contrato: ['', Validators.required],
      numeroSerie: ['', Validators.required],
      status: 'Emprestado',
      marca: ['', Validators.required],
      modelo: [''],
      preco: [''],
      quantidade: ['', Validators.required],
      tipo: ['', Validators.required]
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

  async submitConsignado() {

    this.consignadoForm.markAllAsTouched();

    if (this.consignadoForm.invalid) {
      return;
    }

    const consignadoData: any = {
      id: this.consignadoForm.value.id ? Number(this.consignadoForm.value.id) : 0,
      data: this.consignadoForm.value.data || '',
      hora: this.consignadoForm.value.hora || '',
      cliente: this.consignadoForm.value.cliente || '',
      descricao: '',
      contrato: this.consignadoForm.value.contrato || '',
      numeroSerie: this.consignadoForm.value.numeroSerie || '',
      status: this.consignadoForm.value.status || 'Emprestado', // Valor padrão
      marca: this.consignadoForm.value.marca || '',
      modelo: '',
      preco: '',
      quantidade: 0,
      tipo: this.consignadoForm.value.tipo || ''
    };

    const addDateIfValid = (key: string, value: any) => {
      const date = new Date(value);
      if (value && !isNaN(date.getTime())) {
        consignadoData[key] = date.toISOString();
      }
    };

    addDateIfValid('data', this.consignadoForm.value.data);

    this.create.emit(consignadoData);
    this.closeModal();
  }



  private resetForm() {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    this.consignadoForm.reset({
      data: formattedDate,
      hora: formattedTime,
      cliente: '',
      descricao: '',
      contrato: '',
      numeroSerie: '',
      status: 'Emprestado',
      marca: '',
      modelo: '',
      preco: '',
      quantidade: '',
      tipo: ''
    });
  }

  formatCurrency() {
    let preco = this.consignadoForm.get('preco')?.value;

    if (preco !== null && preco !== undefined) {
      preco = preco.toString().replace(/\D/g, '');
      const numericValue = parseFloat(preco) / 100;

      if (!isNaN(numericValue)) {
        this.consignadoForm.patchValue({
          preco: numericValue.toFixed(2) 
        });

        (document.getElementById('preco') as HTMLInputElement).value =
          numericValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      }
    }
  }

  onPriceInput() {
    let preco = this.consignadoForm.get('preco')?.value || '';
    preco = preco.replace(/\D/g, '');

    const numericValue = parseFloat(preco) / 100;

    if (!isNaN(numericValue)) {
      const formattedValue = numericValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      this.consignadoForm.patchValue({ preco: formattedValue }, { emitEvent: false });
    }
  }


}

