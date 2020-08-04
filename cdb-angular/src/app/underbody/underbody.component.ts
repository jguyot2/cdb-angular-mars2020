import { Component, OnInit,ViewEncapsulation,Input } from '@angular/core';
import { ComputerAddComponent } from '../computer-add/computer-add.component';
import { ComputerService } from '../computer.service';
import { Computer } from '../models/computer.model';
import { Page } from '../models/page.model';
import { MatTableDataSource } from '@angular/material/table';
import { ComputerEditComponent } from '../computer-edit/computer-edit.component';
import {Sort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../auth/authentication.service';
import { ComputerDeleteDialogComponent } from '../computer-delete-dialog/computer-delete-dialog.component';



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
   
    .mat-form-field-appearance-fill .mat-form-field-flex{
      background-color: #add8e6;
      padding:1px
  }
  `]
})
export class UnderbodyComponent implements OnInit {
  
  constructor(private service: ComputerService, public dialog: MatDialog, private auth: AuthenticationService) { }

  page: Page = { currentPage: 1, pageSize: 10 };
  nbPage: number;
  nbComputers: number;
  listPages: number[];
  listPageSize: number[] = [10, 20, 50, 100];
  computerList:Computer[];
  dataSource: MatTableDataSource<Computer>;
  cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"

  adminRole: boolean = false;

  @Input('ngModel')
  search: string;

  order: string;
  sorted: boolean = false;
  
  displayedColumns: string[] = ['idComputer', 'computerName', 'introducedDate', 'discontinuedDate', 'companyDTO'];


  ngOnInit(): void {
    this.paginatedList(1);
    this.adminRole = this.auth.isLoggedInAsAdmin();
  }
  openPopupAdd(){
    const dialogRef = this.dialog.open(ComputerAddComponent, {data : null,backdropClass: 'light-blue-backdrop'});
    this.dialog.afterAllClosed.subscribe (
      ()=>{this.paginatedList(this.page.currentPage)}
    );
  }

  editedComputer: Computer;
  openEditForm(computer: Computer): void {
    console.log("opening edit form...");
    const dialogRef = this.dialog.open(ComputerEditComponent, { data: { computer: computer },backdropClass: 'light-blue-backdrop' });
    console.log(computer);
    this.dialog.afterAllClosed.subscribe (
      ()=>{this.paginatedList(this.page.currentPage)}
    )
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

    if (this.search && this.sorted) {
      this.orderAndSearchComputers(pageNumber);

    } else if (this.search) {
      this.searchComputer(pageNumber);

    } else if (this.sorted) {
      this.orderComputers(pageNumber);

    } else {
      this.basicPaginatedList(pageNumber);
    }  
  }

  basicPaginatedList(pageNumber: number): void {
    this.service.getPaginatedComputerList(this.page).subscribe(
      (result: Computer[]) => {
        this.computerList = result;
        this.setNbCompurtersAndPages();
        this.listPages = this.getListPages(9);
      },
      (error) => {
        console.log(error);
        this.computerList = [];
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
        this.listPages = this.getListPages(9);
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
    return Math.ceil(nbComputers / page.pageSize);
  }

  openDeleteDialog(computer: Computer) {
    const id = this.dialog.open(ComputerDeleteDialogComponent).id;

    this.dialog.getDialogById(id).afterClosed().subscribe (
      result => {
      if (result) {
        this.deleteComputer(computer);
      }
    }
    )
  }

  deleteComputer(computer: Computer) {
    if (this.computerList.includes(computer)) {
      this.service.deleteComputer(computer).subscribe(
        () => {
          var index = this.computerList.indexOf(computer);
          this.computerList.splice(index, 1);
          if (this.computerList.length == 0) {
            this.page.currentPage--;
          }
          this.paginatedList(this.page.currentPage);
        },
        (error) => {
        })
    }
  }

  getListPages(nb: number): number[] {
    var nbSpaceAfterCurrentPage = Math.ceil(nb / 2);
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
      firstPageToShow = 1;
      lastPageToShow = firstPageToShow + this.nbPage;
    } else {
      lastPageToShow = firstPageToShow + nb + 1;
    }

    return Array.from(Array(lastPageToShow - firstPageToShow), (_, index) => index + firstPageToShow);
  }

  searchComputer(pageNumber: number): void {
    if (this.search) {
      this.page.currentPage = pageNumber;
      this.service.searchComputer(this.search, this.page).subscribe(
        (result: Computer[]) => {
          this.computerList = result;
          this.setNbCompurtersAndPagesWithSearch(this.search);
          this.listPages = this.getListPages(9);
        }, 
        (error) => {
        })
    }
  }

  orderComputers(pageNumber: number): void {
    if (this.order && this.isValidOrder()) {
      this.page.currentPage = pageNumber;
      this.service.orderComputers(this.order, this.page).subscribe(
        (result: Computer[]) => {
          this.computerList = result;
          this.setNbCompurtersAndPages();
          this.listPages = this.getListPages(9);
        }, 
        (error) => {
        })
    } else {
      this.paginatedList(pageNumber);
    }
  }

  orderAndSearchComputers(pageNumber: number): void {
    if (this.search && this.order && this.isValidOrder()) {
      this.page.currentPage = pageNumber;
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

  refreshPage() {
    this.page = { currentPage: 1, pageSize: 10 };
    this.search = "";
    this.sorted = false;
    this.paginatedList(1);
  }

}  
