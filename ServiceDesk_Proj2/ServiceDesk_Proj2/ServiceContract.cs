using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDesk_Proj2
{
    internal class ServiceContract
    {
        string contractId;
        DateTime startDate, endDate;
        string serviceDetails;
        string serviceType;

        public ServiceContract(string contractId, DateTime startDate, DateTime endDate, string serviceDetails, string serviceType)
        {
            this.ContractId = contractId;
            this.StartDate = startDate;
            this.EndDate = endDate;
            this.ServiceDetails = serviceDetails;
            this.ServiceType = serviceType;
        }

        public string ContractId { get => contractId; set => contractId = value; }
        public DateTime StartDate { get => startDate; set => startDate = value; }
        public DateTime EndDate { get => endDate; set => endDate = value; }
        public string ServiceDetails { get => serviceDetails; set => serviceDetails = value; }
        public string ServiceType { get => serviceType; set => serviceType = value; }
    }
}
