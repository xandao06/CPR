//using AutoMapper;
//using CPR.Domain.Contracts.Client;
//using CPR.Domain;
//using MediatR;
//using CPR.Application.Features.RegistroVeiculoSync.Queries;

//namespace CPR.Application.Features.RegistroVeiculoSync.Handlers
//{
//    public class SyncEditMockApiRegistroVeiculoRequestHandler(IMediator mediator, IMapper mapper, IMockApiClient mockApiClient) : IRequestHandler<SyncEditMockApiRegistroVeiculoRequest, RegistroVeiculoSyncResult>
//    {
//        private readonly IMediator _mediator = mediator;
//        private readonly IMapper _mapper = mapper;
//        private readonly IMockApiClient _mockApiClient = mockApiClient;

//        public async Task<RegistroVeiculoSyncResult> Handle(SyncEditMockApiRegistroVeiculoRequest request, CancellationToken cancellationToken)
//        {
//            var updatedRegistroVeiculo = await _mockApiClient.EditAsyncRegistroVeiculo(request.RegistroVeiculo);
//            return new RegistroVeiculoSyncResult(1, new List<RegistroVeiculo> { updatedRegistroVeiculo });
//        }
//    }
//}