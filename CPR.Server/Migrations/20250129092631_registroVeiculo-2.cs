using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CPR.Server.Migrations
{
    /// <inheritdoc />
    public partial class registroVeiculo2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Combustivel",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "Data",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "DataTrocaPeca",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "DataUltimaCalibragem",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "DataUltimaRevisao",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "DataUltimaTrocaOleo",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "DataUltimoAbastecimento",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "DataUltimoBalanceamento",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "Etanol",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "LitrosAbastecido",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "MediaPorLitro",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "Observacao",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "PecasJaTrocadas",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "PecasParaTrocar",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "PrecoAbastecimento",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "PrecoGasolina",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "QuilometrosProximaTrocaOleo",
                table: "Veiculos");

            migrationBuilder.DropColumn(
                name: "QuilometrosRodados",
                table: "Veiculos");

            migrationBuilder.CreateTable(
                name: "Registros",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
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
                    Etanol = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PrecoGasolina = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Observacao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MediaPorLitro = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Combustivel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LitrosAbastecido = table.Column<int>(type: "int", nullable: false),
                    PrecoAbastecimento = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Registros", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Registros");

            migrationBuilder.AddColumn<string>(
                name: "Combustivel",
                table: "Veiculos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Data",
                table: "Veiculos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DataTrocaPeca",
                table: "Veiculos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DataUltimaCalibragem",
                table: "Veiculos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DataUltimaRevisao",
                table: "Veiculos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DataUltimaTrocaOleo",
                table: "Veiculos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DataUltimoAbastecimento",
                table: "Veiculos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DataUltimoBalanceamento",
                table: "Veiculos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Etanol",
                table: "Veiculos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LitrosAbastecido",
                table: "Veiculos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "MediaPorLitro",
                table: "Veiculos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Observacao",
                table: "Veiculos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PecasJaTrocadas",
                table: "Veiculos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PecasParaTrocar",
                table: "Veiculos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PrecoAbastecimento",
                table: "Veiculos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PrecoGasolina",
                table: "Veiculos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "QuilometrosProximaTrocaOleo",
                table: "Veiculos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "QuilometrosRodados",
                table: "Veiculos",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
