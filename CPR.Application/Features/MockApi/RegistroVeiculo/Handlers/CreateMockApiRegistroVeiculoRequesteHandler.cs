//using CPR.Domain.Contracts.Client;
//using CPR.Domain;
//using MediatR;

//public class CreateMockApiRegistroVeiculoRequestHandler : IRequestHandler<CreateMockApiRegistroVeiculoRequest, RegistroVeiculo>
//{
//    private readonly IMockApiClient _mockApiClient;

//    public CreateMockApiRegistroVeiculoRequestHandler(IMockApiClient mockApiClient)
//    {
//        _mockApiClient = mockApiClient;
//    }

//    public async Task<RegistroVeiculo> Handle(CreateMockApiRegistroVeiculoRequest request, CancellationToken cancellationToken)
//    {
//        return await _mockApiClient.CreateAsyncRegistroVeiculo(request.RegistroVeiculo);
//    }
//}
