import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoriaApiService } from '../categorias-api.service';
import { Categoria } from '../_models/categoria';
import { Router } from "@angular/router";

@Component({
    selector: 'app-categorias-add',
    templateUrl: './categorias-add.component.html',
    styleUrls: ['./categorias-add.component.css']
})

export class CategoriasAddComponent implements OnInit {

    categoriaForm: FormGroup;
    constructor(private formBuilder: FormBuilder, private router: Router, private api: CategoriaApiService) { }


    ngOnInit() {
        this.categoriaForm = this.formBuilder.group({
            Nombre: ['', Validators.compose([Validators.required])],
            Descripcion: ['', Validators.compose([Validators.required])],
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

    addCategoria() {
        const payload = {
            CategoriaId: this.generateUUID(),
            Nombre: this.categoriaForm.controls.Nombre.value,
            Descripcion: this.categoriaForm.controls.Descripcion.value
        };

        this.api.addCategoria(payload)
            .subscribe(res => {
                let id = res['CategoriaId'];
                this.router.navigate(['/categorias']);
            }, (err) => {
                console.log(err);
            });
    }
}
