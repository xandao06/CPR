using CPR.Domain;
using CPR.Domain.Contracts.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CPR.Application.Clients
{
    public class MockApiClient : IMockApiClient
    {
        public Task<List<Chamado>> GetAsync()
        {
            var chamados = new List<Chamado>
        {
            new Chamado { Id = 1, Cliente = "Cliente A", Descricao = "Teste A", Status = "Aberto" },
            new Chamado { Id = 2, Cliente = "Cliente B", Descricao = "Teste B", Status = "Fechado" }
        };

            return  Task.FromResult(chamados);
        }
    }
}
