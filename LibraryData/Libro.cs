using System;
using System.Collections.Generic;

namespace LibraryData
{
    public partial class Libro
    {
        public Guid LibroId { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Isbn { get; set; }
        public Guid CategoriaId { get; set; }
        public Guid AutorId { get; set; }
        public string UserCreated { get; set; }
        public string UserModified { get; set; }
        public DateTimeOffset DateCreated { get; set; }
        public DateTimeOffset DateModified { get; set; }

        public virtual Autor Autor { get; set; }
        public virtual Categoria Categoria { get; set; }
    }
}
