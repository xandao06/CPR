

namespace CPR.Domain.Contracts.Client
{
    public interface IMockApiClient
    {
        Task<List<Chamado>> GetAsyncChamado();
        Task<Chamado> CreateAsync(Chamado chamado);
        Task<Chamado> EditAsync(Chamado chamado);
        Task<bool> DeleteAsync(int id);
        Task<Chamado> GetByIdAsync(int id);
        Task<List<Chamado>> GetHistoricoAsync();

        Task<List<Nobreak>> GetAsyncNobreak();

    }
}
