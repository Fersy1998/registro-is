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
  
  public archivos: any = [];
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
    ID: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required)
    
  });
}
  ngOnInit(): void {
  }
  subirImagen(id:any){
    try {
      this.loading = true;
      this.body = { 
        file: this.image,
        id: id
        }
      this.loginService.subir(this.body)
        .subscribe(res => {
          this.loading = false;
          console.log("Esto se envia: ", this.image);
          Swal.fire('¡Bien!', res.message, 'success');
          this.router.navigateByUrl('/paciente/perfil');
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
            this.router.navigate(['/']);
          } else {
            console.log(data);
            Swal.fire('¡Bien!', 'Te hemos enviado correo para validar tu cuenta', 'success');
            this.subirImagen(data.items._id);
          }
        },
        error => { Swal.fire('¡Rayos!', 'Estamos problemas con el servidor', 'error');
        console.log(error); }
      )
    console.log(JSON.stringify(this.reactiveForm.value));
    }
    
  
  capturarFile(event: any) {
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.image = imagen.base;
    })
    this.archivos.push(this.image);
  console.log(this.archivos);
}


extraerBase64 = async ($event: any) => new Promise((resolve) => {
  try {
    const unsafeImg = window.URL.createObjectURL($event);
    const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
    const reader = new FileReader();
    reader.readAsDataURL($event);
    reader.onload = () => {
      resolve({
        base: reader.result
      });
    };
    reader.onerror = error => {
      resolve({
        base: null
      });
    };
    return resolve;
  } catch (e) {
    return null;
  }
})

}

