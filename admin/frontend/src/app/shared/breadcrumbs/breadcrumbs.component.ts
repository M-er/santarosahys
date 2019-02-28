import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tr-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  @Input() pages: string[] = [];
  constructor() { }

  ngOnInit() {
  }

}
