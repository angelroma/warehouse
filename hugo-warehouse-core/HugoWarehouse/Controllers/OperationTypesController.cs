using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HugoWarehouse.Models.Poco;

namespace HugoWarehouse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperationTypesController : ControllerBase
    {
        private readonly HugosConnectContext _context;

        public OperationTypesController(HugosConnectContext context)
        {
            _context = context;
        }

        // GET: api/OperationTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OperationType>>> GetOperationType()
        {
            return await _context.OperationType.ToListAsync();
        }

        // GET: api/OperationTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OperationType>> GetOperationType(int id)
        {
            var operationType = await _context.OperationType.FindAsync(id);

            if (operationType == null)
            {
                return NotFound();
            }

            return operationType;
        }

        // PUT: api/OperationTypes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOperationType(int id, OperationType operationType)
        {
            if (id != operationType.Id)
            {
                return BadRequest();
            }

            _context.Entry(operationType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OperationTypeExists(id))
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

        // POST: api/OperationTypes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<OperationType>> PostOperationType(OperationType operationType)
        {
            _context.OperationType.Add(operationType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOperationType", new { id = operationType.Id }, operationType);
        }

        // DELETE: api/OperationTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OperationType>> DeleteOperationType(int id)
        {
            var operationType = await _context.OperationType.FindAsync(id);
            if (operationType == null)
            {
                return NotFound();
            }

            _context.OperationType.Remove(operationType);
            await _context.SaveChangesAsync();

            return operationType;
        }

        private bool OperationTypeExists(int id)
        {
            return _context.OperationType.Any(e => e.Id == id);
        }
    }
}
