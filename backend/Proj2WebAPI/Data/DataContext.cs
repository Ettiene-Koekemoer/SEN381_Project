using Microsoft.EntityFrameworkCore;
using Proj2WebAPI.Models;
using Vonage.Users;

namespace Proj2WebAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Technician> Technicians { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<ServiceRequest> ServiceRequests { get; set; }
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<Feedback> Feedback { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Ignore<ChannelWebSocket>();
            base.OnModelCreating(modelBuilder);
        }
    }
}
