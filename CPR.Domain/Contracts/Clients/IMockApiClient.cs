using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CPR.Domain.Contracts.Client
{
    public interface IMockApiClient
    {
        Task<List<Chamado>> GetAsync();
    }
}
