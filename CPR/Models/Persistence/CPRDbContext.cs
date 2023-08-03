using CPR.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace CPR.Models.Persistence
{
    public class CPRDbContext : DbContext
    {
        public CPRDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CPRDbContext).Assembly);

            //modelBuilder.Entity<Produto>()
            //    .Property(x => x.Preco)
            //    .HasPrecision(10, 2);

            //modelBuilder.Entity<Cliente>()
            //    .Property(x => x.NomeCompleto)
            //    .HasMaxLength(50);
        }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Chamado> Chamados { get; set; }
    }
}
