import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'delete-registro-modal',
  templateUrl: './delete.registro.html',
  styleUrls: ['./modal.css']
})
export class DeleteRegistroModalComponent {
  @Input() registroId!: number;
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<number>();

  public showModal: boolean = false;

  openDeleteModal(id: number) {
    this.registroId = id;
    this.showModal = true;
  }

  closeDeleteModal() {
    this.showModal = false;
    this.close.emit();
  }

  confirmDelete() {
    this.delete.emit(this.registroId);
    this.closeDeleteModal();
  }
}
