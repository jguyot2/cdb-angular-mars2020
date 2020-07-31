import { Component, OnInit, AfterContentInit} from '@angular/core';
import { ComputerService } from '../computer.service';
import { Computer } from '../models/computer.model';
import { Page } from '../models/page.model';



@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {

  constructor(private service:ComputerService) { } 

  page: Page = {currentPage: 1, pageSize: 10};
  nbPage: number;
  nbComputers: number;
  listPages: number[];

  computerList:Computer[];

  
  displayedColumns: string[] = ['idComputer', 'computerName', 'introducedDate', 'discontinuedDate', 'companyDTO'];

  ngOnInit(): void {
    this.setNbCompurtersAndPages();
    this.paginatedList(1);
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