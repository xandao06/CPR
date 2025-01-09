import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete.chamado.html',
  styleUrls: ['./modal.css']
})
export class DeleteChamadoModalComponent {
  @Input() chamadoId!: number;
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<number>();

  public showModal: boolean = false;

  openDeleteModal(id: number) {
    this.chamadoId = id;
    this.showModal = true;
  }

  closeDeleteModal() {
    this.showModal = false;
    this.close.emit();
  }

  confirmDelete() {
    this.delete.emit(this.chamadoId);
    this.closeDeleteModal();
  }
}
