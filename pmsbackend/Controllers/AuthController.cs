using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pmsbackend.Models;
using pmsbackend.Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace pmsbackend.Controllers
{
   [ApiController]
    public class AuthController : Controller
    {
        private readonly Iauthrepository authrepository;
        private readonly IMapper mapper;
        public AuthController(Iauthrepository authrepository, IMapper mapper)
        {
            this.authrepository = authrepository;
            this.mapper = mapper;
        }

        [Authorize]
        [HttpGet]
        [Route("[controller]")]
        public IActionResult GetAuthsAsync()
        {
            var authtable = authrepository.GetAuthsAsync();


            List<auths> authlist = authtable.AsEnumerable().Select(m => new auths()
            {
                authDesc = m.Field<string>("authDesc"),
                company = m.Field<string>("company"),
                authDeger = m.Field<string>("authDeger")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.auths>>(authlist));
        }

        [Authorize]
        [HttpGet]
        [Route("[controller]/Hepsi")]
        public IActionResult GetAuthsHepsiAsync()
        {
            var authtable = authrepository.GetAuthsHepsiAsync();


            List<auths> authlist = authtable.AsEnumerable().Select(m => new auths()
            {
                authDesc = m.Field<string>("authDesc"),
                company = m.Field<string>("company"),
                authDeger = m.Field<string>("authDeger")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.auths>>(authlist));
        }
    }
    }

