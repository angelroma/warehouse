using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HugoWarehouse.Models.Poco;
using Attribute = HugoWarehouse.Models.Attribute;

namespace HugoWarehouse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttributesController : ControllerBase
    {
        private readonly HugosConnectContext _context;

        public AttributesController(HugosConnectContext context)
        {
            _context = context;
        }

        // GET: api/Attributes
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Attribute>>> GetAttribute()
        {
            var result = await _context.Attribute.Select(x => new Attribute()
            {
                Key = x.Id,
                Name = x.Name,
                Description = x.Description
            }).ToListAsync();

            return result;
        }
    }
}
