using CPR.Models.Domain;
using CPR.Models.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CPR.Models.Services

    
{
    public class RegistroService
    {

        private readonly CPRDbContext dbContext;

        public RegistroService(CPRDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Registro Add(Registro entity)
        {
            dbContext.Add(entity);
            dbContext.SaveChanges();
            return entity;
        }

        public Registro Get(int id)
        {
            return dbContext.Set<Registro>().Find(id);
        }

        public IReadOnlyList<Registro> GetAll()
        {
            return dbContext.Set<Registro>().ToList();
        }

        public void Update(Registro entity)
        {
            dbContext.Entry(entity).State = EntityState.Modified;
            dbContext.SaveChanges();
        }
        public void Delete(int id)
        {
            Registro registro = Get(id);
            dbContext.Set<Registro>().Remove(registro);
            dbContext.SaveChanges();
        }
        public void Concluir(int id)
        {
            Registro registro = Get(id);
            registro.Status = "Concluido";
            dbContext.Entry(registro).State = EntityState.Modified;
            dbContext.SaveChanges();
        }

        // Faz a filtragem de pecas na barra de pesquisa e por data
        public IReadOnlyList<Registro> SearchRegistros(string query, DateTime? startDate, DateTime? endDate)
        {
            var registros = dbContext.Set<Registro>().AsQueryable();

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
                registros = registros.Where(p => p.Data >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                registros = registros.Where(p => p.Data <= endDate.Value);
            }

            return registros.ToList();


        }
    }
}