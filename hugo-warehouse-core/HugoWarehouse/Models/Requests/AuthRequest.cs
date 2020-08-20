using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HugoWarehouse.Models.Requests
{
    public class AuthRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
