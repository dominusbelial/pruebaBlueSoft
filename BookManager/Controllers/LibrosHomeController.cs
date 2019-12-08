using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNet.OData;

namespace BookManager.Controllers
{
    [Authorize]
    public class LibrosHomeController : Controller
    {
        private readonly BookLibraryContext _context;

        public LibrosHomeController(BookLibraryContext context)
        {
            _context = context;
        }

        [Route("LibrosHome/Get/{search}")]
        [HttpGet]
        public IEnumerable<Libro> Get(string search = "")
        {
            return _context.Libro.Include(i => i.Autor).Include(i => i.Categoria).AsEnumerable().Where(v=> v.Nombre.Contains(search) || v.Autor.Nombre.Contains(search) || v.Categoria.Nombre.Contains(search));
        }
    }
}