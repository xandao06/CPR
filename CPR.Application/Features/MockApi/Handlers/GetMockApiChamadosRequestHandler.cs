using MediatR;
using CPR.Application.Features.MockApi;
using CPR.Domain.Contracts.Client;
using CPR.Domain;

namespace CPR.Application.Features.MockApi.Handlers
{
    public class GetMockApiChamadosRequestHandler(IMockApiClient mockApiClient) : IRequestHandler<GetMockApiChamadosRequest, List<Chamado>>
    {
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<List<Chamado>> Handle(GetMockApiChamadosRequest request, CancellationToken cancellationToken)
        {
            return await _mockApiClient.GetAsync();
        }
    }
}
