﻿using CPR.Models.Domain;
using CPR.Models.Persistence;
using Microsoft.EntityFrameworkCore;

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
            chamado.Status = "Concluido";
            dbContext.Entry(chamado).State = EntityState.Modified;
            dbContext.SaveChanges();
        }
    }
}