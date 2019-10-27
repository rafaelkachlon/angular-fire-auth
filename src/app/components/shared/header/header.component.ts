import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  @Input() title: string;
  @Input() backPath: string;

  ngOnInit() {
  }

  Back() {
    this.router.navigate([this.backPath]);
  }

}
