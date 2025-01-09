import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Chamado } from '../chamado.component';

@Component({
  selector: 'create-modal',
  templateUrl: './create.chamado.html',
  styleUrls: ['./modal.css']
})
export class CreateChamadoModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>(); 
  public chamadoForm: FormGroup;
  public showModal: boolean = false;

  constructor(private fb: FormBuilder) {
    this.chamadoForm = this.fb.group({
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

  async submitChamado() {
      const chamadoData = this.chamadoForm.value;
      this.create.emit(chamadoData); 
      this.closeModal(); 
  }

  private resetForm() {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    this.chamadoForm.reset({
      data: formattedDate,
      hora: formattedTime,
      cliente: '',
      descricao: '',
      contrato: '',
      urgencia: '',
      status: 'Pendente',
      opcoes: ''
    });
  }

  }

