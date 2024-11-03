using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Proj2WebAPI.Models
{
    [Table("Contracts")]
    public class Contract
    {
        [Key]
        public int ContractId { get; set; }

        [Required]
        public int ClientId { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }

        [Required]
        [StringLength(50)]
        public string ServiceLevel { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [ForeignKey("ClientId")]
        public Client Client { get; set; }
    }
}
