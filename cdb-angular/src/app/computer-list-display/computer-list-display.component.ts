import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../computer.service';
import { Computer } from '../models/computer.model';

@Component({
  selector: 'app-computer-list-display',
  templateUrl: './computer-list-display.component.html',
  styleUrls: ['./computer-list-display.component.scss']
})
export class ComputerListDisplayComponent implements OnInit {

  constructor(private service:ComputerService) { } 
  
  computerList:Computer[];

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
