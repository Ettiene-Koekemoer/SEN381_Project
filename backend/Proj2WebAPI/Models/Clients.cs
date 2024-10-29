using System.ComponentModel.DataAnnotations.Schema;

namespace Proj2WebAPI.Models
{
    [Table("Clients")]
    public class Client
    {
        public int ClientId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
    }
}
