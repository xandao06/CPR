import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'concluir-consignado-modal',
  templateUrl: './concluir.consignado.html',
  styleUrls: ['./modal.css']
})
export class ConcluirConsignadoModalComponent {
  @Input() consignadoId!: number;
  @Output() close = new EventEmitter<void>();
  @Output() concluir = new EventEmitter<number>();

  public showModal: boolean = false;

  openConcluirModal(id: number) {
    this.consignadoId = id;
    this.showModal = true;
  }

  closeConcluirModal() {
    this.showModal = false;
    this.close.emit();
  }

  confirmConcluir() {
    this.concluir.emit(this.consignadoId);
    this.closeConcluirModal();
  }
}
