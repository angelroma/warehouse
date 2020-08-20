using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HugoWarehouse.Models.Common;
using HugoWarehouse.Models.Poco;
using HugoWarehouse.Models.Requests;
using HugoWarehouse.Models.Responses;
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

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> PostLogin(AuthRequest authRequest)
        {
            try
            {
                var result = await _service.Login(authRequest.Username, authRequest.Password);

                return Ok(new OkResult("The user has been logged in", result));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(new ErrorResult(e.Message));
            }
        }
    }
}
