import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'create-modal',
  templateUrl: './create.chamado.html',
  styleUrls: ['./modal.css']
})
export class ChamadoModalComponent implements OnInit {
  @Input() showModal: boolean = false; // Recebe o estado do modal do componente pai
  @Output() close = new EventEmitter<void>(); // Emite um evento para fechar o modal
  @Output() create = new EventEmitter<any>(); // Emite o chamado criado para o componente pai

  public chamadoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.chamadoForm = this.fb.group({
      data: ['', Validators.required],
      hora: ['', Validators.required],
      cliente: ['', Validators.required],
      descricao: ['', Validators.required],
      contrato: ['', Validators.required],
      urgencia: ['', Validators.required],
      status: ['', Validators.required],
      opcoes: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  closeModal() {
    this.close.emit(); // Emite o evento para fechar o modal
  }

  submitChamado() {
    if (this.chamadoForm.valid) {
      this.create.emit(this.chamadoForm.value); // Emite o chamado criado para o componente pai
      this.closeModal(); // Fecha o modal após a criação
    }
  }
}
