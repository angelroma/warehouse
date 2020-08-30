using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HugoWarehouse.Models.Common;
using HugoWarehouse.Models.Poco;
using HugoWarehouse.Services;
using HugoWarehouse.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OkResult = HugoWarehouse.Models.Common.OkResult;

namespace HugoWarehouse.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;

        public AuthController(IAuthService service)
        {
            _service = service;
        }

        public class AuthRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> PostLogin(AuthRequest authRequest)
        {
            try
            {
                var token = await _service.Login(authRequest.Username, authRequest.Password);
                return Ok(new OkResult("The user has been logged in", new { Token = token }));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(new ErrorResult(e.Message));
            }
        }
    }
}
