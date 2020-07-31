import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../models/dialog-data.model';

@Component({
  selector: 'app-dialog',
  template: `
    <div class="dialog">
      <h1 mat-dialog-title *ngIf="data.title">{{data.title}}</h1>
      <div mat-dialog-content>
        {{data.message}}
        <ul *ngIf="data.data">
          <li *ngFor="let item of data.data">
            {{item}}
          </li>
        </ul>
      </div>
      <div mat-dialog-actions>
        <button mat-button *ngFor="let button of data.buttons" [mat-dialog-close]="button.return">{{button.title}}</button>
        <button mat-button mat-dialog-close>Cancel</button>
      </div>
    </div>
  `,
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

}
