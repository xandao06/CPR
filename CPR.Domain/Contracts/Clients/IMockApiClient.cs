

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
        Task<Nobreak> CreateAsyncNobreak(Nobreak nobreak);
        Task<Nobreak> EditAsyncNobreak(Nobreak nobreak);
        Task<bool> DeleteAsyncNobreak(int id);
        
        
        Task<List<Equipamento>> GetAsyncConsignado();
        Task<Equipamento> CreateAsyncConsignado(Equipamento equipamento);
        Task<Equipamento> EditAsyncConsignado(Equipamento equipamento);
        Task<bool> DeleteAsyncConsignado(int id);
        Task<Equipamento> GetByIdAsyncConsignado(int id);

    }
}
