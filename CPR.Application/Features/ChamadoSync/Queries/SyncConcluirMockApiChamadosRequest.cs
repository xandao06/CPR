﻿using CPR.Domain;
using MediatR;

namespace CPR.Application.Features.ChamadoSync.Queries
{
    public class SyncConcluirMockApiChamadoRequest : IRequest<Chamado>
    {
        public int Id { get; set; }

        public SyncConcluirMockApiChamadoRequest(int id)
        {
            Id = id;
        }
    }
}
