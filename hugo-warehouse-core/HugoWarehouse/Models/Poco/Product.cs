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
        public int CategoryId { get; set; }
        public int? ProviderId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string Sku { get; set; }
        public string Color { get; set; }
        public double Size { get; set; }
        public double Weight { get; set; }
        public double Precision { get; set; }
        public string Brand { get; set; }
        public DateTime CreatedOn { get; set; }

        public virtual Category Category { get; set; }
        public virtual Provider Provider { get; set; }
        public virtual ICollection<Operation> Operation { get; set; }
    }
}
