import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TransactionsService } from '../main-panel/pages/transactions/services/transactions.service';

interface ConfirmDeleteDialogData {
  description: string;
  id: string;
}

@Component({
  selector: 'app-delete-confirmation',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteConfirmationComponent {

  readonly dialogRef = inject(MatDialogRef<DeleteConfirmationComponent>);
  private readonly transactionsService = inject(TransactionsService);
  readonly data = inject<ConfirmDeleteDialogData>(MAT_DIALOG_DATA);
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  confirmDelete(confirm?: boolean): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.dialogRef.close(confirm);
    
    this.transactionsService.deleteTransaction(this.data.id).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Erro ao excluir transação:', err);
        this.errorMessage.set('Ocorreu um erro ao excluir a transação.');
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed',result);
    });
  }
}
