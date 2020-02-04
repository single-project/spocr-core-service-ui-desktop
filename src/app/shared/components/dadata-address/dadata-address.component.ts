import {
  AfterViewInit, asNativeElements,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {DadataService} from "../../../core/services/dadata.service";
import {AddressData} from "../../../core/models/suggestion-address.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-dadata-address',
  templateUrl: './dadata-address.component.html',
  styleUrls: ['./dadata-address.component.scss']
})
export class DadataAddressComponent implements OnInit, AfterViewInit {
  @ViewChild('addressInput', {static: false}) addressInput: ElementRef;
  @Output() onSuggest = new EventEmitter<any>();
  private results: string[];
  private suggetionForParent: any;
  private addressGroup: FormGroup;
  private selectedItems: string[];
  private input$;

  constructor(
    @Inject(DadataService) private dadata: DadataService,
    @Inject(FormBuilder) private fb: FormBuilder
  ) {
    this.addressGroup = this.fb.group({
      'addressInput': ['']
    })
  }

  ngOnInit() {
    this.results = [];
    this.selectedItems = [];
  }

  ngAfterViewInit(): void {

  }

  find(e){
    this.dadata.addressSuggest(e.query).pipe(
      map(s => s.map(s => s.value))
    ).subscribe(v => this.results = v)
  }

  select(e){

    this.selectedItems.push(e);
    console.log(this.selectedItems);

  }

  pushSuggest(): void {
    this.onSuggest.emit(this.suggetionForParent);
  }
}
