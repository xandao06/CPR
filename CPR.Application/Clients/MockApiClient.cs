using CPR.Domain;
using CPR.Domain.Contracts.Client;
using CPR.Domain.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CPR.Application.Clients
{
    public class MockApiClient : IMockApiClient
    {

        private readonly CPRDbContext _dbContext;

        public MockApiClient(CPRDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Chamado>> GetAsync()
        {
            return await _dbContext.Chamados
        .Where(c => !c.IsHistorico) 
        .ToListAsync();
        }
        public async Task<Chamado> CreateAsync(Chamado chamado)
        {
            _dbContext.Chamados.Add(chamado);
            await _dbContext.SaveChangesAsync();
            return chamado;
        }

        public async Task<Chamado> EditAsync(Chamado chamado)
        {
            _dbContext.Chamados.Update(chamado);
            await _dbContext.SaveChangesAsync();
            return chamado;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var chamado = await _dbContext.Chamados.FindAsync(id);
            if (chamado != null)
            {
                _dbContext.Chamados.Remove(chamado);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<Chamado> GetByIdAsync(int id)
        {
            return await _dbContext.Chamados.FindAsync(id);
        }
        public async Task<List<Chamado>> GetHistoricoAsync()
        {
            return await _dbContext.Chamados
                .Where(c => c.IsHistorico)
                .ToListAsync();
        }

    }
}
