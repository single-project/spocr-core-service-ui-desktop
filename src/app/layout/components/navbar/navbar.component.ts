import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {AppTableTypes} from '../../../core/models/app-tabe-types.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  userId;
  @Output()
  onSwitchTable = new EventEmitter<any>();

  private _menuItems: MenuItem[];

  get menuItems(): MenuItem[] {
    return this._menuItems;
  }

  set menuItems(value: MenuItem[]) {
    this._menuItems = value;
  }

  constructor(
    private auth: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.menuItems = [{
      label: 'Справочники',
      items: [
        {
          label: 'Торговые точки',
          icon: 'pi pi-fw pi-folder-open',
          command: () => this.switchTable(AppTableTypes.SHOP_TABLE_TYPE)
        },
        {
          label: 'Контрагенты',
          icon: 'pi pi-fw pi-folder-open',
          command: () => this.switchTable(AppTableTypes.COUNTER_PARTIES_TABLE_TYPE)
        },
        {
          label: 'Производители',
          icon: 'pi pi-fw pi-folder-open',
          command: () => this.switchTable(AppTableTypes.MANUFACTURE_TABLE_TYPE)
        },
        {
          label: 'Типы ТТ',
          icon: 'pi pi-fw pi-folder-open',
          command: () => this.switchTable(AppTableTypes.SHOP_TYPES_TABLE_TYPE)
        },
        {
          label: 'Отделы магазина',
          icon: 'pi pi-fw pi-folder-open',
          command: () => this.switchTable(AppTableTypes.SHOP_DEPARTMENTS_TABLE_TYPE)
        },
        {
          label: 'Каналы продаж',
          icon: 'pi pi-fw pi-folder-open',
          command: () => this.switchTable(AppTableTypes.SALES_CHANELS_TABLE_TYPE)
        },
        {
          label: 'Специализация магазинов',
          icon: 'pi pi-fw pi-folder-open',
          command: () => this.switchTable(AppTableTypes.SHOP_SPECIALIZATIONS_TABLE_TYPE)
        },
        {
          label: 'Договоры',
          icon: 'pi pi-fw pi-folder-open',
          command: () => this.switchTable(AppTableTypes.CONTRACTS_TABLE_TYPE)
        },
      ]
    },
      {
        label: 'Персональное',
        items: [
          {label: 'Профиль', icon: 'pi pi-fw pi-user', command: () => this.onProfile()},
          {label: 'Выход', icon: 'pi pi-fw pi-sign-out', command: () => this.onLogout()}
        ]
      }];
  }

  onLogout(): void {
    this.auth.logout();
  }

  onProfile(): void {
    this.router.navigate(['/', 'profile']);
  }

  switchTable(tableType: AppTableTypes): void {
    this.onSwitchTable.emit(tableType);
  }
}
