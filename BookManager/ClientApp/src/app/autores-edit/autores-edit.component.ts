import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from "@angular/forms";
import { AutorApiService } from '../autores-api.service';
import { Autor } from '../_models/autor';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-autores-edit',
    templateUrl: './autores-edit.component.html',
    styleUrls: ['./autores-edit.component.css']
})
export class AutoresEditComponent implements OnInit {

    autorForm: FormGroup
    id: string = null;

    constructor(
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private api: AutorApiService
    ) { }

    ngOnInit() {

        this.getDetail(this.activatedRoute.snapshot.params['id']);

        this.autorForm = this.formBuilder.group({
            AutorId: ['', Validators.compose([Validators.required])],
            Nombre: ['', Validators.compose([Validators.required])],
            Apellidos: ['', Validators.compose([Validators.required])],
            FechaNacimiento: ['', Validators.compose([Validators.required])],
        });
    }

    getDetail(id) {
        this.api.getAutor(id)
            .subscribe(data => {
                this.id = data.AutorId;
                this.autorForm.setValue({
                    AutorId: this.id,
                    Nombre: data.Nombre,
                    Apellidos: data.Apellidos,
                    FechaNacimiento: data.FechaNacimiento.substring(0, 10),
                });
                console.log(data);
            });
    }
    updateAutor(form: NgForm) {

        this.api.updateAutor(this.id, form)
            .subscribe(res => {
                this.router.navigate(['/autores']);
            }, (err) => {
                console.log(err);
            }
            );

    }

}
