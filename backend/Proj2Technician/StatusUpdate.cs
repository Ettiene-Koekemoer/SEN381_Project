using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proj2Technician
{
    internal class StatusUpdate
    {
        string updateMessage;
        Job job;

        public StatusUpdate(Job job, string updateMessage)
        {
            Job = job;
            UpdateMessage = updateMessage;
        }

        public string UpdateMessage { get => updateMessage; set => updateMessage = value; }
        internal Job Job { get => job; set => job = value; }

        public void ApplyUpdate()
        {

        }

    }
}
