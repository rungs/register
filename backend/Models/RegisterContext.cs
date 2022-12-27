using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace RegisterApi.Models
{
    public class RegisterContext : DbContext
    {
        public RegisterContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Register>().ToTable("Register");
            modelBuilder.Entity<Register>().HasKey(x => x.Id); 
            modelBuilder.Entity<Register>().Property(b => b.ContactPerson).IsRequired(false);
            modelBuilder.Entity<Register>().Property(b => b.CompanyName).IsRequired(false);
            modelBuilder.Entity<Register>().Property(b => b.TaxId).IsRequired(false);
            modelBuilder.Entity<Register>().Property(b => b.CardId).IsRequired(false);
            modelBuilder.Entity<Register>().Property(b => b.BirthDate).IsRequired(false);
            modelBuilder.Entity<Register>().Property(b => b.CreatedDate).HasDefaultValueSql("GETDATE()");
        }

        public DbSet<Register> Registers { get; set; }
    }
}
