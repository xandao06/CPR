import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'delete-nobreak-modal',
  templateUrl: './delete.nobreak.html',
  styleUrls: ['./modal.css']
})
export class DeleteNobreakModalComponent {
  @Input() nobreakId!: number;
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<number>();

  public showModal: boolean = false;

  openDeleteModal(id: number) {
    this.nobreakId = id;
    this.showModal = true;
  }

  closeDeleteModal() {
    this.showModal = false;
    this.close.emit();
  }

  confirmDelete() {
    this.delete.emit(this.nobreakId);
    this.closeDeleteModal();
  }
}
