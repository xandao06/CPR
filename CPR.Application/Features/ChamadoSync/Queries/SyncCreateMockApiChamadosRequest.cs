﻿using CPR.Domain;
using MediatR;

namespace CPR.Application.Features.ChamadoSync.Queries
{
    public class SyncCreateMockApiChamadosRequest : IRequest<ChamadoSyncResult>
    {
        public Chamado Chamado { get; set; }

        public SyncCreateMockApiChamadosRequest(Chamado chamado)
        {
            Chamado = chamado;
        }
    }
}

