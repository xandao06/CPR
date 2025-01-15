import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'delete-consignado-modal',
  templateUrl: './delete.consignado.html',
  styleUrls: ['./modal.css']
})
export class DeleteConsignadoModalComponent {
  @Input() consignadoId!: number;
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<number>();

  public showModal: boolean = false;

  openDeleteModal(id: number) {
    this.consignadoId = id;
    this.showModal = true;
  }

  closeDeleteModal() {
    this.showModal = false;
    this.close.emit();
  }

  confirmDelete() {
    this.delete.emit(this.consignadoId);
    this.closeDeleteModal();
  }
}
