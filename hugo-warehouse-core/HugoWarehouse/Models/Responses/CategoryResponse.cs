using System;

namespace HugoWarehouse.Models.Responses
{
    public class CategoryResponse
    {
        public int Key { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}