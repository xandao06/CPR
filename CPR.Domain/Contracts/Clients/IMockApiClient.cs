

namespace CPR.Domain.Contracts.Client
{
    public interface IMockApiClient
    {

        /// CHAMADO
        Task<List<Chamado>> GetAsyncChamado();
        Task<Chamado> CreateAsync(Chamado chamado);
        Task<Chamado> EditAsync(Chamado chamado);
        Task<bool> DeleteAsync(int id);
        Task<Chamado> GetByIdAsync(int id);
        Task<List<Chamado>> GetHistoricoAsync();
         

        /// NOBREAK
        Task<List<Nobreak>> GetAsyncNobreak();
        Task<Nobreak> CreateAsyncNobreak(Nobreak nobreak);
        Task<Nobreak> EditAsyncNobreak(Nobreak nobreak);
        Task<bool> DeleteAsyncNobreak(int id);


        /// CONSIGNADO
        Task<List<Equipamento>> GetAsyncConsignado();
        Task<Equipamento> CreateAsyncConsignado(Equipamento equipamento);
        Task<Equipamento> EditAsyncConsignado(Equipamento equipamento);
        Task<bool> DeleteAsyncConsignado(int id);
        Task<Equipamento> GetByIdAsyncConsignado(int id);



        /// VEICULO
        Task<List<Veiculo>> GetAsyncVeiculo();
        Task<Veiculo> CreateAsyncVeiculo(Veiculo veiculo);
        Task<Veiculo> EditAsyncVeiculo(Veiculo veiculo);
        Task<bool> DeleteAsyncVeiculo(int id);
        Task<Veiculo> GetByIdAsyncVeiculo(int id);


        // REGISTRO VEICULO
        Task<List<RegistroVeiculo>> GetAsyncRegistroVeiculo();
        Task<RegistroVeiculo> CreateAsyncRegistroVeiculo(RegistroVeiculo registroVeiculo);
        Task<RegistroVeiculo> EditAsyncRegistroVeiculo(RegistroVeiculo registroVeiculo);
        Task<bool> DeleteAsyncRegistroVeiculo(int id);


    }
}
