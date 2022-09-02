﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using pmsbackend.Models;

namespace pmsbackend.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20220803061544_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.17")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("persons", b =>
                {
                    b.Property<int>("personId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("personBirthTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("personCompany")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("personFullname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("personState")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("personTC")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("personTitle")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("personId");

                    b.ToTable("Persons");
                });

            modelBuilder.Entity("pmsbackend.Models.auths", b =>
                {
                    b.Property<int>("authId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("authDeger")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("authDesc")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("company")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("authId");

                    b.ToTable("Auths");
                });
#pragma warning restore 612, 618
        }
    }
}
