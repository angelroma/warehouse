using System;
using System.Collections.Generic;

namespace HugoWarehouse.Models.Poco
{
    public partial class Operation
    {
        public int Id { get; set; }
        public int? OperationTypeId { get; set; }
        public int? UserId { get; set; }
        public int? ProductId { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public DateTime CreatedOn { get; set; }

        public virtual OperationType OperationType { get; set; }
        public virtual Product Product { get; set; }
        public virtual User User { get; set; }
    }
}
