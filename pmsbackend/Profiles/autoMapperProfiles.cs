using AutoMapper;
using pmsbackend.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pmsbackend.Profiles
{
    public class autoMapperProfiles : Profile
    {
        public autoMapperProfiles()
        {
            CreateMap<persons, DomainModels.persons>().ReverseMap();

            CreateMap<UpdatePersonRequest, persons>().ReverseMap();

            CreateMap<AddPersonRequest, persons>().ReverseMap();

            CreateMap<Models.auths,auths>().ReverseMap();
        }
    }
}
