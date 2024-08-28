namespace Contactly.Models
{
    public class ResponseDTO
    {
        public ResponseDTO() { }
        public required bool status {  get; set; }
        public string? message { get; set; }
        public object? outPut { get; set; }
        

    }
}
