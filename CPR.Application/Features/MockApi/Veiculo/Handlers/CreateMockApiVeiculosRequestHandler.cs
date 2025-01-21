using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

    public class CreateMockApiVeiculosRequestHandler : IRequestHandler<CreateMockApiVeiculosRequest, Veiculo>
    {
        private readonly IMockApiClient _mockApiClient;

        public CreateMockApiVeiculosRequestHandler(IMockApiClient mockApiClient)
        {
            _mockApiClient = mockApiClient;
        }

        public async Task<Veiculo> Handle(CreateMockApiVeiculosRequest request, CancellationToken cancellationToken)
        {
            return await _mockApiClient.CreateAsyncVeiculo(request.Veiculo);
        }
    }
