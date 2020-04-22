import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { PersonalRekvService } from '../../../core/services/personal-rekv.service';
import { ConfigService } from '../../../core/services/config.service';
import moment from 'moment-timezone';
import * as _ from 'lodash';

@Component({
  selector: 'app-contact-persons',
  templateUrl: './contact-persons.component.html',
  styleUrls: ['./contact-persons.component.scss']
})
export class ContactPersonsComponent implements OnInit, AfterViewInit {
  @Input() public parentForm: FormGroup;
  @Input() formBuilder: FormBuilder;
  @Input() parentEntity: any;
  public citizenship = [];
  public genders = [];
  public docTypes = [];
  public roles = [];
  public ruCalLocale = {};

  constructor(
    private personalService: PersonalRekvService,
    private config: ConfigService) {

  }

  ngOnInit(): void {
    console.dir(this.parentEntity);
    this.loadAvailablePersonalData();
    this.loadConfig();
    this.addContatcs();

  }

  ngAfterViewInit(): void {

  }


  loadAvailablePersonalData(): void {
    forkJoin([
      this.personalService.fetchCitizenship(),
      this.personalService.fetchDocTypes(),
      this.personalService.fetchGender(),
      this.personalService.fetchRoles()])

      .subscribe(data => {
        this.citizenship = data[0]['content'];

        this.docTypes = data[1]['content'];

        this.genders = data[2]['content'];

        this.roles = data[3]['content'];

      })

  }

  addContatcs(): void {
    console.log('Call addContacts');
    this.parentForm.addControl('contacts', this.formBuilder.array([]));
    const contacts = this.parentEntity['contacts'];
    if (!contacts) {
      this.pushContact();
    }
    if (contacts) {
      contacts.forEach(cp => {
        this.pushContact(cp);
      })
    }
  }

  loadConfig(): void {
    this.ruCalLocale = this.config.fetchCalendarConfig();
  }

  insertContactDetail(): void {
    this.pushContact();
  }

  deleteContact(index: number): void {
    const contacts = this.parentForm.get('contacts') as FormArray;
    contacts.removeAt(index);
  }

  pushContact(contactPerson?: any) {

    console.log('Call pushContacts');
    const contactArray = this.parentForm.get('contacts') as FormArray;
    if (contactPerson) {
      const contactClone = _.cloneDeep(contactPerson);
      contactClone['person']['birthDate'] ? contactClone['person']['birthDate'] = moment(contactClone['person']['birthDate']).toDate() : moment().toDate();
      contactClone['person'] = this.formBuilder.group(contactClone['person']);
      const bd = contactClone['person'].get('birthDate').value;
      contactClone['person'].patchValue({ 'birthDate': bd ? moment(bd).toDate() : moment().toDate() });
      contactArray.push(this.formBuilder.group({
        ...contactClone
      }));
    } else if (!contactPerson) {
      contactArray.push(this.formBuilder.group({
        id: null,
        version: null,
        active: true,
        comment: '',
        role: {
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
            ident: '',
            properties: {}
          },
          email: ['', Validators.email],
          phones: [],
        }),
      }));
    }
  }

  get contacts() {
    return this.parentForm.get('contacts') as FormArray;
  }

  getContactName(contact: any): string {
    return `${contact.get('person').value['name']} / ${contact.get('role').value['name']}`;
  }

}
