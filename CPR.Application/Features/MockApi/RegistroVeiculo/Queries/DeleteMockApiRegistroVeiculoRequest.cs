using MediatR;
public class DeleteMockApiRegistroVeiculoRequest : IRequest<bool>
{
    public int Id { get; set; }

    public DeleteMockApiRegistroVeiculoRequest(int id)
    {
        Id = id;
    }
}
