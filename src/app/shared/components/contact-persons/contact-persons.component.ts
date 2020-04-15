import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { PaymentDetails } from '../../../core/models/global-reference.model';
import { forkJoin } from 'rxjs';
import { PersonalRekvService } from '../../../core/services/personal-rekv.service';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-contact-persons',
  templateUrl: './contact-persons.component.html',
  styleUrls: ['./contact-persons.component.scss']
})
export class ContactPersonsComponent implements OnInit {
  @Input() public parentForm: FormGroup;
  @Input() formBuilder: FormBuilder;
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

  loadConfig(): void{
    this.ruCalLocale = this.config.fetchCalendarConfig()
  }

  insertContactDetail(): void {
    this.pushContact();
  }

  deleteContact(index: number): void {
    const paymentArray = this.parentForm.get('paymentDetails') as FormArray;
    paymentArray.removeAt(index);
  }

  pushContact(values?: PaymentDetails) {

    const contactArray = this.parentForm.get('paymentDetails') as FormArray;
    if (values) {
      contactArray.push(this.formBuilder.group({
        ...values
      }))
    } else if (!values) {
      contactArray.push(this.formBuilder.group({
        id: null,
        paymentAccount: '',
        correspondingAccount: '',
        bic: '',
        bank: '',
      }))
    }

  }

  get contacts() {
    return this.parentForm.get('contacts') as FormArray;
  }

  getContactName(contact: any): string {
    return `${contact.get('name').value} / ${contact.get('role').value}`
  }

}
