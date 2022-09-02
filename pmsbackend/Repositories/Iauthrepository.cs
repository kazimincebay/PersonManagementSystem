using pmsbackend.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace pmsbackend.Repositories
{
    public interface Iauthrepository
    {
        DataTable GetAuthsAsync();

        DataTable GetAuthsHepsiAsync();
    }
}
