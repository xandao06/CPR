using CPR.Models.Domain;
using CPR.Models.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.WebSockets;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace CPR.Models.Services

    
{
    public class ChamadoService
    {

        private readonly CPRDbContext dbContext;

        public ChamadoService(CPRDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Chamado Add(Chamado entity)
        {
            dbContext.Add(entity);
            dbContext.SaveChanges();
            return entity;
        }

        public Chamado Get(int id)
        {
            return dbContext.Set<Chamado>().Find(id);
        }

        public IReadOnlyList<Chamado> GetAll()
        {
            return dbContext.Set<Chamado>().ToList();
        }

        public void Update(Chamado entity)
        {
            dbContext.Entry(entity).State = EntityState.Modified;
            dbContext.SaveChanges();
        }
        public void Delete(int id)
        {
            Chamado chamado = Get(id);
            dbContext.Set<Chamado>().Remove(chamado);
            dbContext.SaveChanges();
        }
        public void Concluir(int id)
        {
            Chamado chamado = Get(id);
            chamado.Status = "Concluído";
            dbContext.Entry(chamado).State = EntityState.Modified;
            dbContext.SaveChanges();
        }

        // Faz a filtragem de pecas na barra de pesquisa e por data
        public IReadOnlyList<Chamado> SearchChamados(string query, DateTime? startDate, DateTime? endDate)
        {
            var chamados = dbContext.Set<Chamado>().AsQueryable();

            chamados = chamados.Where(c => c.Status != "Concluído");

            if (!string.IsNullOrEmpty(query))
            {
                query = query.ToLower();
                chamados = chamados.Where(c => (c.Cliente ?? "").ToLower().Contains(query)
                                                || (c.Descricao ?? "").ToLower().Contains(query)
                                                || (c.Contrato ?? "").ToLower().Contains(query)
                                                || (c.Urgencia ?? "").ToLower().Contains(query)
                                                || (c.Status ?? "").ToLower().Contains(query));
            }

            if (startDate.HasValue)
            {
                chamados = chamados.Where(c => c.Data >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                chamados = chamados.Where(c => c.Data <= endDate.Value);
            }

            return chamados.ToList();
        }


        // Faz a filtragem de pecas na barra de pesquisa e por data
        public IReadOnlyList<Chamado> SearchRegistros(string query, DateTime? startDate, DateTime? endDate)
        {
            var registros = dbContext.Set<Chamado>().AsQueryable();

            registros = registros.Where(r => r.Status != "Pendente");

            if (!string.IsNullOrEmpty(query))
            {
                query = query.ToLower();
                registros = registros.Where(r => (r.Cliente ?? "").ToLower().Contains(query)
                                                || (r.Descricao ?? "").ToLower().Contains(query)
                                                || (r.Contrato ?? "").ToLower().Contains(query)
                                                || (r.Urgencia ?? "").ToLower().Contains(query)
                                                || (r.Status ?? "").ToLower().Contains(query));
            }

            if (startDate.HasValue)
            {
                registros = registros.Where(r => r.Data >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                registros = registros.Where(r => r.Data <= endDate.Value);
            }

            return registros.ToList();
        }

        // Relatorio
        public IReadOnlyList<Chamado> GetReportData(string query, DateTime? startDate, DateTime? endDate)
        {
            var chamados = dbContext.Set<Chamado>().AsQueryable();

            if (!string.IsNullOrEmpty(query))
            {
                query = query.ToLower();
                chamados = chamados.Where(c => (c.Cliente ?? "").ToLower().Contains(query)
                || (c.Descricao ?? "").ToLower().Contains(query)
                                                || (c.Contrato ?? "").ToLower().Contains(query)
                                                || (c.Urgencia ?? "").ToLower().Contains(query)
                                                || (c.Status ?? "").ToLower().Contains(query));
            }

            if (startDate.HasValue)
            {
                chamados = chamados.Where(c => c.Data >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                chamados = chamados.Where(c => c.Data <= endDate.Value);
            }

            return chamados.ToList();
        }
    }
}