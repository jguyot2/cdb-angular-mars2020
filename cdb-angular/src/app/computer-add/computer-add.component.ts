import { Component, OnInit, Input } from '@angular/core';

import { ComputerService } from '../computer.service';
import { Computer } from '../models/computer.model';

@Component({
  selector: 'app-computer-add',
  templateUrl: './computer-add.component.html',
  styleUrls: ['./computer-add.component.scss']
})
export class ComputerAddComponent implements OnInit {

  constructor(private service:ComputerService) {}

  @Input()
  createdComputer : Computer = new Computer();

  ngOnInit(): void {}

  onSubmit() { this.service.addComputer(this.createdComputer).subscribe(); }
}
