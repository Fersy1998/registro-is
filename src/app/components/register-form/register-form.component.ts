import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { DomSanitizer } from '@angular/platform-browser';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent{
  
  public image = '';
  public body = {};
  reactiveForm: FormGroup;
  
  public loading!: boolean;
  hide=true;
  hideC=true;
constructor(private formBuilder: FormBuilder, private loginService:LoginService, private router:Router, private sanitizer: DomSanitizer,) {
  this.reactiveForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required, Validators.pattern('^[^@]+@[^@]+\.[a-zA-Z]{2,}$')]),
    ID: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]+$')]),
    birthDate: new FormControl('', Validators.required)
    
  });
}
  ngOnInit(): void {
  }
  subirImagen(id:any){
  /*
    const formData = new FormData();
    formData.append('file', this.image);
    formData.append('id', id);*/
    const formData = new FormData();
    formData.append('file',  this.image);
    formData.append('id', id)
   
    try {
      this.loading = true;
      
      this.loginService.subir(formData)
        .subscribe(res => {
          this.loading = false;
          Swal.fire('¡Imagen subida!', res.message, 'success');
          console.log('Respuesta del servidor', res);

        }, () => {
          this.loading = false;
          alert('Error');
        })
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);

    }
  }
  signUp(){
    
    
    this.loginService.datos(JSON.parse(JSON.stringify(this.reactiveForm.value)))
      .subscribe(
        data => {
          if (data._err) {
            Swal.fire('Ups', data.message, 'error');
          } else {
            console.log(data);
            Swal.fire('¡Ya casi!', 'Te hemos enviado correo para validar tu cuenta', 'success');
            console.log(data._id);
            this.subirImagen(data._id);
          }
        },
        error => { Swal.fire('Error', 'Tenemos problemas con el servidor', 'error');
        console.log(error); }
      )
    console.log(JSON.stringify(this.reactiveForm.value));
    }
    
  
  capturarFile(event: any) {
    this.image=event.target.files[0]
    
}

}

