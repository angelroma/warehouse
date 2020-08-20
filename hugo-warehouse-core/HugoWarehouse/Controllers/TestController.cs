using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HugoWarehouse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [Authorize]
        [HttpGet("test-auth")]
        public IEnumerable<string> TestAuth()
        {
            return new string[] { "value1", "value2" };
        }

        [Authorize(Roles = "admin")]
        [HttpGet("test-auth-role-admin")]
        public IEnumerable<string> TestAuthRole()
        {
            return new string[] { "value1", "value2" };
        }

        [Authorize(Roles = "developer")]
        [HttpGet("test-auth-role-dev")]
        public IEnumerable<string> TestAuthRoleDev()
        {
            return new string[] { "value1", "value2" };
        }
    }
}
