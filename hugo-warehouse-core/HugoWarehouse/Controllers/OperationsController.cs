﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HugoWarehouse.Models.Poco;

namespace HugoWarehouse.Controllers
{
    public class DateRanges
    {
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class OperationsController : ControllerBase
    {
        private readonly HugosConnectContext _context;

        public OperationsController(HugosConnectContext context)
        {
            _context = context;
        }

        // GET: api/Operations
        [HttpPost("GetAllByDateRange")]
        public async Task<ActionResult<IEnumerable<Operation>>> GetOperation(DateRanges range)
        {
            return await _context.Operation
                 .Where(x => x.CreatedOn >= range.startDate)
                .Where(x => x.CreatedOn <= range.endDate)
                .OrderByDescending(x => x.Id).ToListAsync();
        }

        // GET: api/Operations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Operation>> GetOperation(int id)
        {
            var operation = await _context.Operation.FindAsync(id);

            if (operation == null)
            {
                return NotFound();
            }

            return operation;
        }

        // PUT: api/Operations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOperation(int id, Operation operation)
        {
            if (id != operation.Id)
            {
                return BadRequest();
            }

            _context.Entry(operation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OperationExists(id))
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

        // POST: api/Operations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Operation>> PostOperation(Operation operation)
        {
            var productToUpdate = await _context.Product.FindAsync(operation.ProductId);

            var operationTypes = await _context.OperationType.ToListAsync();

            var add = operationTypes.FirstOrDefault(x => x.Name == "agregar");
            var remove = operationTypes.FirstOrDefault(x => x.Name == "eliminar");

            if (operation.OperationTypeId == add.Id) productToUpdate.CurrentTotal += operation.Quantity;
            if (operation.OperationTypeId == remove.Id) productToUpdate.CurrentTotal -= operation.Quantity;

            _context.Product.Update(productToUpdate);
            _context.Operation.Add(operation);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOperation", new { id = operation.Id }, operation);
        }

        // DELETE: api/Operations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Operation>> DeleteOperation(int id)
        {
            var operation = await _context.Operation.FindAsync(id);
            if (operation == null)
            {
                return NotFound();
            }

            _context.Operation.Remove(operation);
            await _context.SaveChangesAsync();

            return operation;
        }

        private bool OperationExists(int id)
        {
            return _context.Operation.Any(e => e.Id == id);
        }
    }
}
