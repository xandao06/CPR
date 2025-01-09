import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chamado } from '../chamado.component';

@Component({
  selector: 'edit-modal',
  templateUrl: './edit.chamado.html',
  styleUrls: ['./modal.css']
})
export class EditChamadoModalComponent implements OnInit {
  @Input() chamado: Chamado = {} as Chamado;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Chamado>();

  public editForm: FormGroup;
  public showModal: boolean = false;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      data: [''],
      hora: [''],
      cliente: [''],
      descricao: [''],
      contrato: [''],
      urgencia: [''],
      status: ['Pendente'],
      opcoes: ['']
    });
  }

  ngOnInit(): void {
    this.editForm.patchValue(this.chamado);
  }

  openEditModal(chamado: Chamado) {
    this.chamado = chamado;
    this.editForm.patchValue(chamado); 
    this.showModal = true;
  }

  closeEditModal() {
    this.showModal = false;
    this.close.emit();
  }

  submitEdit() {
    if (this.editForm.valid) {
      const updatedChamado = { ...this.chamado, ...this.editForm.value };
      this.edit.emit(updatedChamado); 
      this.closeEditModal();
    }
  }
}
