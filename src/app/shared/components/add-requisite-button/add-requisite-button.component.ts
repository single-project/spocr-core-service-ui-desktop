import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

enum BtnState{
  Add,
  Remove
}

@Component({
  selector: 'app-add-requisite-button',
  templateUrl: './add-requisite-button.component.html',
  styleUrls: ['./add-requisite-button.component.scss']
})
export class AddRequisiteButtonComponent implements OnInit, AfterViewInit {

  @Input() requisite: any;
  @Input() dropDownOptions: {id: string, name: string}[];
  public currentLabel: string;
  public currentIcon: string;
  public currentClass: string;
  public externalRequisiteVisible$ = new Subject<boolean>();
  public selectedType$ = new Subject<string>();
  public selectedOptions: {id: string, name: string};
  public dropdownShow: boolean;
  private existingLabelsList = ['Добавить реквизит', 'Убрать реквизит'];
  private existingIconsList = ['pi pi-plus', 'pi pi-minus'];
  private existingBtnClassesList = ['ui-button-success', 'ui-button-danger'];
  private currentState: BtnState;
  constructor() {

  }

  ngOnInit(): void {
    this.requisite ? this.currentState = BtnState.Remove : this.currentState = BtnState.Add;
    this.dropdownShow = false;
    this.initialize(this.currentState);

  }

  ngAfterViewInit(): void {
    console.log(`this reqs ${this.requisite}`);
  }

  addReqBtnToggleReqs(): void {
      console.log(this.currentState);
      if(this.currentState === BtnState.Add){
        this.currentState = BtnState.Remove;
        this.initialize(this.currentState);
        if(this.dropDownOptions){
          this.dropdownShow = true;
        }
      }else if(this.currentState === BtnState.Remove){
        this.currentState = BtnState.Add;
        this.initialize(this.currentState);
      }

  }

  selectDropdownOption(e: any){
    this.dropdownShow = false;
    console.log(e.value.id);
    this.selectedType$.next(e.value.id);
  }

  initialize(state: BtnState): void{
    if(state === BtnState.Add){
      this.currentIcon = this.existingIconsList[BtnState.Add];
      this.currentClass = this.existingBtnClassesList[BtnState.Add];
      this.currentLabel = this.existingLabelsList[BtnState.Add];
      this.externalRequisiteVisible$.next(false);
    }else if(state === BtnState.Remove){
      this.currentIcon = this.existingIconsList[BtnState.Remove];
      this.currentClass = this.existingBtnClassesList[BtnState.Remove];
      this.currentLabel = this.existingLabelsList[BtnState.Remove];
      this.externalRequisiteVisible$.next(true);
      this.dropdownShow = false;
    }
  }
}
