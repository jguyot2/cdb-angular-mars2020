import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { ComputerService } from '../computer.service';
import { Computer } from '../models/computer.model';
import { Page } from '../models/page.model';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



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
  dataSource: MatTableDataSource<Computer>;


  @Input('ngModel')  
  search: string;

  order: string;
  sorted: boolean = false;
  
  displayedColumns: string[] = ['idComputer', 'computerName', 'introducedDate', 'discontinuedDate', 'companyDTO'];


  ngOnInit(): void {
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
    console.log("search :" +this.search);
    console.log("sorted :" +this.sorted);
    if (this.search && this.sorted) {
      this.orderAndSearchComputers(pageNumber);
    } else if (this.search) {
      this.searchComputer(pageNumber);
    } else if (this.sorted) {
      this.orderComputers(pageNumber);
    } else {
      this.basicPaginatedList(pageNumber);
    }  }

  basicPaginatedList(pageNumber: number): void {
    this.service.getPaginatedComputerList(this.page).subscribe(
        (result: Computer[]) => {
      this.computerList = result;
      this.listPages = this.getListPages(9);
        }, 
        (error) => {
          console.log(error);
      this.computerList = [];
        })
    this.setNbCompurtersAndPages();

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

  setNbCompurtersAndPagesWithSearch(search: string): void {
    this.service.getNumberSearchComputers(search).subscribe(
        (result: number) => {
          this.nbComputers = result;
          this.nbPage = this.getNbPages(this.page, result);
          this.listPages = this.getListPages(9);
        }, 
        (error) => {
          console.log(error);
        })
  }

  getNbPages(page: Page, nbComputers: number): number {
    return Math.ceil(nbComputers/page.pageSize);
  }

  deleteComputer(computer: Computer) {
    if (this.computerList.includes(computer)) { 
      this.service.deleteComputer(computer).subscribe(
        () => {
          var index = this.computerList.indexOf(computer);
          this.computerList.splice(index, 1);
          if (this.computerList.length == 0) {
            this.page.currentPage --;
          }
          this.paginatedList(this.page.currentPage);
        }, 
        (error) => {
        })
      }
    }

  getListPages(nb: number): number [] {
    var nbSpaceAfterCurrentPage = Math.ceil(nb/2);
    var firstPageToShow;
    var lastPageToShow;

    if (this.page.currentPage <= nbSpaceAfterCurrentPage) {
      firstPageToShow = 1;
    } else if (this.page.currentPage > this.nbPage - nbSpaceAfterCurrentPage) {
      firstPageToShow = this.nbPage - nb;
    } else {
      firstPageToShow = this.page.currentPage - nb + nbSpaceAfterCurrentPage;
    }

    if (this.nbPage < nb){
      lastPageToShow = firstPageToShow + this.nbPage;
    } else {
      lastPageToShow = firstPageToShow + nb;
    }
   
    return Array.from(Array(lastPageToShow - firstPageToShow), (_, index) => index + firstPageToShow);
  }

  searchComputer(pageNumber: number): void {
    if (this.search) {
      this.page = {currentPage: pageNumber, pageSize: 10};
      this.service.searchComputer(this.search, this.page).subscribe(
        (result: Computer[]) => {
          this.computerList = result;
          this.setNbCompurtersAndPagesWithSearch(this.search);
        }, 
        (error) => {
        })
    }
  }

  orderComputers(pageNumber: number): void {
    if (this.order && this.isValidOrder()) {
      this.page = {currentPage: pageNumber, pageSize: 10};
      this.service.orderComputers(this.order, this.page).subscribe(
        (result: Computer[]) => {
          this.computerList = result;
          this.setNbCompurtersAndPages();
        }, 
        (error) => {
        })
    } else {
      this.paginatedList(pageNumber);
    }
  }

  orderAndSearchComputers(pageNumber: number): void {
    if (this.search && this.order && this.isValidOrder()) {
      this.page = {currentPage: pageNumber, pageSize: 10};
      this.service.orderAndSearchComputers(this.search, this.order, this.page).subscribe(
        (result: Computer[]) => {
          this.computerList = result;
          this.setNbCompurtersAndPagesWithSearch(this.search);
        }, 
        (error) => {
        })
    } else {
      this.paginatedList(pageNumber);
    }
  }

  isValidOrder(): boolean {
    const ordersList: string[] = ["computerAsc", "computerDesc", "companyAsc", "companyDesc",
    "introducedAsc", "introducedDesc", "discontinuedAsc", "discontinuedDesc"];
    return ordersList.includes(this.order);
  }

  dataSort(sort: Sort): void {
    this.sorted = sort.direction ? true : false;
    console.log("sorted or not: "+ this.sorted);
    this.order = sort.active.split(/(?=[A-Z])/)[0] + this.capitalize(sort.direction);
    if (this.search){
      this.orderAndSearchComputers(1);
    } else {
      this.orderComputers(1);
    }
  }
  
  capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

}