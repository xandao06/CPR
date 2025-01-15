import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      data: [''],
      hora: [''],
      cliente: [''],
      descricao: [''],
      contrato: [''],
      numeroSerie: [''],
      status: 'Emprestado',
      marca: [''],
      modelo: [''],
      preco: [''],
      quantidade: [''],
      tipo: ['']
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
    const consignadoData = this.consignadoForm.value;
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
      cliente: [''],
      descricao: [''],
      contrato: [''],
      numeroSerie: [''],
      status: 'Emprestado',
      marca: [''],
      modelo: [''],
      preco: [''],
      quantidade: [''],
      tipo: ['']
    });
  }

  }

