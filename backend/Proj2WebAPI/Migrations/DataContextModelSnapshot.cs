﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Proj2WebAPI.Data;

#nullable disable

namespace Proj2WebAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("aspAPI.models.Customer", b =>
            {
                b.Property<int>("customerID")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("customerID"));

                b.Property<string>("customerAddress")
                    .IsRequired()
                    .HasColumnType("nvarchar(max)");

                b.Property<string>("customerName")
                    .IsRequired()
                    .HasColumnType("nvarchar(max)");

                b.Property<string>("customerSurname")
                    .IsRequired()
                    .HasColumnType("nvarchar(max)");

                b.HasKey("customerID");

                b.ToTable("Customers");
            });

            modelBuilder.Entity("aspAPI.models.Job", b =>
            {
                b.Property<int>("jobID")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("jobID"));

                b.Property<int>("customerID")
                    .HasColumnType("int");

                b.Property<string>("details")
                    .IsRequired()
                    .HasColumnType("nvarchar(max)");

                b.Property<string>("jobPriority")
                    .IsRequired()
                    .HasColumnType("nvarchar(max)");

                b.Property<string>("jobStatus")
                    .IsRequired()
                    .HasColumnType("nvarchar(max)");

                b.HasKey("jobID");

                b.HasIndex("customerID");

                b.ToTable("Jobs");
            });

            modelBuilder.Entity("aspAPI.models.Job", b =>
            {
                b.HasOne("aspAPI.models.Customer", "Customer")
                    .WithMany("Jobs")
                    .HasForeignKey("customerID")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Customer");
            });

            modelBuilder.Entity("aspAPI.models.Customer", b =>
            {
                b.Navigation("Jobs");
            });
#pragma warning restore 612, 618
        }
    }
}
