using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proj2Technician
{
    internal class JobAssignment
    {
        string urgency, skill, location;

        public JobAssignment(string urgency, string skill, string location)
        {
            this.Urgency = urgency;
            this.Skill = skill;
            this.Location = location;
        }

        public string Urgency { get => urgency; set => urgency = value; }
        public string Skill { get => skill; set => skill = value; }
        public string Location { get => location; set => location = value; }

        public void AutoAssingTechnician() { }



    }
}
