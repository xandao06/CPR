using CPR.Models.Domain;
using CPR.Models.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CPR.Models.Services

    
{
    public class ClienteService
    {

        private readonly CPRDbContext dbContext;

        public ClienteService(CPRDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Cliente Add(Cliente entity)
        {
            dbContext.Add(entity);
            dbContext.SaveChanges();
            return entity;
        }

        public Cliente? Get(int id)
        {
            return dbContext.Set<Cliente>().Find(id);
        }

        public IReadOnlyList<Cliente> GetAll()
        {
            return dbContext.Set<Cliente>().ToList();
        }

        public void Update(Cliente entity)
        {
            dbContext.Entry(entity).State = EntityState.Modified;
            dbContext.SaveChanges();
        }

        public void Delete(Cliente entity)
        {
            dbContext.Set<Cliente>().Remove(entity);
            dbContext.SaveChanges();
        }
    }
}
   