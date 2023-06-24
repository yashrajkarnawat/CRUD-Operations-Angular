import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AddProductFormComponent } from '../add-product-form/add-product-form.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'category', 'date', 'condition', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  openDialog(){
    this.dialog.open(AddProductFormComponent, {
      width: '40%',
      disableClose: true
    }).afterClosed().subscribe((val)=>{
      if(val === 'Add'){
        this.getAllData();
      }
    });
  }

  getAllData(){
    this.api.getProductData().subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:()=>{
        alert("Error in fetching the data!!");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any){
    this.dialog.open(AddProductFormComponent, {
      width: '40%',
      // disableClose: true,
      data: row,
    }).afterClosed().subscribe((val)=>{
      if(val === 'update'){
        this.getAllData();
      }
    });
  }

  deleteProduct(id:number){
    this.api.deleteProduct(id).subscribe({
      next:(res)=>{
        alert("Product Deleted suceesfully");
        this.getAllData();
      },
      error:()=>{
        alert("Error whlie deleting the record");
      }
    })
  }
}


