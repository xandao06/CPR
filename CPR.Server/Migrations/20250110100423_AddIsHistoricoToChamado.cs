using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CPR.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddIsHistoricoToChamado : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsHistorico",
                table: "Chamados",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsHistorico",
                table: "Chamados");
        }
    }
}
