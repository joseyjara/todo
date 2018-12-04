using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Todo.Models
{
    public partial class TodoContext : DbContext
    {
        public TodoContext()
        {
        }

        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Tasks> Tasks { get; set; }
        public virtual DbSet<Todos> Todos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=(local)\\;Database=Todo;Trusted_Connection=false;User ID=sa;Password=qams9350!;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tasks>(entity =>
            {
                entity.HasKey(e => e.TaskKey);

                entity.HasOne(d => d.TodoKeyNavigation)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.TodoKey);
            });

            modelBuilder.Entity<Todos>(entity =>
            {
                entity.HasKey(e => e.TodoKey);

                entity.Property(e => e.TodoListName).IsRequired();
            });
        }
    }
}
