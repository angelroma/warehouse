using System;
using System.Collections.Generic;

namespace HugoWarehouse.Models.Poco
{
    public partial class ProductProvider
    {
        public int Id { get; set; }
        public int ProdiverId { get; set; }
        public int ProductId { get; set; }

        public virtual Provider Prodiver { get; set; }
        public virtual Product Product { get; set; }
    }
}
