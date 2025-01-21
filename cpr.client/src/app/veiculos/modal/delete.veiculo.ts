import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'delete-veiculo-modal',
  templateUrl: './delete.veiculo.html',
  styleUrls: ['./modal.css']
})
export class DeleteVeiculoModalComponent {
  @Input() veiculoId!: number;
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<number>();

  public showModal: boolean = false;

  openDeleteModal(id: number) {
    this.veiculoId = id;
    this.showModal = true;
  }

  closeDeleteModal() {
    this.showModal = false;
    this.close.emit();
  }

  confirmDelete() {
    this.delete.emit(this.veiculoId);
    this.closeDeleteModal();
  }
}
