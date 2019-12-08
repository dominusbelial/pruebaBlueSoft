import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LibroApiService } from '../libros-api.service';
import { AutorApiService } from '../autores-api.service';
import { CategoriaApiService } from '../categorias-api.service';

import { Libro } from '../_models/libro';
import { Autor } from '../_models/autor';
import { Categoria } from '../_models/categoria';

import { Router } from "@angular/router";

@Component({
    selector: 'app-libros-add',
    templateUrl: './libros-add.component.html',
    styleUrls: ['./libros-add.component.css']
})
export class LibrosAddComponent implements OnInit {
    dataAutor: Autor[] = [];
    dataCategoria: Categoria[] = [];
    selectedAutor: object;
    selected: string;
    libroForm: FormGroup;
    constructor(private formBuilder: FormBuilder, private router: Router, private api: LibroApiService, private apiAutor: AutorApiService, private apiCategoria: CategoriaApiService) { }


    ngOnInit() {
        this.libroForm = this.formBuilder.group({
            Nombre: ['', Validators.compose([Validators.required])],
            Descripcion: ['', Validators.compose([Validators.required])],
            Isbn: ['', Validators.compose([Validators.required])],
            AutorId: ['', Validators.compose([Validators.required])],
            CategoriaId: ['', Validators.compose([Validators.required])]
        });
        this.apiAutor.getAutores()
            .subscribe(res => {
                this.dataAutor = res;
            }, err => {
                console.log(err);
            });
        this.apiCategoria.getCategorias()
            .subscribe(res => {
                this.dataCategoria = res;
            }, err => {
                console.log(err);
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

    addLibro() {
        let myUser = JSON.parse(localStorage.getItem('currentUser'));
        const payload = {
            LibroId: this.generateUUID(),
            Nombre: this.libroForm.controls.Nombre.value,
            Descripcion: this.libroForm.controls.Descripcion.value,
            Isbn: this.libroForm.controls.Isbn.value,
            AutorId: this.libroForm.controls.AutorId.value,
            CategoriaId: this.libroForm.controls.CategoriaId.value,
            UserCreated: myUser.username,
            UserModified: myUser.username,
            DateCreated: new Date(),
            DateModified: new Date()
        };

        this.api.addLibro(payload)
            .subscribe(res => {
                let id = res['LibroId'];
                this.router.navigate(['/libros']);
            }, (err) => {
                console.log(err);
            });
    }
}
