using Microsoft.EntityFrameworkCore;
using Proj2WebAPI.Models;
using Vonage.Users;

namespace Proj2WebAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<RegisteredTechnician> RegisteredTechnicians { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<ServiceRequest> ServiceRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Ignore<ChannelWebSocket>();
            base.OnModelCreating(modelBuilder);
        }
    }
}
