using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proj2ServiceDesk
{
    internal class Client
    {
        string name, surname, cellphoneNumber;
        List<ServiceContract> contracts = new List<ServiceContract>();
        List<Job> jobs = new List<Job>();
        List<string> complaonts = new List<string>();

        public Client(string name, string surname, string cellphoneNumber, List<ServiceContract> contracts, List<Job> jobs, List<string> complaonts)
        {
            this.name = name;
            this.surname = surname;
            this.cellphoneNumber = cellphoneNumber;
            this.contracts = contracts;
            this.jobs = jobs;
            this.complaonts = complaonts;
        }

        public string Name { get => name; set => name = value; }
        public string Surname { get => surname; set => surname = value; }
        public string CellphoneNumber { get => cellphoneNumber; set => cellphoneNumber = value; }
        public List<string> Complaonts { get => complaonts; set => complaonts = value; }
        internal List<ServiceContract> Contracts { get => contracts; set => contracts = value; }
        internal List<Job> Jobs { get => jobs; set => jobs = value; }

        public void UpdateContractInfo()
        {

        }

        public void ViewComplaints()
        {

        }

        public void ViewCompletedJobs() { }



    }
}
