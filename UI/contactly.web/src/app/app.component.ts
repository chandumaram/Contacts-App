import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contact } from '../models/contact.model';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  contacts: Contact[] = [];
  error: string = "";

  constructor(private contactService: ContactService) { }

  contactsForm = new FormGroup({
    id: new FormControl<string | null>(null),
    name: new FormControl<string>(''),
    email: new FormControl<string | null>(null),
    phone: new FormControl<string>(''),
    favorite: new FormControl<boolean>(false)
  })

  ngOnInit() {
    this.getAllContacts();
  }

  private getAllContacts() {
    this.contactService.getAllContacts().subscribe((data: any) => {
      if (data['status']) {
        this.contacts = data['outPut'] as Contact[];
      }
      else {
        this.error = data['message'];
      }
    })
  }

  onFormSubmit() {
    const contact = this.contactsForm.getRawValue() as Contact;

    this.contactService.saveContact(contact).subscribe((data: any) => {
      if (data['status']) {
        this.getAllContacts();
        this.contactsForm.reset();
        this.contactsForm.controls['favorite'].setValue(false);
      }
      else {
        this.error = data['message'];
      }
    });
  }

  onContactEdit(id: string) {
    this.contactService.getContactById(id).subscribe((data: any) => {
      if (data['status']) {
        let contact = data['outPut'] as Contact;

        this.contactsForm.controls['id'].setValue(contact.id);
        this.contactsForm.controls['name'].setValue(contact.name);
        this.contactsForm.controls['email'].setValue(contact.email);
        this.contactsForm.controls['phone'].setValue(contact.phone);
        this.contactsForm.controls['favorite'].setValue(contact.favorite);
      }
      else {
        this.error = data['message'];
      }
    });
  }

  onContactDelete(id: string) {
    this.contactService.deleteContactById(id).subscribe((data: any) => {
      if (data['status']) {
        this.getAllContacts();
      }
      else {
        this.error = data['message'];
      }
    });
  }
}
