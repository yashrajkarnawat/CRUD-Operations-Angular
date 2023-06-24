import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss']
})
export class AddProductFormComponent implements OnInit {

  productForm !: FormGroup;

  conditionList = ["New", "Second Hand", "Refurbished"]
  buttonNmae: string = "Add"

  constructor(
    private fb:FormBuilder,
    private api:ApiService,
    private dailogRef: MatDialogRef<AddProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any,
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName : ['', Validators.required],
      category : ['', Validators.required],
      condition : ['', Validators.required],
      price : ['', Validators.required],
      comment : ['', Validators.required],
      date : ['', Validators.required],
    })

    console.log(this.editData);
    if(this.editData){
      this.buttonNmae = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['condition'].setValue(this.editData.condition);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }

  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProductData(this.productForm.value).subscribe({
          next:(res)=>{
            console.log(this.productForm.value);
            alert("Product Added Successfully");
            this.productForm.reset();
            this.dailogRef.close('Add');
          },
          error:()=>{
            alert("Error Data not Added!!");
          }
        });
      }
      else{
        alert("Error!!");
        return
      }
    }
    else{
      this.updateData();
    }
  }

  updateData(){
    this.api.updateProduct(this.productForm.value, this.editData.id).subscribe({
      next:(res)=>{
        alert("Product Updated Succesfully");
        this.productForm.reset();
        this.dailogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the data!!");
      }
    })
  }
}
