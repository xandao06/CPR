using CPR.Domain;
using MediatR;

public class CreateMockApiNobreaksRequest : IRequest<Nobreak>
{
    public Nobreak Nobreak { get; set; }

    public CreateMockApiNobreaksRequest(Nobreak nobreak)
    {
        Nobreak = nobreak;
    }
}
