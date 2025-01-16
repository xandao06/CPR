import { Component, Input } from '@angular/core';
import { Equipamento } from './consignado.component';


@Component({
  selector: 'app-print-layout',
  templateUrl: './print_layout.html',
  styleUrls: ['../app.component.css']
})
export class PrintLayoutComponent {
  @Input() equipamento?: Equipamento;
  public equipamentos: Equipamento[] = [];

  print() {
    const printContent = document.getElementById('print-layout');

    if (!printContent) {
      console.error('Elemento "print-layout" não encontrado no DOM.');
      return;
    }

    const originalContent = document.body.innerHTML;

    // Substitui o conteúdo do body pelo layout de impressão
    document.body.innerHTML = printContent.innerHTML;
    window.print();

    // Restaura o conteúdo original após a impressão
    document.body.innerHTML = originalContent;
    window.location.reload();
  }

  printEquipamento(equipamento: Equipamento) {
    this.equipamentos = [equipamento]; // Define o equipamento a ser impresso
    this.print();
  }
}

