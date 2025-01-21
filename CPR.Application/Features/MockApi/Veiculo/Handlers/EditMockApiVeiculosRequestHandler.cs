
using CPR.Domain.Contracts.Client;
using CPR.Domain;
using MediatR;

    public class EditMockApiVeiculosRequestHandler(IMockApiClient mockApiClient) : IRequestHandler<EditMockApiVeiculosRequest, Veiculo>
    {
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<Veiculo> Handle(EditMockApiVeiculosRequest request, CancellationToken cancellationToken)
        {
            var updatedVeiculo = await _mockApiClient.EditAsyncVeiculo(request.Veiculo);
            return updatedVeiculo;
        }
    }
