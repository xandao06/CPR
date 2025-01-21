using CPR.Domain.Contracts.Client;
using MediatR;

    public class DeleteMockApiVeiculosRequestHandler(IMockApiClient mockApiClient) : IRequestHandler<DeleteMockApiVeiculosRequest, bool>
    {
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<bool> Handle(DeleteMockApiVeiculosRequest request, CancellationToken cancellationToken)
        {
            return await _mockApiClient.DeleteAsyncVeiculo(request.Id);
        }
    }
