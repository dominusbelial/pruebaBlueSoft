import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AuthGuard } from './_helpers/auth.guard';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { AutoresComponent } from './autores/autores.component';
import { CategoriasAddComponent } from './categorias-add/categorias-add.component';
import { CategoriasEditComponent } from './categorias-edit/categorias-edit.component';
import { AutoresEditComponent } from './autores-edit/autores-edit.component';
import { AutoresAddComponent } from './autores-add/autores-add.component';
import { LibrosComponent } from './libros/libros.component';
import { LibrosAddComponent } from './libros-add/libros-add.component';
import { LibrosEditComponent } from './libros-edit/libros-edit.component';

const routes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    // { path: 'counter', component: CounterComponent, canActivate: [AuthGuard] },
    // { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard] },
    // { path: 'categorias', component: CategoriasComponent, canActivate: [AuthGuard] },
    {
        path: 'categorias',
        component: CategoriasComponent, canActivate: [AuthGuard],
        data: { title: 'Lista de Categorias' }
    },
    {
        path: 'categorias/add',
        component: CategoriasAddComponent, canActivate: [AuthGuard],
        data: { title: 'Agregar Categorias' }
    },
    {
        path: 'categorias/edit/:id',
        component: CategoriasEditComponent, canActivate: [AuthGuard],
        data: { title: 'Editar Categorias' }
    },
    {
        path: 'autores',
        component: AutoresComponent, canActivate: [AuthGuard],
        data: { title: 'Lista de Autores' }
    },
    {
        path: 'autores/add',
        component: AutoresAddComponent, canActivate: [AuthGuard],
        data: { title: 'Agregar Autores' }
    },
    {
        path: 'autores/edit/:id',
        component: AutoresEditComponent, canActivate: [AuthGuard],
        data: { title: 'Editar Autores' }
    },
    {
        path: 'libros',
        component: LibrosComponent, canActivate: [AuthGuard],
        data: { title: 'Lista de Libros' }
    },
    {
        path: 'libros/add',
        component: LibrosAddComponent, canActivate: [AuthGuard],
        data: { title: 'Agregar Autores' }
    },
    {
        path: 'libros/edit/:id',
        component: LibrosEditComponent, canActivate: [AuthGuard],
        data: { title: 'Editar Autores' }
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    CategoriasComponent,
    AutoresComponent,
    CategoriasAddComponent,
    CategoriasEditComponent,
    AutoresEditComponent,
    AutoresAddComponent,
    LibrosComponent,
    LibrosAddComponent,
    LibrosEditComponent
  ],
    imports: [
    // CommonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    TypeaheadModule.forRoot(),
    BrowserAnimationsModule
    //RouterModule.forRoot([
    //  { path: '', component: HomeComponent, pathMatch: 'full' },
    //  { path: 'counter', component: CounterComponent },
    //  { path: 'fetch-data', component: FetchDataComponent },
    //  // { path: 'login', component: LoginComponent },
    //])
  ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
