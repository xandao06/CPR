//using AutoMapper;
//using CPR.Domain.Contracts.Client;
//using CPR.Domain;
//using MediatR;
//using CPR.Application.Features.RegistroVeiculoSync.Queries;

//namespace CPR.Application.Features.RegistroVeiculoSync.Handlers
//{
//    public class SyncMockApiRegistroVeiculoRequestHandler(IMediator mediator, IMapper mapper, IMockApiClient mockApiClient) : IRequestHandler<SyncMockApiRegistroVeiculoRequest, RegistroVeiculoSyncResult>
//    {
//        private readonly IMediator _mediator = mediator;
//        private readonly IMapper _mapper = mapper;
//        private readonly IMockApiClient _mockApiClient = mockApiClient;

//        public async Task<RegistroVeiculoSyncResult> Handle(SyncMockApiRegistroVeiculoRequest request, CancellationToken cancellationToken)
//        {
//            var registroVeiculo = await _mockApiClient.GetAsyncRegistroVeiculo();
//            return new RegistroVeiculoSyncResult(registroVeiculo.Count, registroVeiculo);
//        }
//    }
//}
