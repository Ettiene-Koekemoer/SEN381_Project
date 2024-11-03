using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proj2WebAPI.Data;
using Proj2WebAPI.Models;
using System.Threading.Tasks;

namespace Proj2WebAPI.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;

        public AuthController(DataContext context)
        {
            _context = context;
        }

        // POST: api/auth/register/technician
        [HttpPost("register/technician")]
        public async Task<ActionResult<Technician>> RegisterTechnician(Technician technician)
        {
            if (technician == null)
            {
                return BadRequest("Technician data is required.");
            }

            _context.Technicians.Add(technician);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTechnician), new { id = technician.TechnicianId }, technician);
        }

        // POST: api/auth/register/client
        [HttpPost("register/client")]
        public async Task<ActionResult<Client>> RegisterClient(Client client)
        {
            if (client == null)
            {
                return BadRequest("Client data is required.");
            }

            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClient), new { id = client.ClientId }, client);
        }

        // GET: api/auth/technician/{id}
        [HttpGet("technician/{id}")]
        public async Task<ActionResult<Technician>> GetTechnician(int id)
        {
            var technician = await _context.Technicians.FindAsync(id);

            if (technician == null)
            {
                return NotFound();
            }

            return technician;
        }

        // GET: api/auth/client/{id}
        [HttpGet("client/{id}")]
        public async Task<ActionResult<Client>> GetClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);

            if (client == null)
            {
                return NotFound();
            }

            return client;
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginRequest loginRequest)
        {
            if (loginRequest == null)
            {
                return BadRequest("Email and Password are required.");
            }

            if (loginRequest.IsTechnician)
            {
                var technician = await _context.Technicians
                    .FirstOrDefaultAsync(t => t.Email == loginRequest.Email && t.Password == loginRequest.Password);

                if (technician != null)
                {
                    return Ok("Technician");
                }
            }
            else
            {
                var client = await _context.Clients
                    .FirstOrDefaultAsync(c => c.Email == loginRequest.Email && c.Password == loginRequest.Password);

                if (client != null)
                {
                    return Ok("Client");
                }
            }

            return Unauthorized("Invalid email or password.");
        }
    }
}
