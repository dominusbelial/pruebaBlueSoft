# Prueba BlueSoft

Aplicacion de control de libros

## Getting Started

Clone el repositorio en una carpeta Windows.

### Prerequisites

Vs2019, Sql Server (ejemplo con Docker).

### Installing

1. Abra la solucion BookManager y reconstruyala.
2. instale las dependencias del ClientApp

```
npm install
npm run build
```

3. Instale Sql Server

```
docker pull mcr.microsoft.com/mssql/server:2019-GA-ubuntu-16.04
docker run -d -p 1433:1433 --name mainlibrary -e MSSQL_SA_PASSWORD=Abc123 -e ACCEPT_EULA=Y mcr.microsoft.com/mssql/server:2019-GA-ubuntu-16.04
```

4. Cree una base de datos vacia en el servidor sql mainlibrary con el nombre "BookLibrary"

## Ejecute la Migracion.
```
LibraryData> dotnet ef database update --startup-project "../BookManager" --context LibraryDbContext
```
5. Para acceder a la aplicacion existes 2 usuario en memoria (test,admin), usan la misma clave (test).
