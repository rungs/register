using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RegisterApi.Models;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                          builder.AllowAnyMethod()
                          .AllowAnyHeader()
                          .WithOrigins("http://127.0.0.1:5173")
                          );
});
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<RegisterContext>
         (item => item.UseSqlServer
         (builder.Configuration.GetConnectionString("SQLConnection")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors(MyAllowSpecificOrigins);
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
