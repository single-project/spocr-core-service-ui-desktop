import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menuItems: MenuItem[];

  constructor() {
  }

  ngOnInit() {
    this.menuItems = [{
      label: 'Справочники',
      items: [
        {label: 'Торговые точки', icon: 'pi pi-fw pi-folder-open'},
        {label: 'Контрагенты', icon: 'pi pi-fw pi-folder-open'}
      ]
    },
      {
        label: 'Персональное',
        items: [
          {label: 'Профиль', icon: 'pi pi-fw pi-user'},
          {label: 'Выход', icon: 'pi pi-fw pi-sign-out'}
        ]
      }];
  }

}
