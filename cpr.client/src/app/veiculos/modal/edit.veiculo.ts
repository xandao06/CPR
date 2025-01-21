import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Veiculo } from '../veiculo.component';

@Component({
  selector: 'edit-veiculo-modal',
  templateUrl: './edit.veiculo.html',
  styleUrls: ['./modal.css']
})
export class EditVeiculoModalComponent implements OnInit {
  @Input() veiculo: Veiculo = {} as Veiculo;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Veiculo>();

  public editForm: FormGroup;
  public showModal: boolean = false;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      modelo: [''],
      placa: [''],
      ano: [''],
      renavan: ['']
    });
  }

  private formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }


  ngOnInit(): void {
    this.editForm.patchValue(this.veiculo);
  }

  openEditModal(veiculo: Veiculo) {
    this.veiculo = veiculo;

    const formattedVeiculo = {
      ...veiculo,
      data: this.formatDate(veiculo.data),
    };

    this.editForm.patchValue(formattedVeiculo);
    this.showModal = true;
  }

  closeEditModal() {
    this.showModal = false;
    this.close.emit();
  }

  submitEdit() {
    if (this.editForm.valid) {
      const updatedVeiculo = { ...this.veiculo, ...this.editForm.value };
      this.edit.emit(updatedVeiculo); 
      this.closeEditModal();
    }
  }
}
