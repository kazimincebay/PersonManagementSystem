using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace pmsbackend.Models
{
    public class auths
    {
        [Key]
        public int authId { get; set; }

        public string authDesc { get; set; }

        public string company { get; set; }

        public string authDeger { get; set; }
    }
}
