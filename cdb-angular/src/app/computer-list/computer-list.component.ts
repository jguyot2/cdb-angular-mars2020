import { Component, OnInit, Input} from '@angular/core';
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

  @Input('ngModel')  
  search: string;

  
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
    if (this.search) {
      this.searchComputer(pageNumber);
    } else {
      this.basicPaginatedList(pageNumber);
    }
  }

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
          console.log("curretnpagebise " +this.page.currentPage);
          console.log(this.listPages);
          console.log("nbComputers" + result);
          console.log("nbpagesbis" + this.nbPage);
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
    console.log("test");
    console.log("1" +this.page.currentPage)
    console.log("2" +nbSpaceAfterCurrentPage)
    console.log("3" +this.nbPage)

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
      console.log(this.search);
      this.page = {currentPage: pageNumber, pageSize: 10};
      this.service.searchComputer(this.search, this.page).subscribe(
        (result: Computer[]) => {
          this.computerList = result;
          console.log("curretnpage " +this.page.currentPage);
          this.setNbCompurtersAndPagesWithSearch(this.search);

          console.log("nbComputersaa" + this.nbComputers);
          console.log("nbpagesbisaa" + this.nbPage);
        }, 
        (error) => {
        })
    }
  }

}