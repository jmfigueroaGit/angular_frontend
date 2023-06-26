import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '@services/client.service';
import { Client } from '@models/client.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.scss'],
})
export class ClientUpdateComponent implements OnInit {
  clientForm: FormGroup;
  formSubmitted: boolean = false;
  client: Client = {} as Client;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ClientUpdateComponent>,
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.clientForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      department: ['', Validators.required],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.getClient();
  }

  getClient(): void {
    this.clientService.getClientById(this.data).subscribe(
      (client) => {
        this.client = client;
        this.clientForm = this.formBuilder.group({
          first_name: [client.first_name],
          last_name: [client.last_name],
          department: [client.department],
          notes: [client.notes],
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.clientForm.get(fieldName);
    return control ? control.invalid && control.touched : false;
  }

  update() {
    this.formSubmitted = true;

    if (this.clientForm.valid) {
      this.dialogRef.close(this.clientForm.value);
    } else {
      console.log('Invalid form');
    }
  }
}
