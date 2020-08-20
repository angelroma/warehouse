namespace HugoWarehouse.Models.Common
{
    public class OkResult
    {
        public bool success { get; }
        public string message { get; }
        public object data { get; }

        public OkResult(string message, object data)
        {
            this.success = true;
            this.message = message;
            this.data = data;
        }
    }
}
