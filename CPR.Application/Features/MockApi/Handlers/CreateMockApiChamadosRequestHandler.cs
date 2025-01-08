using MediatR;
using CPR.Application.Features.MockApi;
using CPR.Domain.Contracts.Client;
using CPR.Domain;

namespace CPR.Application.Features.MockApi.Handlers
{
    public class CreateMockApiChamadosRequestHandler(IMockApiClient mockApiClient) : IRequestHandler<CreateMockApiChamadosRequest, Chamado>
    {
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<Chamado> Handle(CreateMockApiChamadosRequest request, CancellationToken cancellationToken)
        {
            return await _mockApiClient.CreateAsync(request.Chamado);
        }
    }
}