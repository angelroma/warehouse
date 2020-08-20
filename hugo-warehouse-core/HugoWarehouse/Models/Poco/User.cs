using System;
using System.Collections.Generic;

namespace HugoWarehouse.Models.Poco
{
    public partial class User
    {
        public User()
        {
            Operation = new HashSet<Operation>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public int RoleId { get; set; }
        public DateTime CreatedOn { get; set; }

        public virtual Role Role { get; set; }
        public virtual ICollection<Operation> Operation { get; set; }
    }
}
