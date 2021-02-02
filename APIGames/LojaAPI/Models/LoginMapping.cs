using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LojaAPI.Models
{
    public class LoginMapping : IEntityTypeConfiguration<Login>
    {
        public void Configure(EntityTypeBuilder<Login> builder)
        {
            builder.ToTable("Login");

            builder.HasKey(login => login.IdLogin)
                .IsClustered(true);

            builder.Property(login => login.IdLogin)
                .HasColumnName("IdLogin");

            builder.Property(login => login.Nome)
               .HasColumnName("Nome");

            builder.Property(login => login.senha)
               .HasColumnName("Senha");

        }

    }
}
