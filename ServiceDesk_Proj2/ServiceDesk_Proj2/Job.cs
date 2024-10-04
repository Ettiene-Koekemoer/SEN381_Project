using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDesk_Proj2
{
    internal class Job
    {
        string address, description, progressReport, Urgency;
        Technician technician;
        Client client;

        public Job(string address, string description, string progressReport, string urgency, Technician technician, Client client)
        {
            this.Address = address;
            this.Description = description;
            this.ProgressReport = progressReport;
            Urgency1 = urgency;
            this.Technician = technician;
            this.Client = client;
        }

        public string Address { get => address; set => address = value; }
        public string Description { get => description; set => description = value; }
        public string ProgressReport { get => progressReport; set => progressReport = value; }
        public string Urgency1 { get => Urgency; set => Urgency = value; }
        internal Technician Technician { get => technician; set => technician = value; }
        internal Client Client { get => client; set => client = value; }

        public void UpdateProgress() { }

        public void AssignTechnician() { }

        public void Escalate() {}
    }
}
