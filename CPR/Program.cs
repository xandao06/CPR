using CPR.Models.Persistence;
using CPR.Models.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<ClienteService>();
builder.Services.AddScoped<ChamadoService>();

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<CPRDbContext>(options =>
options.UseSqlServer("name=ConnectionStrings:CPRConnectionString"));
 
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Chamado}/{action=ChamadoIndex}/{id?}");

app.Run();
