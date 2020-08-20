using System;
using System.Collections.Generic;
using HugoWarehouse.Models.Poco;

namespace HugoWarehouse.Models
{
    public class ProductModel
    {
        public int Key { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public List<ProductAttribute> ProductAttributes { get; set; }
    }
}