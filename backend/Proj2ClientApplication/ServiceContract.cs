using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proj2ClientApplication
{
    internal class ServiceContract
    {
        string TypeOfService, Details;
        bool automatedRenewalEnabled;
        DateTime dateStarted, expiryDate;

        public ServiceContract(string typeOfService, string details, bool automatedRenewalEnabled, DateTime dateStarted, DateTime expiryDate)
        {
            TypeOfService = typeOfService;
            Details = details;
            this.automatedRenewalEnabled = automatedRenewalEnabled;
            this.dateStarted = dateStarted;
            this.expiryDate = expiryDate;
        }

        public string TypeOfService1 { get => TypeOfService; set => TypeOfService = value; }
        public string Details1 { get => Details; set => Details = value; }
        public bool AutomatedRenewalEnabled { get => automatedRenewalEnabled; set => automatedRenewalEnabled = value; }
        public DateTime DateStarted { get => dateStarted; set => dateStarted = value; }
        public DateTime ExpiryDate { get => expiryDate; set => expiryDate = value; }

        public bool IsExpired()
        {
            return false;
        }

        public void RenewContract()
        {

        }
    }
}
