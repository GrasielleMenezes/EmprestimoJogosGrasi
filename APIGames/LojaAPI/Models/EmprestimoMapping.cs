using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LojaAPI.Models
{
    public class EmprestimoMapping : IEntityTypeConfiguration<Emprestimo>
    {
        public void Configure(EntityTypeBuilder<Emprestimo> builder)
        {
            builder.ToTable("Emprestimo");

            builder.HasKey(emprestimo => emprestimo.IdEmprestimo)
                .IsClustered(true);

            builder.Property(emprestimo => emprestimo.IdGame)
                .HasColumnName("IdGame");

            builder.Property(emprestimo => emprestimo.IdLogin)
               .HasColumnName("IdLogin");
            builder.Property(emprestimo => emprestimo.NomeUsuario)
              .HasColumnName("NomeUsuario");
            builder.Property(emprestimo => emprestimo.DataEmprestimo)
              .HasColumnName("DataEmprestimo");

        }

    }
}
