using System;
using System.Collections.Generic;

namespace HugoWarehouse.Models.Poco
{
    public partial class Provider
    {
        public Provider()
        {
            ProductProvider = new HashSet<ProductProvider>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? CreatedOn { get; set; }

        public virtual ICollection<ProductProvider> ProductProvider { get; set; }
    }
}
