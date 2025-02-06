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

        /// <CHAMADO>
        public async Task<List<Chamado>> GetAsyncChamado()
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



        /// <NOBREAK>


        public async Task<List<Nobreak>> GetAsyncNobreak()
        {
            return await _dbContext.Nobreaks
            .ToListAsync();
        }
        public async Task<Nobreak> CreateAsyncNobreak(Nobreak nobreak)
        {
            _dbContext.Nobreaks.Add(nobreak);
            await _dbContext.SaveChangesAsync();
            return nobreak;
        }
        public async Task<Nobreak> EditAsyncNobreak(Nobreak nobreak)
        {
            _dbContext.Nobreaks.Update(nobreak);
            await _dbContext.SaveChangesAsync();
            return nobreak;
        }
        public async Task<bool> DeleteAsyncNobreak(int id)
        {
            var nobreak = await _dbContext.Nobreaks.FindAsync(id);
            if (nobreak != null)
            {
                _dbContext.Nobreaks.Remove(nobreak);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }


        /// <CONSIGNADO>


        public async Task<List<Equipamento>> GetAsyncConsignado()
        {
            return await _dbContext.Equipamentos
            .ToListAsync();
        }
        public async Task<Equipamento> CreateAsyncConsignado(Equipamento equipamento)
        {
            _dbContext.Equipamentos.Add(equipamento);
            await _dbContext.SaveChangesAsync();
            return equipamento;
        }
        public async Task<Equipamento> EditAsyncConsignado(Equipamento equipamento)
        {
            _dbContext.Equipamentos.Update(equipamento);
            await _dbContext.SaveChangesAsync();
            return equipamento;
        }
        public async Task<bool> DeleteAsyncConsignado(int id)
        {
            var equipamento = await _dbContext.Equipamentos.FindAsync(id);
            if (equipamento != null)
            {
                _dbContext.Equipamentos.Remove(equipamento);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<Equipamento> GetByIdAsyncConsignado(int id)
        {
            return await _dbContext.Equipamentos.FindAsync(id);
        }




        /// <VEICULO>

        public async Task<List<Veiculo>> GetAsyncVeiculo()
        {
            return await _dbContext.Veiculos
            .ToListAsync();
        }
        public async Task<Veiculo> CreateAsyncVeiculo(Veiculo veiculo)
        {
            _dbContext.Veiculos.Add(veiculo);
            await _dbContext.SaveChangesAsync();
            return veiculo;
        }
        public async Task<Veiculo> EditAsyncVeiculo(Veiculo veiculo)
        {
            _dbContext.Veiculos.Update(veiculo);
            await _dbContext.SaveChangesAsync();
            return veiculo;
        }
        public async Task<bool> DeleteAsyncVeiculo(int id)
        {
            var veiculo = await _dbContext.Veiculos.FindAsync(id);
            if (veiculo != null)
            {
                _dbContext.Veiculos.Remove(veiculo);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }
        public async Task<Veiculo> GetByIdAsyncVeiculo(int id)
        {
            return await _dbContext.Veiculos.FindAsync(id);
        }


        //////// REGISTRO VEICULO /////


        //public async Task<List<RegistroVeiculo>> GetAsyncRegistroVeiculo()
        //{
        //    return await _dbContext.Registros
        //    .ToListAsync();
        //}
        //public async Task<RegistroVeiculo> CreateAsyncRegistroVeiculo(RegistroVeiculo registroVeiculo)
        //{
        //    _dbContext.Registros.Add(registroVeiculo);
        //    await _dbContext.SaveChangesAsync();
        //    return registroVeiculo;
        //}
        //public async Task<RegistroVeiculo> EditAsyncRegistroVeiculo(RegistroVeiculo registroVeiculo)
        //{
        //    _dbContext.Registros.Update(registroVeiculo);
        //    await _dbContext.SaveChangesAsync();
        //    return registroVeiculo;
        //}
        //public async Task<bool> DeleteAsyncRegistroVeiculo(int id)
        //{
        //    var registroVeiculo = await _dbContext.Registros.FindAsync(id);
        //    if (registroVeiculo != null)
        //    {
        //        _dbContext.Registros.Remove(registroVeiculo);
        //        await _dbContext.SaveChangesAsync();
        //        return true;
        //    }
        //    return false;
        //}
    }
}
