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
    [Route("api/[controller]")]
    [ApiController]
    public class LibrosController : ControllerBase
    {
        private readonly BookLibraryContext _context;

        public LibrosController(BookLibraryContext context)
        {
            _context = context;
        }

        // GET: api/Libros
        [EnableQuery]
        [HttpGet]
        public IQueryable<Libro> GetLibro()
        {
            return  _context.Libro.Include(i=>i.Autor).Include(i => i.Categoria).AsQueryable();
        }

        // GET: api/Libros/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Libro>> GetLibro(Guid id)
        {
            var libro = await _context.Libro.FindAsync(id);

            if (libro == null)
            {
                return NotFound();
            }

            return libro;
        }

        // PUT: api/Libros/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLibro(Guid id, Libro libro)
        {
            if (id != libro.LibroId)
            {
                return BadRequest();
            }
            libro.DateModified = DateTime.Now;
            libro.UserModified = User.Identity.Name;
            _context.Entry(libro).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LibroExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Libros
        [HttpPost]
        public async Task<ActionResult<Libro>> PostLibro(Libro libro)
        {
            _context.Libro.Add(libro);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LibroExists(libro.LibroId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLibro", new { id = libro.LibroId }, libro);
        }

        // DELETE: api/Libros/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Libro>> DeleteLibro(Guid id)
        {
            var libro = await _context.Libro.FindAsync(id);
            if (libro == null)
            {
                return NotFound();
            }

            _context.Libro.Remove(libro);
            await _context.SaveChangesAsync();

            return libro;
        }

        private bool LibroExists(Guid id)
        {
            return _context.Libro.Any(e => e.LibroId == id);
        }
    }
}
