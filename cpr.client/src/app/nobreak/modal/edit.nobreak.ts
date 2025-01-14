import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Nobreak } from '../nobreak.component';

@Component({
  selector: 'edit-nobreak-modal',
  templateUrl: './edit.nobreak.html',
  styleUrls: ['./modal.css']
})
export class EditNobreakModalComponent implements OnInit {
  @Input() nobreak: Nobreak = {} as Nobreak;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Nobreak>();

  public editForm: FormGroup;
  public showModal: boolean = false;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      dataTroca: [''],
      dataProximaTroca: [''],
      marca: [''],
      modelo: [''],
      numeroSerie: [''],
      cliente: [''],
      descricao: [''],
      bateria: [''],
      quantidadeBateria: [''],
      voltagemEntrada: [''],
      voltagemSaida: [''],
      capacidade: [''],
      funcao: [''],
      ordemServico: ['']
    });
  }

  private formatDate(date: Date | string): string {
    if (!date) return ''; 
    const d = new Date(date);
    return d.toISOString().split('T')[0]; 
  }

  ngOnInit(): void {
    this.editForm.patchValue(this.nobreak);
  }

  openEditModal(nobreak: Nobreak) {
    this.nobreak = nobreak;

    const formattedNobreak = {
      ...nobreak,
      dataTroca: this.formatDate(nobreak.dataTroca),
      dataProximaTroca: this.formatDate(nobreak.dataProximaTroca)
    };

    this.editForm.patchValue(formattedNobreak);
    this.showModal = true;
  }

  closeEditModal() {
    this.showModal = false;
    this.close.emit();
  }

  submitEdit() {
    if (this.editForm.valid) {
      const updatedNobreak = { ...this.nobreak, ...this.editForm.value };
      this.edit.emit(updatedNobreak); 
      this.closeEditModal();
    }
  }
}


