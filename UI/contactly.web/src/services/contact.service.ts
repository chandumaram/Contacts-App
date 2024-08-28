import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Contact } from "../models/contact.model";

@Injectable({
    providedIn: "root"
})

export class ContactService {

    api_url = "https://localhost:7121/api/Contacts";

    constructor(private http: HttpClient) { }

    getAllContacts() {
        return this.http.get(this.api_url);
    }

    getContactById(id: string) {
        return this.http.get(this.api_url + "/" + id)
    }

    saveContact(contact: Contact) {
        return this.http.post(this.api_url, contact)
    }

    deleteContactById(id: string) {
        return this.http.delete(this.api_url + "/" + id)
    }

}