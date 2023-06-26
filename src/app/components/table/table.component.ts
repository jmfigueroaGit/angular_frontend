import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TableColumn {
  columnDef: string;
  header: string;
  action?: boolean;
  center?: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() dataSource: any[] = [];

  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  getColumnDefs(): string[] {
    return this.columns.map((column) => column.columnDef);
  }
  editRow(row: any) {
    this.edit.emit(row);
  }

  deleteRow(row: any) {
    this.delete.emit(row);
  }
}
