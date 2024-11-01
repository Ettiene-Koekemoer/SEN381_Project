using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proj2WebAPI.Data;
using Proj2WebAPI.Models;

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

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<ActionResult<RegisteredTechnician>> PostRegisteredTechnician(RegisteredTechnician registeredTechnician)
        {
            if (registeredTechnician == null)
            {
                return BadRequest("Technician data is required.");
            }

            _context.RegisteredTechnicians.Add(registeredTechnician);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRegisteredTechnician), new { id = registeredTechnician.TechnicianId }, registeredTechnician);
        }

        // GET: api/auth/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<RegisteredTechnician>> GetRegisteredTechnician(int id)
        {
            var technician = await _context.RegisteredTechnicians.FindAsync(id);

            if (technician == null)
            {
                return NotFound();
            }

            return technician;
        }

        [HttpPost("login")]
        public async Task<ActionResult<bool>> Login(Proj2WebAPI.Models.LoginRequest loginRequest)
        {
            if (loginRequest == null)
            {
                return BadRequest("Technician ID and Password are required.");
            }

            var technician = await _context.RegisteredTechnicians
                .FirstOrDefaultAsync(t => t.TechnicianId == loginRequest.TechnicianId);


            if (technician == null || technician.Password != loginRequest.Password)
            {
                return Ok(false);
            }

            return Ok(true);
        }


    }
}