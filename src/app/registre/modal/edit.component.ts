import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CharacteresService } from '../service/characters.service';
import { CharacteresDto } from '../dto/characteres.dto';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit',
  templateUrl:'./edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form!: FormGroup;
  formId!: number;
  title:string;
  characteresDto!:CharacteresDto;
  status:boolean;
  @Output() closeDialog = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private characteresS: CharacteresService,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.title = "";
    this.status=false;
    dialogRef.disableClose = true;

  }

  ngOnInit(): void {
    this.formBuilders();
    this.formId = this.data.formId;
    if(this.formId != 0){
      this.title="Editar Registro";
      this.characteresS.findById(this.formId).subscribe(res=>{
        if(res.message==='OK'){
          this.characteresDto=res.object;
          this.form.setValue(
            {
              'id':this.characteresDto.id,
              'name':this.characteresDto.name,
              'tvShow':this.characteresDto.tvShow,
              'disneyApiId':this.characteresDto.disneyApiId,
              'url':this.characteresDto.url
        
            }
          );
        }else{
          console.log(res.message,'error');
        }
      });
    }else{
      this.title="Nuevo registro";
    }
  }
    

    formBuilders(){
      this.form= this.fb.group({
        id: [,[]],
        name:[,[Validators.required]],
        tvShow:[,[Validators.required]],
        disneyApiId:[,[Validators.required]],
        url:[,[Validators.required]],
        //[,[Validators.required]],
      })
  
    }


    save() {
      if(this.formId===0){
        this.form.markAllAsTouched();
        if (this.form.invalid) {
          return;
        }
        this.characteresS.save(this.form.value).subscribe(res=>{
          if(res.message==='OK'){
            if(res.object !=0){
              console.log('Registro creado!');
              this.closeDialog.emit();
              this.form.reset();
            }else{
              console.log(res.message,'error');
            }
          }else{
            console.log(res.message,'error');
          }        
        });
      }else{
        this.characteresS.editar(this.form.value).subscribe(res=>{
          console.log(this.form.value);
          if(res.message==='OK'){
            console.log(res.message);
            if(res.object !=0){
              console.log('Registro actualizado!');
              this.form.setValue({
                'id': 0,
                'name': '',
                'tvShow': '',
                'disneyApiId': 0,
                'url': ''
              });
              
              this.onClose()
              this.closeDialog.emit();
              this.form.reset();
              Swal.fire(
                'Actualizacion!',
                'El registro fue actualizado con exito',
                'success'
              )
            }else{
              console.log(res.message,'error');
              Swal.fire(
                'Error!',
                res.message,
                'error'
              )
            }
          }else{
            console.log(res.message,'error');
          }        
        },err =>{
          console.log(err.message)
        }
        );
      }       
    }

    onClose(){
      this.status=true;
      this.dialogRef.close(this.status);
  }


}