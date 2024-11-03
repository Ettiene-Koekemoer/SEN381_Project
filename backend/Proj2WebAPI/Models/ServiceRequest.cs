using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Proj2WebAPI.Models
{
    [Table("ServiceRequests")]
    public class ServiceRequest
    {
        [Key]
        public int ServiceRequestId { get; set; }

        [Required]
        public int ClientId { get; set; }

        public int? TechnicianId { get; set; } 

        [Required]
        [StringLength(int.MaxValue)] 
        public string IssueDescription { get; set; }

        [Required]
        [StringLength(50)]
        public string Priority { get; set; }

        [Required]
        [StringLength(50)]
        public string Status { get; set; }

        public DateTime? AssignedDate { get; set; } 

        public DateTime? ResolutionDate { get; set; } 

        // Navigation properties
        [ForeignKey("ClientId")]
        public Client Client { get; set; }

        [ForeignKey("TechnicianId")]
        public Technician Technician { get; set; }
    }
}
