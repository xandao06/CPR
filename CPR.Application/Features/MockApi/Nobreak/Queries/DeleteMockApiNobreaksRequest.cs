using MediatR;

public class DeleteMockApiNobreaksRequest : IRequest<bool>
{
    public int Id { get; set; }

    public DeleteMockApiNobreaksRequest(int id)
    {
        Id = id;
    }
}
