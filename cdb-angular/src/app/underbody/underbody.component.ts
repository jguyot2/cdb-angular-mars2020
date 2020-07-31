import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { OpenPopup } from '../popup';
import { ComputerAddComponent } from '../computer-add/computer-add.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-underbody',
  templateUrl: './underbody.component.html',
  styleUrls: ['./underbody.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #014991;
      color: white;
      border: 4mm ridge rgba(170, 50, 220, .6);

    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class UnderbodyComponent implements OnInit {
  constructor(private openPopup:OpenPopup) { }

  ngOnInit(): void {
  }

  oopenPopupAdd(){
    this.openPopup.opene(ComputerAddComponent, {size:'lg',centered: true,windowClass: 'dark-modal',backdropClass: 'light-blue-backdrop' })
  }

  // oopenPopupEdit(){
  //   this.openPopup.open(ComputerEditComponent)
  // }
  
}
// $('.selectall').click(function() {
//   if ($(this).is(':checked')) {
//       $('input:checkbox').attr('checked', true);
//   } else {
//       $('input:checkbox').attr('checked', false);
//   }
// });
