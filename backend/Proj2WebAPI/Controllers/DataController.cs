using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proj2WebAPI.Data;
using Proj2WebAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proj2WebAPI.Controllers
{
    [ApiController]
    [Route("api/contracts")]
    public class DataController : ControllerBase
    {
        private readonly DataContext _context;

        public DataController(DataContext context)
        {
            _context = context;
        }

        // GET: api/contracts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contract>>> GetAllContracts()
        {
            var contracts = await _context.Contracts
                .Include(c => c.Client) 
                .ToListAsync();

            return Ok(contracts);
        }

        // GET: api/contracts/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Contract>> GetContractById(int id)
        {
            var contract = await _context.Contracts
                .Include(c => c.Client) 
                .FirstOrDefaultAsync(c => c.ContractId == id);

            if (contract == null)
            {
                return NotFound("Contract not found.");
            }

            return Ok(contract);
        }

        // GET: api/contracts/client/{clientId}
        [HttpGet("client/{clientId}")]
        public async Task<ActionResult<IEnumerable<Contract>>> GetContractsByClientId(int clientId)
        {
            var contracts = await _context.Contracts
                .Where(c => c.ClientId == clientId)
                .Include(c => c.Client)
                .ToListAsync();

            if (contracts == null || !contracts.Any())
            {
                return NotFound("No contracts found for the specified client.");
            }

            return Ok(contracts);
        }

        // POST: api/contracts
        [HttpPost]
        public async Task<ActionResult<Contract>> CreateContract(Contract contract)
        {
            if (contract == null)
            {
                return BadRequest("Contract data is required.");
            }

            _context.Contracts.Add(contract);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContractById), new { id = contract.ContractId }, contract);
        }
    }
}
