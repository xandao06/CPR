import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegistroVeiculo } from '../registro.veiculo.component';

@Component({
  selector: 'edit-registro-modal',
  templateUrl: './edit.registro.html',
  styleUrls: ['./modal.css']
})
export class EditRegistroModalComponent implements OnInit {
  @Input() registroVeiculo: RegistroVeiculo = {} as RegistroVeiculo;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<RegistroVeiculo>();

  public editForm: FormGroup;
  public showModal: boolean = false;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      id: [''],
      dataUltimaRevisao: [''],
      dataUltimoAbastecimento: [''],
      dataUltimaTrocaOleo: [''],
      dataUltimaCalibragem: [''],
      quilometrosRodados: [''],
      quilometrosProximaTrocaOleo: [''],
      dataUltimoBalanceamento: [''],
      pecasJaTrocadas: [''],
      pecasParaTrocar: [''],
      dataTrocaPeca: [''],
      precoEtanol: [''],
      precoGasolina: [''],
      observacao: [''],
      mediaPorLitro: [''],
      combustivel: [''],
      litrosAbastecido: [''],
      precoAbastecimento: ['']
    });
  }

  //private formatDate(date: Date | string): string {
  //  if (!date) return '';
  //  const d = new Date(date);
  //  return d.toISOString().split('T')[0];
  //}


  ngOnInit(): void {
    this.editForm.patchValue(this.registroVeiculo);
  }

  openEditModal(registroVeiculo: RegistroVeiculo) {
    this.registroVeiculo = registroVeiculo;

    //const formattedVeiculo = {
    //  ...registroVeiculo,
    //  dataUltimaRevisao: this.formatDate(registroVeiculo.dataUltimaRevisao),
    //};

    this.editForm.patchValue(registroVeiculo);
    this.showModal = true;
  }

  closeEditModal() {
    this.showModal = false;
    this.close.emit();
  }

  submitEdit() {
    if (this.editForm.valid) {
      const updatedRegistroVeiculo = { ...this.registroVeiculo, ...this.editForm.value };
      this.edit.emit(updatedRegistroVeiculo); 
      this.closeEditModal();
    }
  }
}
