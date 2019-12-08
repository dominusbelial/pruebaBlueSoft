
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Autor } from './_models/autor';
import { environment } from '../environments/environment';

// const apiUrl = "http://localhost:57589/api/Autores";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AutorApiService {

    constructor(private http: HttpClient) { }

    getAutores(): Observable<Autor[]> {
        return this.http.get<Autor[]>(`${environment.apiUrl}/api/Autores`, httpOptions)
            .pipe(
                tap(heroes => console.log('fetched autores')),
                catchError(this.handleError('getAutores', []))
            );
    }

    getAutor(id): Observable<Autor> {
        const url = `${environment.apiUrl}/api/Autores/${id}`;
        return this.http.get<Autor>(url).pipe(
            tap(_ => console.log(`fetched autor id=${id}`)),
            catchError(this.handleError<Autor>(`getAutor id=${id}`))
        );
    }

    addAutor(autor): Observable<Autor> {

        return this.http.post<Autor>(`${environment.apiUrl}/api/Autores`, autor, httpOptions).pipe(
            tap((autor: Autor) => console.log(`added autor w/ id=${autor.AutorId}`)),
            catchError(this.handleError<Autor>('addAutor'))
        );
    }

    updateAutor(id, autor): Observable<any> {
        const url = `${environment.apiUrl}/api/Autores/${id}`;
        return this.http.put(url, autor, httpOptions).pipe(
            tap(_ => console.log(`updated autor id=${id}`)),
            catchError(this.handleError<any>('updateAutor'))
        );
    }

    deleteAutor(id): Observable<Autor> {
        const url = `${environment.apiUrl}/api/Autores/${id}`;

        return this.http.delete<Autor>(url, httpOptions).pipe(
            tap(_ => console.log(`deleted autor id=${id}`)),
            catchError(this.handleError<Autor>('deleteAutor'))
        );
    }
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
