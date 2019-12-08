using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace LibraryData.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
            name: "Libro",
            columns: table => new
            {
                LibroId = table.Column<Guid>(nullable: false),
                Nombre = table.Column<string>(maxLength: 150, nullable: false),
                Descripcion = table.Column<string>(maxLength: 150, nullable: false),
                ISBN = table.Column<string>(maxLength: 150, nullable: false),
                CategoriaId = table.Column<Guid>(nullable: false),
                AutorId = table.Column<Guid>(nullable: false),
                UserCreated = table.Column<string>(maxLength: 150, nullable: false),
                UserModified = table.Column<string>(maxLength: 150, nullable: false),
                DateCreated = table.Column<DateTimeOffset>(nullable: false),
                DateModified = table.Column<DateTimeOffset>(nullable: false),
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Libro", x => x.LibroId);
            });

            migrationBuilder.CreateTable(
            name: "Categoria",
            columns: table => new
            {
                CategoriaId = table.Column<Guid>(nullable: false),
                Nombre = table.Column<string>(maxLength: 150, nullable: false),
                Descripcion = table.Column<string>(maxLength: 150, nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Categoria", x => x.CategoriaId);
            });

            migrationBuilder.CreateTable(
            name: "Autor",
            columns: table => new
            {
                AutorId = table.Column<Guid>(nullable: false),
                Nombre = table.Column<string>(maxLength: 150, nullable: false),
                Apellidos = table.Column<string>(maxLength: 150, nullable: false),
                FechaNacimiento = table.Column<DateTime>(nullable: false),
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Autor", x => x.AutorId);
            });

            migrationBuilder.AddForeignKey(
            name: "FK_Categorias_Libro_CategoriaId",
            table: "Libro",
            column: "CategoriaId",
            principalTable: "Categoria",
            principalColumn: "CategoriaId",
            onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
            name: "FK_Autores_Libro_AutorId",
            table: "Libro",
            column: "AutorId",
            principalTable: "Autor",
            principalColumn: "AutorId",
            onDelete: ReferentialAction.NoAction);
        }
    }
}
