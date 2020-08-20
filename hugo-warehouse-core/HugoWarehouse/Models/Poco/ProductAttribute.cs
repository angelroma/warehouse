using System;
using System.Collections.Generic;

namespace HugoWarehouse.Models.Poco
{
    public partial class ProductAttribute
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int AttributeId { get; set; }
        public string Value { get; set; }

        public virtual Attribute Attribute { get; set; }
        public virtual Product Product { get; set; }
    }
}
