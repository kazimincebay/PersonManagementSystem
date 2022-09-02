using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace pmsbackend.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Auths",
                columns: table => new
                {
                    authId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    authDesc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    company = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    authDeger = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Auths", x => x.authId);
                });

            migrationBuilder.CreateTable(
                name: "Persons",
                columns: table => new
                {
                    personId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    personTC = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    personFullname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    personTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    personBirthTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    personCompany = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    personState = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persons", x => x.personId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Auths");

            migrationBuilder.DropTable(
                name: "Persons");
        }
    }
}
