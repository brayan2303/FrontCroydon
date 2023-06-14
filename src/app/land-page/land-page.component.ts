import { Component, OnInit } from '@angular/core';
import { CharacteresService } from './service/characters.service';
import { CharacteresDto } from './dto/characteres.dto';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../registre/modal/edit.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css']
})
export class LandPageComponent implements OnInit{

  characteresDto:CharacteresDto[]
  constructor(private characteresS: CharacteresService, private dialog: MatDialog ){
    this.characteresDto = [];
  }

  ngOnInit(): void {
    this.list();
  
}

list(){
  this.characteresS.list().subscribe( res => {
    if(res.message === 'OK'){
      this.characteresDto = res.object;
      console.log(this.characteresDto)
    }else{
      console.log(res.message);
    }
  })
}


edit(value: number) {
  console.log(value);
  const dialogRef = this.dialog.open(EditComponent, {
      data: { formId: value }
  });
  dialogRef.afterClosed().subscribe(resA => {
    this.list();
   } );
}

delete(value:number){
  Swal.fire({
    title: 'Seguro desea eliminar?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    denyButtonText: `No eliminar`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Eliminado!', '', 'success')
      this.characteresS.delete(value).subscribe( res => {
        if(res.message === 'Borrado exitoso'){
          this.list();
        }else{
          console.log(res.message);
        }
      })
    } else if (result.isDenied) {
      Swal.fire('No se hubieron cambios', '', 'info')
    }
  })




}

}
