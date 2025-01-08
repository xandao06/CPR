
namespace CPR.Domain.Contracts.Client
{
    public interface IMockApiClient
    {
        Task<List<Chamado>> GetAsync();
        Task<Chamado> CreateAsync(Chamado chamado);

    }
}
