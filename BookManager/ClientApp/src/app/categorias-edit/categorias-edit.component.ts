import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from "@angular/forms";
import { CategoriaApiService } from '../categorias-api.service';
import { Categoria } from '../_models/categoria';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-categorias-edit',
    templateUrl: './categorias-edit.component.html',
    styleUrls: ['./categorias-edit.component.css']
})
export class CategoriasEditComponent implements OnInit {

    categoriaForm : FormGroup
    id: string = null;

    constructor(
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private api: CategoriaApiService
    ) { }

    ngOnInit() {

        this.getDetail(this.activatedRoute.snapshot.params['id']);

        this.categoriaForm = this.formBuilder.group({
            CategoriaId: ['', Validators.compose([Validators.required])],
            Nombre: ['', Validators.compose([Validators.required])],
            Descripcion: ['', Validators.compose([Validators.required])],
        });
    }

    getDetail(id) {
        this.api.getCategoria(id)
            .subscribe(data => {
                this.id = data.CategoriaId;
                this.categoriaForm.setValue({
                    CategoriaId: this.id,
                    Nombre: data.Nombre,
                    Descripcion: data.Descripcion
                });
                console.log(data);
            });
    }
    updateCategoria(form: NgForm) {

        this.api.updateCategoria(this.id, form)
            .subscribe(res => {
                this.router.navigate(['/categorias']);
            }, (err) => {
                console.log(err);
            }
            );

    }

}
