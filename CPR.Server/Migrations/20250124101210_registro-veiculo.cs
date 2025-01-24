using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CPR.Server.Migrations
{
    /// <inheritdoc />
    public partial class registroveiculo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            
            migrationBuilder.CreateTable(
                name: "Veiculos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Data = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataUltimaRevisao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataUltimoAbastecimento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataUltimaTrocaOleo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataUltimaCalibragem = table.Column<DateTime>(type: "datetime2", nullable: false),
                    QuilometrosRodados = table.Column<int>(type: "int", nullable: false),
                    QuilometrosProximaTrocaOleo = table.Column<int>(type: "int", nullable: false),
                    DataUltimoBalanceamento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PecasJaTrocadas = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PecasParaTrocar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataTrocaPeca = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modelo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Etanol = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PrecoGasolina = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Placa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Observacao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ano = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Renavan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MediaPorLitro = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Combustivel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LitrosAbastecido = table.Column<int>(type: "int", nullable: false),
                    PrecoAbastecimento = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Veiculos", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropTable(
                name: "Veiculos");
        }
    }
}
