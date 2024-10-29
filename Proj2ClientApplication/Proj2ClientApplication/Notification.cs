using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proj2ClientApplication
{
    internal class Notification
    {

        string message;
        Client client;
        DateTime messageTime;

        public Notification(string message, Client client, DateTime messageTime)
        {
            this.Message = message;
            this.Client = client;
            this.MessageTime = messageTime;
        }

        public string Message { get => message; set => message = value; }
        public DateTime MessageTime { get => messageTime; set => messageTime = value; }
        internal Client Client { get => client; set => client = value; }


        public Notification()
        {

        }

        public void send()
        {

        }

    }
}
