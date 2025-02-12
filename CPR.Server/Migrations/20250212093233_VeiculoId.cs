using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CPR.Server.Migrations
{
    /// <inheritdoc />
    public partial class VeiculoId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VeiculoId",
                table: "Registros",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VeiculoId",
                table: "Registros");
        }
    }
}
