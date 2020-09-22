import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ComputerAddComponent } from '../computer-add/computer-add.component';
import { ComputerService } from '../computer.service';
import { Computer } from '../models/computer.model';
import { Page } from '../models/page.model';
import { MatTableDataSource } from '@angular/material/table';
import { ComputerEditComponent } from '../computer-edit/computer-edit.component';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../auth/authentication.service';
import { ComputerDeleteDialogComponent } from '../computer-delete-dialog/computer-delete-dialog.component';
import { DashboardParameters } from '../models/dashboard-parameters.model';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';



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

  listPages: number[] = [0];
  listPageSize: number[] = [10, 20, 50, 100];

  searching: boolean = false;

  computerList: Computer[];

  dataSource: MatTableDataSource<Computer>;

  cdkConnectedOverlayBackdropClass = "cdk-overlay-transparent-backdrop"

  adminRole: boolean = false;

  @Input('ngModel')
  search: string;

  order: string;
  sorted: boolean = false;

  displayedColumns: string[] = ['id', 'name', 'introduced', 'discontinued', 'company'];

  dashboardParameters = new DashboardParameters();

  getColumnName(dispColumn) {
    switch (dispColumn) {
      case "id":
        return "computerId"; // Inutile
      case "company":
        return "companyName";
      default:
        return dispColumn;
    }
  }

  dataSort(event) {
    const sorted = event.active;
    const direction = event.direction;
    if (direction.trim() === "") {
      this.sorted = false;
      this.dashboardParameters.sort = "";
    } else {
      this.sorted = true;
      this.dashboardParameters.sort=this.getColumnName(sorted) + "-" + direction;
    }
    this.updatePage(0);
  }

  updateComputerList(): void {
    console.log("updating computer list");
    this.service.getComputers(this.dashboardParameters).subscribe(
      (result: Computer[]) => {
        console.log("result =" + JSON.stringify(result));
        this.computerList = result;
      },
      (error) => {
        console.log(error);
        this.computerList = [];
      }
    );
  }

  /// TODO refacto de ce truc parce que pas propre sur le maxbound
  setPageNumber(pageNumber: number) {
    const minBound = Math.max(0, pageNumber);
    this.dashboardParameters.page.pageNumber = Math.min(this.dashboardParameters.page.getNumberOfPages() ? this.dashboardParameters.page.getNumberOfPages() - 1 : 999999, minBound);
  }

  updatePage(pageNumber: number) {
    console.log("updating on page " + pageNumber.toString());
    console.log("number of elements = " + this.dashboardParameters.page.pageNumber.toString());
    this.setPageNumber(pageNumber);
    this.updateComputerList();
    this.updatePageList();
  }

  updatePageList() {
    this.service.getComputersNumber(this.dashboardParameters).subscribe(
      (result: number) => {
        console.log("result =" + JSON.stringify(result));
        this.dashboardParameters.page.numberOfElements = result;
        this.listPages = this.getPageList(this.dashboardParameters.page);
      }, (error) => { console.log(error); })
   
  }

  getPageList(p: Page): number[] {
    const ret: number[] = [];
    const nbPages: number = p.getNumberOfPages();
    if (!nbPages)
      return ret;
    const pageNumber = p.pageNumber;

    const firstPage = Math.min(Math.max(pageNumber - 4, 0), Math.max(p.getNumberOfPages() - 9, 0));
    const lastPage = p.getNumberOfPages() - 1;
    var i: number;
    for (i = firstPage; i < p.getNumberOfPages() && i < firstPage + 9; i++)
      ret.push(i);

    return ret;
  }

  setPageLength(newPageLength: number) {
    console.log(newPageLength);
    this.dashboardParameters.page.pageLength = newPageLength;
    this.updatePage(0);
  }


  ////// AFFICHAGE LISTE ORDIS ///////
  onSearch(search: string) {
    this.dashboardParameters.sort = "";

    // Rercherche vide, rien à faire
    if (!search || search.trim() === "") {
      return;
    }
    this.searching = true;
    this.dashboardParameters.search = search;
    this.updateComputerList();
  }

  ////// FIN AFFICHAGE LISTE ORDIS /////

  ngOnInit(): void {
    this.adminRole = this.auth.isLoggedInAsAdmin();
    console.log("admin role:" + this.adminRole);
    this.updatePage(0);
  }

  openPopupAdd() {
    const dialogRef = this.dialog.open(ComputerAddComponent, { data: null, backdropClass: 'light-blue-backdrop' });
    // Actualisation de la liste des pc affichés 
    this.dialog.afterAllClosed.subscribe(
      () => { this.updatePage(this.dashboardParameters.page.pageNumber) }
    );
  }

  editedComputer: Computer;

  openEditForm(computer: Computer): void {
    const dialogRef = this.dialog.open(ComputerEditComponent, { data: { computer: computer }, backdropClass: 'light-blue-backdrop' });

    // Actualisation de la liste des pc
    this.dialog.afterAllClosed.subscribe(
      () => { this.updatePage(this.dashboardParameters.page.pageNumber); }
    )
  }

  openDeleteDialog(computer: Computer) {
    const id = this.dialog.open(ComputerDeleteDialogComponent).id;

    this.dialog.getDialogById(id).afterClosed().subscribe(
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
            this.gotoPreviousPage();
          } else {
            this.updatePage(this.dashboardParameters.page.pageNumber);
          }
        },
        (error) => {
        })
    }
  }

  capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  refreshPage() {
    this.dashboardParameters.search = null;
    this.dashboardParameters.sort = "";
    this.updatePage(0);
    this.updateComputerList();
  }

  gotoNextPage() {
    this.updatePage(this.dashboardParameters.page.pageNumber + 1);
  }

  gotoPreviousPage() {
    this.updatePage(this.dashboardParameters.page.pageNumber - 1);
  }

}  
