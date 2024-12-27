using Microsoft.EntityFrameworkCore;
using CPR.Domain;

namespace CPR.Infrastructure
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Chamado> Chamados { get; set; } 
    }
}
