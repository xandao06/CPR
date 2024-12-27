namespace CPR.Application
{
    public class BadRequestException(string message) : ApplicationException(message)
    {
    }
}
