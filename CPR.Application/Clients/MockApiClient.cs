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
            return await _dbContext.Chamados.ToListAsync();
        }
        public async Task<Chamado> CreateAsync(Chamado chamado)
        {
            _dbContext.Chamados.Add(chamado);
            await _dbContext.SaveChangesAsync();
            return chamado;
        }

    }
}
