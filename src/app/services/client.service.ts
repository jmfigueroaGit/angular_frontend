import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = 'http://localhost:3000/api/clients';

  constructor(private http: HttpClient) {}

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client);
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl);
  }

  getClientById(clientId: number): Observable<Client> {
    const url = `${this.baseUrl}/${clientId}`;
    return this.http.get<Client>(url);
  }

  updateClient(clientId: number, client: Client): Observable<Client> {
    const url = `${this.baseUrl}/${clientId}`;
    return this.http.put<Client>(url, client);
  }

  deleteClient(clientId: number): Observable<Client> {
    const url = `${this.baseUrl}/${clientId}`;
    return this.http.delete<Client>(url);
  }
}
