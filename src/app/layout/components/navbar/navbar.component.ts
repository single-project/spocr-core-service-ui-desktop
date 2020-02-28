import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  userId;
  @Output()
  onShopsMenu = new EventEmitter<any>();
  @Output()
  onCounterParties = new EventEmitter<any>();
  @Output()
  onManufactureMenu = new EventEmitter<any>();
  @Output()
  onShopTypsMenu = new EventEmitter<any>();

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
        {label: 'Торговые точки', icon: 'pi pi-fw pi-folder-open', command: () => this.onShops()},
        {label: 'Контрагенты', icon: 'pi pi-fw pi-folder-open', command: () => this.onCounterparties()},
        {label: 'Производители', icon: 'pi pi-fw pi-folder-open', command: () => this.onManufacture()},
        {label: 'Типы ТТ', icon: 'pi pi-fw pi-folder-open', command: () => this.onShopTypes()},
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

  onShops(): void {
    this.onShopsMenu.emit();
  }

  onCounterparties(): void {
    this.onCounterParties.emit();
  }

  onManufacture(): void {
    this.onManufactureMenu.emit();
  }

  onShopTypes(): void {
    this.onShopTypsMenu.emit();
  }


}
