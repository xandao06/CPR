using CPR.Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CPR.Application.Features.VeiculoSync.Queries
{
    public class SyncGetByIdMockApiVeiculosRequest : IRequest<VeiculoSyncResult>
    {
        public int Id { get; set; }

        public SyncGetByIdMockApiVeiculosRequest(int id)
        {
            Id = id;
        }
    }
}