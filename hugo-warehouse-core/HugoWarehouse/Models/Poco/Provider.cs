using System;
using System.Collections.Generic;

namespace HugoWarehouse.Models.Poco
{
    public partial class Provider
    {
        public Provider()
        {
            Product = new HashSet<Product>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? CreatedOn { get; set; }

        public virtual ICollection<Product> Product { get; set; }
    }
}
