import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  nbPage: number = 1;
  nbComputers: number = 0;

  computerList:Computer[];

  
  displayedColumns: string[] = ['idComputer', 'computerName', 'introducedDate', 'discontinuedDate', 'companyDTO'];

  ngOnInit(): void {
    this.paginatedList(1);
    this.setNbCompurters();
    this.nbPage = this.getNbPages(this.page, this.nbComputers);
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
        }, 
        (error) => {
          console.log(error);
      this.computerList = [];
        })
  }

  getNextPage(): void {
    this.page.currentPage++;
    this.service.getPaginatedComputerList(this.page).subscribe(
        (result: Computer[]) => {
      this.computerList = result;
        }, 
        (error) => {
          console.log(error);
      this.computerList = [];
        })
  }

  setNbCompurters(): void {
    this.service.getNumberComputers().subscribe(
        (result: number) => {
        this.nbComputers = result;
        }, 
        (error) => {
          console.log(error);
        })
  }

  getNbPages(page: Page, nbComputers: number): number {
    return Math.ceil(nbComputers/page.pageSize);
  }

}