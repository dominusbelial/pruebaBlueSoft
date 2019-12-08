import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from "@angular/forms";
import { LibroApiService } from '../libros-api.service';
import { AutorApiService } from '../autores-api.service';
import { CategoriaApiService } from '../categorias-api.service';
import { Categoria } from '../_models/categoria';
import { Autor } from '../_models/autor';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-libros-edit',
    templateUrl: './libros-edit.component.html',
    styleUrls: ['./libros-edit.component.css']
})
export class LibrosEditComponent implements OnInit {

    libroForm: FormGroup;
    id: string = null;
    dataAutor: Autor[] = [];
    dataCategoria: Categoria[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private api: LibroApiService,
        private apiAutor: AutorApiService,
        private apiCategoria: CategoriaApiService
    ) { }

    ngOnInit() {

        this.getDetail(this.activatedRoute.snapshot.params['id']);

        this.libroForm = this.formBuilder.group({
            LibroId: ['', Validators.compose([Validators.required])],
            Nombre: ['', Validators.compose([Validators.required])],
            Descripcion: ['', Validators.compose([Validators.required])],
            Isbn: ['', Validators.compose([Validators.required])],
            AutorId: ['', Validators.compose([Validators.required])],
            CategoriaId: ['', Validators.compose([Validators.required])],
            UserCreated: ['', Validators.compose([Validators.required])],
            UserModified: ['', Validators.compose([Validators.required])],
            DateCreated: ['', Validators.compose([Validators.required])],
            DateModified: ['', Validators.compose([Validators.required])],
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

    getDetail(id) {
        this.api.getLibro(id)
            .subscribe(data => {
                this.id = data.LibroId;
                this.libroForm.setValue({
                    LibroId: this.id,
                    Nombre: data.Nombre,
                    Descripcion: data.Descripcion,
                    Isbn: data.Isbn,
                    AutorId: data.AutorId,
                    CategoriaId: data.CategoriaId,
                    UserCreated: data.UserCreated,
                    UserModified: data.UserModified,
                    DateCreated: data.DateCreated,
                    DateModified: data.DateModified,
                });
                console.log(data);
            });
    }
    updateLibro(form: NgForm) {

        this.api.updateLibro(this.id, form)
            .subscribe(res => {
                this.router.navigate(['/libros']);
            }, (err) => {
                console.log(err);
            }
            );

    }

}
