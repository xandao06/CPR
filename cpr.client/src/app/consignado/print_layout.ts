import { Component, Input } from '@angular/core';
import { Equipamento } from '../consignado/consignado.component'; // Importa a interface Equipamento

@Component({
  selector: 'app-print-layout',
  templateUrl: './print_layout.html',
  styleUrls: ['../app.component.css']
})
export class PrintLayoutComponent {
  @Input() equipamento!: Equipamento;
}
