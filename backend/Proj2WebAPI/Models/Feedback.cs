using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Proj2WebAPI.Models
{
    [Table("Feedback")]
    public class Feedback
    {
        [Key]
        public int FeedbackId { get; set; }

        [Required]
        public int ClientId { get; set; }

        [Required]
        public int ServiceRequestId { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }  // Average of professionalism, timeliness, satisfaction

        public string Comments { get; set; }

        [DataType(DataType.Date)]
        public DateOnly DateProvided { get; set; } = DateOnly.FromDateTime(DateTime.Now);
    }
}
