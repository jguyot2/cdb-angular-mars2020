import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { OpenPopup } from '../popup';
import { ComputerAddComponent } from '../computer-add/computer-add.component';
import { ComputerService } from '../computer.service';
import { Computer } from '../models/computer.model';
import { Page } from '../models/page.model';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-underbody',
  templateUrl: './underbody.component.html',
  styleUrls: ['./underbody.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #066999;
      color: white;
      border: 1px solid white;
      padding: 15px 15px; 
      box-shadow: 10px 10px 10px #066999;
      align-items:center;

    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
      
    }
    .mat-form-field-appearance-fill .mat-form-field-flex{
      background-color: #add8e6;
      padding:1px
  }
  `]
})
export class UnderbodyComponent implements OnInit {
  constructor(private openPopup:OpenPopup, private service:ComputerService) { }
  page: Page = {currentPage: 1, pageSize: 10};
  nbPage: number;
  nbComputers: number;
  listPages: number[];

  computerList:Computer[];
  
  
  displayedColumns: string[] = ['select','computerName', 'introducedDate', 'discontinuedDate', 'companyDTO'];
  selection = new SelectionModel<Computer>(true, []);
  dataSource = new MatTableDataSource<Computer>();
  ngOnInit(): void {
    this.setNbCompurtersAndPages();
    this.paginatedList(1);
  }

  oopenPopupAdd(){
    this.openPopup.opene(ComputerAddComponent, {size:'sm',centered: true,windowClass: 'dark-modal',backdropClass: 'light-blue-backdrop' })
  }
  // oopenPopupEdit(){
  //   this.openPopup.opene(Component, {size:'sm',centered: true,windowClass: 'dark-modal',backdropClass: 'light-blue-backdrop' })
  // }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.computerList.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.computerList.forEach(row => this.selection.select(row));
  }
  checkboxLabel(row?: Computer): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idComputer + 1}`;
  }

    getList(): Computer[] {
      var finalList;
      this.service.getPaginatedComputerList(this.page).subscribe(
          (result: Computer[]) => {
            finalList = result;
          }, 
          (error) => {
            console.log(error);
            finalList = [];
          })
          return finalList;
    }

  paginatedList(pageNumber: number): void {
      this.page.currentPage = pageNumber;
      this.service.getPaginatedComputerList(this.page).subscribe(
          (result: Computer[]) => {
        this.computerList = result;
        this.listPages = this.getListPages(9);
        console.log(this.listPages);
          }, 
          (error) => {
            console.log(error);
          })
  }

  getNextPage(): void {
    if (this.page.currentPage < this.nbPage) {
      this.page.currentPage++;
      this.paginatedList(this.page.currentPage);
    }
  }

  getPreviousPage(): void {
    if (this.page.currentPage > 1) {
      this.page.currentPage--;
      this.paginatedList(this.page.currentPage);
    }
  }

  setNbCompurtersAndPages(): void {
    this.service.getNumberComputers().subscribe(
        (result: number) => {
          this.nbComputers = result;
          this.nbPage = this.getNbPages(this.page, result);
        }, 
        (error) => {
          console.log(error);
        })
  }

  getNbPages(page: Page, nbComputers: number): number {
    return Math.ceil(nbComputers/page.pageSize);
  }

  getListPages(nb: number): number [] {
    var nbSpaceAfterCurrentPage = Math.ceil(nb/2);
    var firstPageToShow;

    if (this.page.currentPage <= nbSpaceAfterCurrentPage) {
      firstPageToShow = 1;
    } else if (this.page.currentPage > this.nbPage - nbSpaceAfterCurrentPage) {
      firstPageToShow = this.nbPage - nb;
    } else {
      firstPageToShow = this.page.currentPage - nb + nbSpaceAfterCurrentPage;
    }
    var lastPageToShow = firstPageToShow + nb;
    return Array.from(Array(lastPageToShow - firstPageToShow), (_, index) => index + firstPageToShow);
  }

}