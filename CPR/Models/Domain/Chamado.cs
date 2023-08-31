using System.ComponentModel.DataAnnotations;
using System.Data;

namespace CPR.Models.Domain

{
    public class Chamado
    {
        public int Id { get; set; }
        public DateTime Data { get; set; } = DateTime.Now;
        public TimeSpan Hora { get; set; } = DateTime.Now.TimeOfDay;
        public string Cliente { get; set; }
        public string Descricao { get; set; }
        public string Urgencia { get; set; }
        public string Status { get; set; }
        public string Contrato { get; set; }

    }
}
