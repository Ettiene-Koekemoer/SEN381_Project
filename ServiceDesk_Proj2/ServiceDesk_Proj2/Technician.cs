using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDesk_Proj2
{
    internal class Technician
    {
        string name, surname, skillLevel;
        List<Job> jobs = new List<Job>();

        public Technician(string name, string surname, string skillLevel, List<Job> jobs)
        {
            this.Name = name;
            this.Surname = surname;
            this.SkillLevel = skillLevel;
            this.Jobs = jobs;
        }

        public string Name { get => name; set => name = value; }
        public string Surname { get => surname; set => surname = value; }
        public string SkillLevel { get => skillLevel; set => skillLevel = value; }
        internal List<Job> Jobs { get => jobs; set => jobs = value; }

        public void UpdateDetails() { 

        }

        public void AssignJob()
        {

        }

        public void RemoveJob()
        {

        }
    }
}
