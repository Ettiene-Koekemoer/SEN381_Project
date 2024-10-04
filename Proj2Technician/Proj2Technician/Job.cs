using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Proj2Technician
{
    internal class Job
    {
        string address, description, urgency;
        Technician AssignedTechnician;
        ClientCertificateOption ClientDetails;

        public Job(string address, string description, string urgency, Technician assignedTechnician, ClientCertificateOption clientDetails)
        {
            this.Address = address;
            this.Description = description;
            this.Urgency = urgency;
            AssignedTechnician1 = assignedTechnician;
            ClientDetails1 = clientDetails;
        }

        public string Address { get => address; set => address = value; }
        public string Description { get => description; set => description = value; }
        public string Urgency { get => urgency; set => urgency = value; }
        public ClientCertificateOption ClientDetails1 { get => ClientDetails; set => ClientDetails = value; }
        internal Technician AssignedTechnician1 { get => AssignedTechnician; set => AssignedTechnician = value; }
    
    
        public void UpdateProgress()
        {

        }

        public void NotifyTechnician() { 
        
        }
    }
}
