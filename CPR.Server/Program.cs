using CPR.Application.Clients;
using CPR.Application.Features.ChamadoSync.Handlers;
using CPR.Domain.Contracts.Client;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using CPR.Domain.Persistence;
using CPR.Application.Features.NobreakSync.Handlers;
using CPR.Application.Features.ConsignadoSync.Handlers;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddHttpClient();

builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(SyncMockApiChamadosRequestHandler).Assembly));
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(SyncMockApiNobreaksRequestHandler).Assembly));
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(SyncMockApiConsignadosRequestHandler).Assembly));
builder.Services.AddScoped<IMockApiClient, MockApiClient>();

builder.Services.AddDbContext<CPRDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("CPRConnectionString"),
        b => b.MigrationsAssembly("CPR.Server")
    ));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors("AllowAllOrigins");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
