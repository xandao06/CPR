using System.ComponentModel.DataAnnotations;
using System.Data;

namespace CPR.Models.Domain

{
    public class Chamado
    {
        public int Id { get; set; }
        public DateTime Data { get; set; } = DateTime.Now;
        [Required(ErrorMessage = "Preencha o campo obrigatório")]
        public string Hora { get; set; } = DateTime.Now.TimeOfDay.ToString("hh\\:mm");
        [Required(ErrorMessage = "Preencha o campo obrigatório")]
        public string Cliente { get; set; }
        [Required(ErrorMessage = "Preencha o campo obrigatório")]
        public string Descricao { get; set; }
        [Required(ErrorMessage = "Preencha o campo obrigatório")]
        public string Urgencia { get; set; }
        [Required(ErrorMessage = "Preencha o campo obrigatório")]
        public string Status { get; set; }
        [Required(ErrorMessage = "Preencha o campo obrigatório")]
        public string Contrato { get; set; }

        public Chamado()
        {
            Status = "Pendente";
        }
    }
}