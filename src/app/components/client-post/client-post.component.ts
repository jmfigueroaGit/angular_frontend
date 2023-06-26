import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '@components/snack-bar/snack-bar.component';
import { ClientListComponent } from '@components/client-list/client-list.component';
import { ClientService } from '@services/client.service';
import { Client } from '@models/client.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-client-post',
  templateUrl: './client-post.component.html',
  styleUrls: ['./client-post.component.scss'],
})
export class ClientPostComponent implements OnInit {
  clientForm!: FormGroup;
  formSubmitted = false;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private dialog: MatDialog,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      department: ['', Validators.required],
      notes: [''],
    });
  }
  openModal(): void {
    this.dialog.open(ClientListComponent, {
      width: 'auto',
    });
  }

  openSnackBar(): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

  submitForm(): void {
    // Handle form submission logic here
    if (this.clientForm.valid) {
      this.createClient(this.clientForm.value);
    }
  }

  createClient(client: Client): void {
    this.clientService.createClient(client).subscribe(
      (client) => {
        this.openSnackBar();
        this.formSubmitted = true;
        this.clientForm.reset();
        this.formSubmitted = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
