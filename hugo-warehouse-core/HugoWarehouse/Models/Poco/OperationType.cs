using System;
using System.Collections.Generic;

namespace HugoWarehouse.Models.Poco
{
    public partial class OperationType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual Operation Operation { get; set; }
    }
}
