using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CPR.Domain.Persistence
{
    public class CPRDbContext : DbContext
    {
        
        public CPRDbContext(DbContextOptions<CPRDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CPRDbContext).Assembly);
        }

        public DbSet<Chamado> Chamados { get; set; }
        public DbSet<Nobreak> Nobreaks { get; set; }
        public DbSet<Equipamento> Equipamentos { get; set; }
        public DbSet<Veiculo> Veiculos { get; set; }
        public DbSet<RegistroVeiculo> Registros { get; set; }
    }
}

