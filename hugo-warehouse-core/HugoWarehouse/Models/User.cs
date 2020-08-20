using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HugoWarehouse.Models
{
    public class User
    {
        public int Key { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
