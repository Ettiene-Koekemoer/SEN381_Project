using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proj2ClientApplication
{
    internal class Client
    {
        string name, surname, cellphoneNumber, Gmail;
        List<ServiceRequest> requests;
        List<ServiceContract> contracts;
        List<Complaint> complaints;
        List<Notification> notifications;

        public Client(string name, string surname, string cellphoneNumber, string gmail, List<ServiceRequest> requests, List<ServiceContract> contracts, List<Complaint> complaints, List<Notification> notifications)
        {
            this.Name = name;
            this.Surname = surname;
            this.CellphoneNumber = cellphoneNumber;
            Gmail1 = gmail;
            this.Requests = requests;
            this.Contracts = contracts;
            this.Complaints = complaints;
            this.Notifications = notifications;
        }

        public string Name { get => name; set => name = value; }
        public string Surname { get => surname; set => surname = value; }
        public string CellphoneNumber { get => cellphoneNumber; set => cellphoneNumber = value; }
        public string Gmail1 { get => Gmail; set => Gmail = value; }
        internal List<ServiceRequest> Requests { get => requests; set => requests = value; }
        internal List<ServiceContract> Contracts { get => contracts; set => contracts = value; }
        internal List<Complaint> Complaints { get => complaints; set => complaints = value; }
        internal List<Notification> Notifications { get => notifications; set => notifications = value; }


        public void AddServiceContract()
        {

        }

        public void EnableAutomatedRenewal()
        {

        }

        public void DisableAutomatedRenewal()
        {

        }
        public void MakeServiceRequest()
        {

        }

        public void FileComplaint()
        {

        }

        public void Notify()
        {

        }
    }
}
