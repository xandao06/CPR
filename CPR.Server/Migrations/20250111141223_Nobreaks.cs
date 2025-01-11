using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CPR.Server.Migrations
{
    /// <inheritdoc />
    public partial class Nobreaks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Nobreaks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataTroca = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataProximaTroca = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Marca = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modelo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NumeroSerie = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cliente = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Descricao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Bateria = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuantidadeBateria = table.Column<int>(type: "int", nullable: false),
                    Voltagem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Capacidade = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Funcao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrdemServico = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nobreaks", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Nobreaks");
        }
    }
}
