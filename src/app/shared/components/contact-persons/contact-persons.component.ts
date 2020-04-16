import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentDetails } from '../../../core/models/global-reference.model';
import { forkJoin } from 'rxjs';
import { PersonalRekvService } from '../../../core/services/personal-rekv.service';
import { ConfigService } from '../../../core/services/config.service';
import moment from 'moment-timezone';

@Component({
  selector: 'app-contact-persons',
  templateUrl: './contact-persons.component.html',
  styleUrls: ['./contact-persons.component.scss']
})
export class ContactPersonsComponent implements OnInit {
  @Input() public parentForm: FormGroup;
  @Input() formBuilder: FormBuilder;
  @Input() parentEntity: any;
  public citizenship = [];
  public genders = [];
  public docTypes = [];
  public ruCalLocale = {};

  constructor(
    private personalService: PersonalRekvService,
    private config: ConfigService) {
  }

  ngOnInit(): void {
    this.loadAvailablePersonalData();
    this.loadConfig();
    this.addContatcs();
  }


  loadAvailablePersonalData(): void {
    forkJoin([
      this.personalService.fetchCitizenship(),
      this.personalService.fetchDocTypes(),
      this.personalService.fetchGender()])
      .subscribe(data => {
        this.citizenship = data[0]['content'];

        this.docTypes = data[1]['content'];

        this.genders = data[2]['content'];

      })

  }

  addContatcs(): void {
    this.parentForm.addControl('contacts', this.formBuilder.array([]));
    if(!this.parentEntity['contacts']){
      this.pushContact();
    }else if(this.parentEntity['contacts']){
      this.parentEntity['contacts'].forEach(cp => {
        this.pushContact(cp);
      })
    }

  }

  loadConfig(): void{
    this.ruCalLocale = this.config.fetchCalendarConfig();
  }

  insertContactDetail(): void {
    this.pushContact();
  }

  deleteContact(index: number): void {
    const contacts = this.parentForm.get('contacts') as FormArray;
    contacts.removeAt(index);
  }

  pushContact(values?: any) {
    const contactArray = this.parentForm.get('contacts') as FormArray;
    if (values) {
      values['person'] = this.formBuilder.group({...values['person']});
      contactArray.push(this.formBuilder.group({
        ...values
      }));
    } else if (!values) {
      contactArray.push(this.formBuilder.group({
        id: null,
        version: null,
        active: true,
        role:{
          id: null,
          version: null,
          active: true,
          name: ''
        },
        person: this.formBuilder.group({
          id: null,
          version: null,
          name: ['', Validators.required],
          lastName: '',
          firstName: '',
          patronymic: '',
          birthDate: moment().toDate(),
          birthPlace: '',
          docType: {
            id: null,
            name: '',
            ident: '',
            properties: {}
          },
          docSeriesNumber: '',
          inn: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(12)])],
          citizenship: {
            id: null,
            name: '',
            ident: '',
            properties: {}
          },
          gender: {
            id: null,
            name: '',
            ident:'',
            properties: {}
          },
          email: ['', Validators.email],
          phones: [],
        }),
        name: '',
        lastName: '',
        firstName: '',
        patronymic: '',
      }));
    }

  }

  get contacts() {
    return this.parentForm.get('contacts') as FormArray;
  }

  getContactName(contact: any): string {
    console.dir(contact);
    return `${contact.get('person').value['name']} / ${contact.get('role').value['name']}`;
  }

}
