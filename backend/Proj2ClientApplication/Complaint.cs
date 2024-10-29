using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proj2ClientApplication
{
    internal class Complaint
    {
        string description, status;
        DateTime complaintDate;

        public Complaint(string description, string status, DateTime complaintDate)
        {
            this.Description = description;
            this.Status = status;
            this.ComplaintDate = complaintDate;
        }

        public string Description { get => description; set => description = value; }
        public string Status { get => status; set => status = value; }
        public DateTime ComplaintDate { get => complaintDate; set => complaintDate = value; }

        public void UpdateSatus()
        {

        }

    }
}
