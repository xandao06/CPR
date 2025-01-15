import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Equipamento } from '../consignado.component';

@Component({
  selector: 'edit-consignado-modal',
  templateUrl: './edit.consignado.html',
  styleUrls: ['./modal.css']
})
export class EditConsignadoModalComponent implements OnInit {
  @Input() equipamento: Equipamento = {} as Equipamento;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Equipamento>();

  public editForm: FormGroup;
  public showModal: boolean = false;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
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

  private formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }


  ngOnInit(): void {
    this.editForm.patchValue(this.equipamento);
  }

  openEditModal(equipamento: Equipamento) {
    this.equipamento = equipamento;

    const formattedEquipamento = {
      ...equipamento,
      data: this.formatDate(equipamento.data),
    };

    this.editForm.patchValue(formattedEquipamento);
    this.showModal = true;
  }

  closeEditModal() {
    this.showModal = false;
    this.close.emit();
  }

  submitEdit() {
    if (this.editForm.valid) {
      const updatedConsignado = { ...this.equipamento, ...this.editForm.value };
      this.edit.emit(updatedConsignado); 
      this.closeEditModal();
    }
  }
}
