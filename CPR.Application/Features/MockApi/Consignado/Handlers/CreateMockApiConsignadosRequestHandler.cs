using CPR.Domain.Contracts.Client;
using CPR.Domain;
using MediatR;

namespace CPR.Application.Features.MockApi.Consignado.Handlers
{
    public class CreateMockApiConsignadosRequestHandler : IRequestHandler<CreateMockApiConsignadosRequest, Equipamento>
    {
        private readonly IMockApiClient _mockApiClient;

        public CreateMockApiConsignadosRequestHandler(IMockApiClient mockApiClient)
        {
            _mockApiClient = mockApiClient;
        }

        public async Task<Equipamento> Handle(CreateMockApiConsignadosRequest request, CancellationToken cancellationToken)
        {
            return await _mockApiClient.CreateAsyncConsignado(request.Equipamento);
        }
    }
}
