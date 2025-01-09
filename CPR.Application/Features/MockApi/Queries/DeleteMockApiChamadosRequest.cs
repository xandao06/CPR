using MediatR;

public class DeleteMockApiChamadosRequest : IRequest<bool>
{
    public int Id { get; set; }

    public DeleteMockApiChamadosRequest(int id)
    {
        Id = id;
    }
}
