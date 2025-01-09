import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'concluir-modal',
  templateUrl: './concluir.chamado.html',
  styleUrls: ['./modal.css']
})
export class ConcluirChamadoModalComponent {
  @Input() chamadoId!: number;
  @Output() close = new EventEmitter<void>();
  @Output() concluir = new EventEmitter<number>();

  public showModal: boolean = false;

  openConcluirModal(id: number) {
    this.chamadoId = id;
    this.showModal = true;
  }

  closeConcluirModal() {
    this.showModal = false;
    this.close.emit();
  }

  confirmConcluir() {
    this.concluir.emit(this.chamadoId);
    this.closeConcluirModal();
  }
}
