using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CPR.Server.Migrations
{
    /// <inheritdoc />
    public partial class nobreak_voltagem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Voltagem",
                table: "Nobreaks",
                newName: "VoltagemSaida");

            migrationBuilder.AddColumn<string>(
                name: "VoltagemEntrada",
                table: "Nobreaks",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VoltagemEntrada",
                table: "Nobreaks");

            migrationBuilder.RenameColumn(
                name: "VoltagemSaida",
                table: "Nobreaks",
                newName: "Voltagem");
        }
    }
}
