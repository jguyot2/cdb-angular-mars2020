import { Component, Input, Injectable } from '@angular/core';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class OpenPopup {

    closeResult = '';
    constructor(private modalService: NgbModal) { }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
    public open(component: any) {
        this.modalService.open(component).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason: ModalDismissReasons) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    public opene(component: any, style : any) {
        this.modalService.open(component, style).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason: ModalDismissReasons) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    public close() {
        this.modalService.dismissAll();
    }
}

