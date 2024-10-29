using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proj2Technician
{
    internal class Technician
    {
        string name, surname, skillLevel, Location;
        List<Job> AssignedJobs;
        List<Notification> Notifications;

        public Technician(string name, string surname, string skillLevel, string location, List<Job> assignedJobs, List<Notification> notifications)
        {
            this.Name = name;
            this.Surname = surname;
            this.SkillLevel = skillLevel;
            Location1 = location;
            AssignedJobs1 = assignedJobs;
            Notifications1 = notifications;
        }

        public string Name { get => name; set => name = value; }
        public string Surname { get => surname; set => surname = value; }
        public string SkillLevel { get => skillLevel; set => skillLevel = value; }
        public string Location1 { get => Location; set => Location = value; }
        internal List<Job> AssignedJobs1 { get => AssignedJobs; set => AssignedJobs = value; }
        internal List<Notification> Notifications1 { get => Notifications; set => Notifications = value; }


        public void AssignJob()
        {

        }

        public void RemoveJob()
        {

        }

        public void UpdateLocation() { 
        
        }

        public void RecieveNotification()
        {

        }


    }

    
}
