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
      id: [''],
      modelo: [''],
      placa: [''],
      ano: [''],
      renavan: [''],
    });
  }

  //private formatDate(date: Date | string): string {
  //  if (!date) return '';
  //  const d = new Date(date);
  //  return d.toISOString().split('T')[0];
  //}


  ngOnInit(): void {
    this.editForm.patchValue(this.veiculo);
  }

  openEditModal(veiculo: Veiculo) {
    this.veiculo = veiculo;
    this.editForm.patchValue(veiculo);
    this.showModal = true;
  }

  closeEditModal() {
    this.showModal = false;
    this.close.emit();
  }

  submitEdit() {
    if (this.editForm.valid) {
      // Mescla os valores do formulário com o restante do objeto original
      const updatedVeiculo = { ...this.veiculo, ...this.editForm.value };

      // Log do objeto que será enviado
      console.log('Objeto enviado para o backend:', updatedVeiculo);

      this.edit.emit(updatedVeiculo);
      this.closeEditModal();
    }
  }
}
