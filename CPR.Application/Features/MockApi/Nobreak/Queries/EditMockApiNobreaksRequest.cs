using CPR.Domain;
using MediatR;

public class EditMockApiNobreaksRequest : IRequest<Nobreak>
{
    public Nobreak Nobreak { get; set; }

    public EditMockApiNobreaksRequest(Nobreak nobreak)
    {
        Nobreak = nobreak;
    }
}
