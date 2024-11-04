using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Proj2WebAPI.Data;
using Proj2WebAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Proj2WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DataController : ControllerBase
    {
        private readonly DataContext _context;

        public DataController(DataContext context)
        {
            _context = context;
        }

        // GET: api/data/contracts
        [HttpGet("contracts")]
        public async Task<ActionResult<IEnumerable<Contract>>> GetAllContracts()
        {
            var contracts = await _context.Contracts
                .Include(c => c.Client)  
                .ToListAsync();

            return Ok(contracts);
        }

        // GET: api/data/contracts/{id}
        [HttpGet("contracts/{id}")]
        public async Task<ActionResult<Contract>> GetContractById(int id)
        {
            var contract = await _context.Contracts
                .Include(c => c.Client)  // If you want to include related data, adjust as needed
                .FirstOrDefaultAsync(c => c.ContractId == id);

            if (contract == null)
            {
                return NotFound();
            }

            return Ok(contract);
        }

        // GET: api/data/technicians
        [HttpGet("technicians")]
        public async Task<ActionResult<IEnumerable<Technician>>> GetAllTechnicians()
        {
            var technicians = await _context.Technicians.ToListAsync();
            return Ok(technicians);
        }

        // GET: api/data/clients
        [HttpGet("clients")]
        public async Task<ActionResult<IEnumerable<Client>>> GetAllClients()
        {
            var clients = await _context.Clients.ToListAsync();
            return Ok(clients);
        }

        // GET: api/data/serviceRequests
        [HttpGet("serviceRequests")]
        public async Task<ActionResult<IEnumerable<ServiceRequest>>> GetAllServiceRequests()
        {
            var serviceRequests = await _context.ServiceRequests
                .Include(sr => sr.Client)     
                .Include(sr => sr.Technician)  
                .ToListAsync();

            return Ok(serviceRequests);
        }

        [HttpPut("serviceRequests/{id}")]
        public async Task<IActionResult> UpdateServiceRequest(int id, [FromBody] ServiceRequest serviceRequest)
        {
            if (id != serviceRequest.ServiceRequestId)
            {
                return BadRequest();
            }

            _context.Entry(serviceRequest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceRequestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPatch("serviceRequests/{id}")]
        public async Task<IActionResult> PatchServiceRequest(int id, [FromBody] JsonPatchDocument<ServiceRequest> patchDocument)
        {
            if (patchDocument == null)
            {
                return BadRequest("Patch document is null.");
            }

            var serviceRequest = await _context.ServiceRequests.FindAsync(id);
            if (serviceRequest == null)
            {
                return NotFound($"Service request with ID {id} not found.");
            }

            try
            {
                patchDocument.ApplyTo(serviceRequest, (Microsoft.AspNetCore.JsonPatch.Adapters.IObjectAdapter)ModelState);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return NoContent();
        }

        private bool ServiceRequestExists(int id)
        {
            return _context.ServiceRequests.Any(e => e.ServiceRequestId == id);
        }

        // GET: api/data/feedback
        [HttpGet("feedback")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedback()
        {
            var feedback = await _context.Feedback.ToListAsync();
            return Ok(feedback);
        }

        // 
        [HttpGet("clientId")]
        public async Task<ActionResult<int>> GetClientIdByNameAndSurname(string name)
        {
            var client = await _context.Clients
                .FirstOrDefaultAsync(c => c.Name == name);

            if (client == null)
            {
                return NotFound("Client not found");
            }

            return Ok(client.ClientId);
        }

        // New GET: api/data/serviceRequests/search?name={name}&serviceRequestId={serviceRequestId}
        [HttpGet("serviceRequests/search")]
        public async Task<ActionResult<IEnumerable<ServiceRequest>>> SearchServiceRequests(
            [FromQuery] string name,
            [FromQuery] int? serviceRequestId)
        {
            // Retrieve the client based on the name
            var client = await _context.Clients.FirstOrDefaultAsync(c => c.Name == name);
            if (client == null)
            {
                return NotFound("Client not found");
            }

            // Now filter service requests based on the client ID and optional service request ID
            IQueryable<ServiceRequest> query = _context.ServiceRequests
                .Include(sr => sr.Client)
                .Include(sr => sr.Technician);

            query = query.Where(sr => sr.ClientId == client.ClientId);

            if (serviceRequestId.HasValue)
            {
                query = query.Where(sr => sr.ServiceRequestId == serviceRequestId.Value);
            }

            var result = await query.ToListAsync();

            if (!result.Any())
            {
                return NotFound("No service requests found matching the criteria.");
            }

            return Ok(result);
        }

        // POST: api/data/feedback
        [HttpPost("feedback")]
        public async Task<ActionResult> SubmitFeedback([FromBody] Feedback feedback)
        {
            if (feedback == null)
            {
                return BadRequest("Feedback cannot be null");
            }

            if (feedback.ClientId <= 0 || feedback.ServiceRequestId <= 0 || feedback.Rating < 1 || feedback.Rating > 5)
            {
                return BadRequest("Invalid data provided");
            }

            _context.Feedback.Add(feedback);
            await _context.SaveChangesAsync();

            return Ok("Feedback submitted successfully");
        }

    }
}
