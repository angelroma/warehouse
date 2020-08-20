using System;
using System.Collections.Generic;

namespace HugoWarehouse.Models.Poco
{
    public partial class Product
    {
        public Product()
        {
            Operation = new HashSet<Operation>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public double Price { get; set; }

        public virtual Category Category { get; set; }
        public virtual ICollection<Operation> Operation { get; set; }
    }
}
