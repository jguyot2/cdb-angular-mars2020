import { createDirective } from '@angular/compiler/src/core';

export class Page {
    pageNumber: number;
    pageLength: number;
    numberOfElements: number;
    constructor() {
        this.pageLength = 10;
        this.pageNumber = 0;
        this.numberOfElements = null;
    }
    getNumberOfPages() {

        console.log("nb elts :" + this.numberOfElements?.toString);
        if (! this.numberOfElements)
            return null;
 
        return Math.floor(this.numberOfElements / this.pageLength) + (this.numberOfElements % this.pageLength == 0 ? 0 : 1);
    }
    toString() {
        return "current page : " + this.pageNumber?.toString()
            + "\t page size : " + this.pageLength?.toString()
            + "\t number of elements : " + this.pageLength?.toString();
    }
}