using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proj2ClientApplication
{
    internal class ServiceRequest
    {
        string description, status;
        DateTime requestTime;

        public ServiceRequest(string description, string status, DateTime requestTime)
        {
            this.Description = description;
            this.Status = status;
            this.RequestTime = requestTime;
        }

        public string Description { get => description; set => description = value; }
        public string Status { get => status; set => status = value; }
        public DateTime RequestTime { get => requestTime; set => requestTime = value; }

        public void UpdateStatus()
        {

        }

    }
}
