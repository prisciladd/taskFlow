import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-delete-confirmation',
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteConfirmationComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteConfirmationComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);
/*   readonly animal = signal(''); */
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {name: this.name(), animal: this.animal()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }
}

