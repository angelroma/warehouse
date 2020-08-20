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
    public class UsersController : ControllerBase
    {
        private readonly HugosConnectContext _context;

        public UsersController(HugosConnectContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet("GetAll")]
        public async Task<List<Models.User>> GetUser()
        {
            var users = await _context.User.Include(x => x.Role).Select(x => new Models.User()
            {
                Key = x.Id,
                Age = x.Age,
                CreatedOn = x.CreatedOn,
                Email = x.Email,
                Name = x.Email,
                Password = x.Password,
                RoleId = x.RoleId,
                RoleName = x.Role.Name,
                Username = x.UserName
            }).ToListAsync();

            return users;
        }

        // GET: api/Users/5
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Models.User>> GetUser(int id)
        {
            var user = await _context.User.Select(x => new Models.User()
            {
                Key = x.Id,
                Age = x.Age,
                CreatedOn = x.CreatedOn,
                Email = x.Email,
                Name = x.Email,
                Password = x.Password,
                RoleId = x.RoleId,
                RoleName = x.Role.Name,
                Username = x.UserName
            }).FirstOrDefaultAsync(x => x.Key == id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> PutUser(int id, Models.User user)
        {
            if (id != user.Key)
            {
                return BadRequest();
            }

            var newUser = new User()
            {
                Id = user.Key,
                UserName = user.Username,
                RoleId = user.RoleId,
                Password = user.Password,
                Age = user.Age,
                CreatedOn = user.CreatedOn,
                Email = user.Email,
                Name = user.Name
            };

            _context.Entry(newUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        [HttpPost("Add")]
        public async Task<ActionResult<User>> PostUser(Models.User user)
        {
            User newUser = new User()
            {
                Id = user.Key,
                UserName = user.Username,
                RoleId = user.RoleId,
                Password = user.Password,
                Age = user.Age,
                CreatedOn = user.CreatedOn,
                Email = user.Email,
                Name = user.Name
            };

            _context.User.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Key }, newUser);
        }

        // DELETE: api/Users/5
        [HttpDelete("DeleteById/{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }
    }
}
