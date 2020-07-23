import { Component, OnInit, ViewChild } from '@angular/core';
import { ComputerService } from '../computer.service';
import { Computer } from '../models/computer.model';
import {MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {

  constructor(private service:ComputerService) { } 
  
  computerList:Computer[];
  
  displayedColumns: string[] = ['idComputer', 'computerName', 'introducedDate', 'discontinuedDate', 'companyDTO'];

  ngOnInit(): void {
    this.service.getComputerList().subscribe(
  	    (result: Computer[]) => {
  		this.computerList = result;
  	    }, 
  	    (error) => {
          console.log(error);
  		this.computerList = [];
  	    })
    }

}
