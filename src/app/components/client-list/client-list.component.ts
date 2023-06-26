import { Component, OnInit } from '@angular/core';
import { ClientService } from '@services/client.service';
import { Client } from '@models/client.model';
import { TableColumn } from '@components/table/table.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

import { ClientUpdateComponent } from '@components/client-update/client-update.component';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  tableColumns: TableColumn[] = [
    { columnDef: 'id', header: 'ID' },
    { columnDef: 'first_name', header: 'First Name' },
    { columnDef: 'last_name', header: 'Last Name' },
    { columnDef: 'department', header: 'Department' },
    { columnDef: 'notes', header: 'Notes' },
    { columnDef: 'action', header: 'Action', action: true },
  ];

  clients: Client[] = [];

  constructor(
    private clientService: ClientService,
    public dialogRef: MatDialogRef<ClientUpdateComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  onEdit(row: any) {
    this.editClient(row.id);
  }

  onDelete(row: any) {
    this.deleteClient(row.id);
  }

  getClients(): void {
    this.clientService.getAllClients().subscribe(
      (clients) => {
        this.clients = clients;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteClient(id: number): void {
    this.clientService.deleteClient(id).subscribe(
      (response) => {
        this.getClients();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editClient(id: number): void {
    const dialogRef = this.dialog.open(ClientUpdateComponent, {
      width: 'auto',
      data: id,
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((updatedClient) => {
      if (updatedClient) {
        this.clientService.updateClient(id, updatedClient).subscribe(
          (client) => {
            this.getClients();
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }
}
