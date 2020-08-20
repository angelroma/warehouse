using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HugoWarehouse.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HugoWarehouse.Models.Poco;
using HugoWarehouse.Models.Responses;
using Attribute = HugoWarehouse.Models.Poco.Attribute;

namespace HugoWarehouse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly HugosConnectContext _context;

        public ProductsController(HugosConnectContext context)
        {
            _context = context;
        }

        public class GetAllRequest
        {
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
        }

        // GET: api/Products
        [HttpPost("GetAll")]
        public async Task<List<ProductModel>> GetProduct([FromBody] GetAllRequest request)
        {
            var result = await (from product in _context.Product
                                join category in _context.Category on product.CategoryId equals category.Id
                                where product.CreatedOn >= request.StartDate && product.CreatedOn <= request.EndDate
                                select new ProductModel
                                {
                                    Key = product.Id,
                                    CategoryId = category.Id,
                                    CategoryName = category.Name,
                                    CreatedOn = product.CreatedOn,
                                    Description = product.Description,
                                    Name = product.Name,
                                    Price = product.Price
                                }).ToListAsync();

            return result;
        }

        // GET: api/Products/5
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<ProductModel>> GetProduct(int id)
        {
            var product = await _context.Product.Include(x => x.Category).FirstOrDefaultAsync(x => x.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            var model = new ProductModel()
            {
                Key = product.Id,
                CategoryId = product.CategoryId,
                CategoryName = product.Category.Name,
                CreatedOn = product.CreatedOn,
                Description = product.Description,
                Name = product.Name,
                Price = product.Price
            };

            return model;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> PutProduct(int id, ProductModel model)
        {
            if (id != model.Key)
            {
                return BadRequest();
            }

            var product = new Product()
            {
                Id = model.Key,
                CategoryId = model.CategoryId,
                Description = model.Description,
                Name = model.Name,
                Price = model.Price,
                CreatedOn = model.CreatedOn
            };

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Products
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("Add")]
        public async Task<ActionResult<ProductModel>> PostProduct(ProductModel model)
        {
            var product = new Product()
            {
                CategoryId = model.CategoryId,
                Description = model.Description,
                Name = model.Description,
                Price = model.Price
            };

            _context.Product.Add(product);
            await _context.SaveChangesAsync();

            foreach (var attribute in model.ProductAttributes)
            {
                attribute.ProductId = product.Id;
            }
            _context.ProductAttribute.AddRange(model.ProductAttributes);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("DeleteById/{id}")]
        public async Task<ActionResult<ProductModel>> DeleteProduct(int id)
        {
            var product = await _context.Product.Include(x => x.Category).FirstOrDefaultAsync(x => x.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            _context.Product.Remove(product);
            await _context.SaveChangesAsync();

            var model = new ProductModel()
            {
                Key = product.Id,
                CategoryId = product.CategoryId,
                CategoryName = product.Category.Name,
                CreatedOn = product.CreatedOn,
                Description = product.Description,
                Name = product.Name,
                Price = product.Price
            };

            return model;
        }

        private bool ProductExists(int id)
        {
            return _context.Product.Any(e => e.Id == id);
        }
    }
}
