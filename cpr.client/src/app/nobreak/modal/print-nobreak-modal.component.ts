import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Nobreak } from '../nobreak.component';

@Component({
  selector: 'print-nobreak-modal',
  templateUrl: './print-nobreak-modal.component.html',
  styleUrls: ['./modal.css']
})
export class PrintNobreakModalComponent implements OnInit {
  @Input() nobreak: Nobreak = {} as Nobreak;
  @Output() close = new EventEmitter<void>();

  public showModal: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  openPrintModal(nobreak: Nobreak) {
    this.nobreak = nobreak;
    this.showModal = true;
  }

  closePrintModal() {
    this.showModal = false;
    this.close.emit();
  }

  print() {
    window.print();
  }

  @ViewChild('printModal') printModal!: PrintNobreakModalComponent;

  printNobreak(nobreak: Nobreak) {
    this.printModal.openPrintModal(nobreak);
  }

  onModalClose() {
    console.log('Modal fechado');
  }

}
