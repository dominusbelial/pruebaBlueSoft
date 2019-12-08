using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace LibraryData.Migrations
{
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
            table: "Categoria",
            columns: new[] { "CategoriaId", "Nombre", "Descripcion" },
            values: new object[] { Guid.NewGuid(), "Misterio", "Accion, Terror, Horror, Suspenso" });

            migrationBuilder.InsertData(
            table: "Autor",
            columns: new[] { "AutorId", "Nombre", "Apellidos", "FechaNacimiento" },
            values: new object[] { Guid.NewGuid(), "Gabriel", "Garcia Marquez", DateTime.Now });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
