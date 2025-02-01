using CPR.Domain.Contracts.Client;
using CPR.Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class GetByIdMockApiVeiculosRequestHandler : IRequestHandler<GetByIdMockApiVeiculosRequest, Veiculo>
{
    private readonly IMockApiClient _mockApiClient;

    public GetByIdMockApiVeiculosRequestHandler(IMockApiClient mockApiClient)
    {
        _mockApiClient = mockApiClient;
    }

    public async Task<Veiculo> Handle(GetByIdMockApiVeiculosRequest request, CancellationToken cancellationToken)
    {
        // Chama o cliente diretamente para buscar o veículo pelo ID
        return await _mockApiClient.GetByIdAsyncVeiculo(request.Id);
    }
}
