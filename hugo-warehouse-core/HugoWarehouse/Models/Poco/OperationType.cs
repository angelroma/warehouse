using System;
using System.Collections.Generic;

namespace HugoWarehouse.Models.Poco
{
    public partial class OperationType
    {
        public OperationType()
        {
            Operation = new HashSet<Operation>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Operation> Operation { get; set; }
    }
}
