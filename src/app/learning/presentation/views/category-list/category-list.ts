import {AfterViewChecked, Component, computed, inject, ViewChild} from '@angular/core';
import {LearningStore} from '../../../application/learning.store';
import {Router} from '@angular/router';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatFooterCell,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'app-category-list',
  imports: [
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatSortHeader,
    TranslatePipe,
    MatCell,
    MatCellDef,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatPaginator,
    MatButton
  ],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList implements AfterViewChecked {
 readonly store = inject(LearningStore);
 protected router = inject(Router);

 displayedColumns: string[] = ['id', 'name', 'actions'];

 @ViewChild(MatSort) sort!: MatSort;
 @ViewChild(MatPaginator) paginator!: MatPaginator;

 datasource = computed(() => {
   const source = new MatTableDataSource(this.store.categories());
   source.sort = this.sort;
   source.paginator = this.paginator;
   return source;
 });

 editCategory(id: number) {
   this.router.navigate(['learning/categories', id, 'edit']).then();
 }

 deleteCategory(id: number) {
   this.store.deleteCategory(id);
 }

 navigateToNew() {
   this.router.navigate(['learning/categories/new']).then();
 }

 ngAfterViewChecked() {
   if (this.datasource().paginator !== this.paginator) {
     this.datasource().paginator = this.paginator;
   }
   if (this.datasource().sort !== this.sort) {
     this.datasource().sort = this.sort;
   }
 }



}
