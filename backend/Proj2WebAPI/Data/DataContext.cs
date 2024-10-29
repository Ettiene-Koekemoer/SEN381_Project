using Microsoft.EntityFrameworkCore;
using Proj2WebAPI.Models;

namespace Proj2WebAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Client> Customers { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<ServiceRequest> ServiceRequests { get; set; }

    }
}
