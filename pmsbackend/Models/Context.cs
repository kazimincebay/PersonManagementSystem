using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pmsbackend.Models
{
    public class Context : DbContext
    {

        public Context(DbContextOptions<Context> options) : base(options)
        {}

        public DbSet<persons> Persons { get; set; }

        public DbSet<auths> Auths { get; set; }

    }
}
