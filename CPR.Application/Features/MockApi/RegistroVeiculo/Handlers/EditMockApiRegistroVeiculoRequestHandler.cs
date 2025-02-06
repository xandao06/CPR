//using CPR.Domain.Contracts.Client;
//using CPR.Domain;
//using MediatR;

//public class EditMockApiRegistroVeiculoRequestHandler(IMockApiClient mockApiClient) : IRequestHandler<EditMockApiRegistroVeiculoRequest, RegistroVeiculo>
//{
//    private readonly IMockApiClient _mockApiClient = mockApiClient;

//    public async Task<RegistroVeiculo> Handle(EditMockApiRegistroVeiculoRequest request, CancellationToken cancellationToken)
//    {
//        var updatedRegistroVeiculo = await _mockApiClient.EditAsyncRegistroVeiculo(request.RegistroVeiculo);
//        return updatedRegistroVeiculo;
//    }
//}
