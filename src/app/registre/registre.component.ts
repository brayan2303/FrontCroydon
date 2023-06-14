import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CharacteresService } from './service/characters.service';
import { CharacteresDto } from './dto/characteres.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent implements OnInit{
  form!: FormGroup;
  @Input() formId: number;
  title:string;
  characteresDto!:CharacteresDto;
  constructor(private fb: FormBuilder, private characteresS: CharacteresService ){
    this.formId = 0;
    this.title = ""; 
  }

  ngOnInit(): void {
    this.formBuilders();

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
              'active':this.characteresDto.disneyApiId,
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
              Swal.fire(
                'Registro!',
                'El registro fue creado con exito',
                'success'
              )
              this.form.reset();
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
        });
      }else{
        this.characteresS.editar(this.form.value).subscribe(res=>{
          if(res.message==='OK'){
            if(res.object !=0){
              console.log('Registro actualizado!');
              this.form.setValue({
                'id': 0,
                'name': '',
                'tvShow': '',
                'disneyApiId': 0,
                'url': ''
              });
              this.form.reset();
            }else{
              console.log(res.message,'error');
            }
          }else{
            console.log(res.message,'error');
          }        
        });
      }       
    }
}
