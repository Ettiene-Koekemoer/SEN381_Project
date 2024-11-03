namespace Proj2WebAPI.Models
{
    public class LoginRequest
    {
        public string Email { get; set; } // General identifier for TechnicianId or ClientId

        public string Password { get; set; }

        public bool IsTechnician { get; set; } // Specifies whether the login is for a technician or client
    }
}
