using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace LibraryData
{
    public partial class BookLibraryContext : DbContext
    {
        public BookLibraryContext()
        {
        }

        public BookLibraryContext(DbContextOptions<BookLibraryContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Autor> Autor { get; set; }
        public virtual DbSet<Categoria> Categoria { get; set; }
        public virtual DbSet<Libro> Libro { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.;Database=BookLibrary;User Id=sa;Password=791120Gustavo;MultipleActiveResultSets=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Autor>(entity =>
            {
                entity.Property(e => e.AutorId).ValueGeneratedNever();

                entity.Property(e => e.Apellidos)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(150);
            });

            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.Property(e => e.CategoriaId).ValueGeneratedNever();

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(150);
            });

            modelBuilder.Entity<Libro>(entity =>
            {
                entity.Property(e => e.LibroId).ValueGeneratedNever();

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.Isbn)
                    .IsRequired()
                    .HasColumnName("ISBN")
                    .HasMaxLength(150);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.UserCreated)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.UserModified)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasOne(d => d.Autor)
                    .WithMany(p => p.Libro)
                    .HasForeignKey(d => d.AutorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Autores_Libro_AutorId");

                entity.HasOne(d => d.Categoria)
                    .WithMany(p => p.Libro)
                    .HasForeignKey(d => d.CategoriaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Categorias_Libro_CategoriaId");
            });
        }
    }
}
