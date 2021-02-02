using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LojaAPI.Models
{
    public class GameMapping : IEntityTypeConfiguration<Game>
    {
        public void Configure(EntityTypeBuilder<Game> builder)
        {
            builder.ToTable("Game");

            builder.HasKey(game => game.IdGame)
                .IsClustered(true);

            builder.Property(game => game.IdGame)
                .HasColumnName("IdGame");

            builder.Property(game => game.NomeGame)
               .HasColumnName("NomeGame");

        }

    }
}
