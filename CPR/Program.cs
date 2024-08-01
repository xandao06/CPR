using CPR.Models.Persistence;
using CPR.Models.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.WebSockets;
using System.Net.WebSockets;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Web.Certificateless;

var builder = WebApplication.CreateBuilder(args);

//if (builder.Environment.IsDevelopment())
//{
//    builder.WebHost.ConfigureKestrel(serverOptions =>
//    {
//        serverOptions.ListenAnyIP(5000); // HTTP port
//        serverOptions.ListenAnyIP(5001, listenOptions =>
//        {
//            listenOptions.UseHttps(); // HTTPS port
//        });
//    });
//}


builder.Services.AddScoped<ClienteService>();
builder.Services.AddScoped<ChamadoService>();

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddHttpsRedirection(options =>
        {
            options.HttpsPort = 443; // Especificar a porta HTTPS
        });
builder.Services.AddSignalR();

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

app.UseWebSockets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Chamado}/{action=ChamadoIndex}/{id?}");

app.MapHub<NotificationHub>("/notificationHub");

app.Run();