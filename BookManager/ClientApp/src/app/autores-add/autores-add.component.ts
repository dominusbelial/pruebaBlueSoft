import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AutorApiService } from '../autores-api.service';
import { Autor } from '../_models/autor';
import { Router } from "@angular/router";

@Component({
    selector: 'app-autores-add',
    templateUrl: './autores-add.component.html',
    styleUrls: ['./autores-add.component.css']
})

export class AutoresAddComponent implements OnInit {

    autorForm: FormGroup;
    constructor(private formBuilder: FormBuilder, private router: Router, private api: AutorApiService) { }


    ngOnInit() {
        this.autorForm = this.formBuilder.group({
            Nombre: ['', Validators.compose([Validators.required])],
            Apellidos: ['', Validators.compose([Validators.required])],
            FechaNacimiento: ['', Validators.compose([Validators.required])]
        });
    }

    generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if (d > 0) {//Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    addAutor() {
        const payload = {
            AutorId: this.generateUUID(),
            Nombre: this.autorForm.controls.Nombre.value,
            Apellidos: this.autorForm.controls.Apellidos.value,
            FechaNacimiento: this.autorForm.controls.FechaNacimiento.value
        };

        this.api.addAutor(payload)
            .subscribe(res => {
                let id = res['AutorId'];
                this.router.navigate(['/autores']);
            }, (err) => {
                console.log(err);
            });
    }
}
