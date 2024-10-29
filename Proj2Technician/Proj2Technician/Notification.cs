using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proj2Technician
{
    internal class Notification
    {
        string message;
        Technician technician;
        DateTime messageTime;

        public Notification(string message, Technician technician, DateTime messageTime)
        {
            this.Message = message;
            this.Technician = technician;
            this.MessageTime = messageTime;
        }

        public string Message { get => message; set => message = value; }
        public DateTime MessageTime { get => messageTime; set => messageTime = value; }
        internal Technician Technician { get => technician; set => technician = value; }


        public void Send()
        {

        }
    }
}
