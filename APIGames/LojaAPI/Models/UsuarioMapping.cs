using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LojaAPI.Models
{
    public class UsuarioMapping : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable("Usuario");

            builder.HasKey(usuario => usuario.IdUsuario)
                .IsClustered(true);

            builder.Property(usuario => usuario.IdUsuario)
                .HasColumnName("IdUsuario");

            builder.Property(usuario => usuario.Nome)
               .HasColumnName("Nome");

        }

    }
}
