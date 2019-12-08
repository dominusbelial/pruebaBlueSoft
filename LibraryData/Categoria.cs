using System;
using System.Collections.Generic;

namespace LibraryData
{
    public partial class Categoria
    {
        public Categoria()
        {
            Libro = new HashSet<Libro>();
        }

        public Guid CategoriaId { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }

        public virtual ICollection<Libro> Libro { get; set; }
    }
}
