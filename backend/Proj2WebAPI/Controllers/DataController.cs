using Microsoft.AspNetCore.Mvc;
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
    }
}
