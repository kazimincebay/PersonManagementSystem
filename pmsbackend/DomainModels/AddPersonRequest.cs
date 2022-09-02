using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace pmsbackend.DomainModels
{
    public class AddPersonRequest
    {
        public string personTC { get; set; }

        public string personFullname { get; set; }

        public string personTitle { get; set; }

        public string personBirthTime { get; set; }

        public string personCompany { get; set; }

        public string personState { get; set; }

    }
}
