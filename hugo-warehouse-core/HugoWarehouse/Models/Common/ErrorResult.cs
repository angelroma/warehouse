namespace HugoWarehouse.Models.Common
{
    public class ErrorResult
    {
        public bool success { get; }
        public string message { get; }

        public ErrorResult(string message)
        {
            this.success = false;
            this.message = message;
        }
    }
}
