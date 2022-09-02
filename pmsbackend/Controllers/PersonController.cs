using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using pmsbackend.DomainModels;
using pmsbackend.Models;
using pmsbackend.Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace pmsbackend.Controllers
{
    [ApiController]
    public class PersonController : Controller
    {
        private readonly Ipersonrepository personrepository;
        private readonly IMapper mapper;
        public PersonController(Ipersonrepository personrepository, IMapper mapper)
        {
            this.personrepository = personrepository;
            this.mapper = mapper;
        }


        [Authorize]
        [HttpGet]
        [Route("[controller]")]
        public IActionResult GetAllPersonAsync()
        {
            var personneltable = personrepository.GetPersonsAsync();
            List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
            {
                personId = m.Field<int>("personId"),
                personTC = m.Field<string>("personTC"),
                personFullname = m.Field<string>("personFullname"),
                personBirthTime = m.Field<DateTime>("personBirthTime"),
                personTitle = m.Field<string>("personTitle"),
                personCompany = m.Field<string>("personCompany"),
                personState = m.Field<string>("personState")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.persons>>(personelList));

        }

        [Authorize]
        [HttpGet]
        [Route("[controller]/Onay")]
        public IActionResult GetAllPersonOnayAsync()
        {
            var personneltable = personrepository.GetPersonsOnayAsync();
            List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
            {
                personId = m.Field<int>("personId"),
                personTC = m.Field<string>("personTC"),
                personFullname = m.Field<string>("personFullname"),
                personBirthTime = m.Field<DateTime>("personBirthTime"),
                personTitle = m.Field<string>("personTitle"),
                personCompany = m.Field<string>("personCompany"),
                personState = m.Field<string>("personState")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.persons>>(personelList));

        }

        [Authorize]
        [HttpGet]
        [Route("[controller]/{personId:int}")]
        public IActionResult GetPersonAsync([FromRoute] int personId)
        {
            var personneltable = personrepository.GetPersonAsync(personId);

            List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
            {
                personId = m.Field<int>("personId"),
                personTC = m.Field<string>("personTC"),
                personFullname = m.Field<string>("personFullname"),
                personBirthTime = m.Field<DateTime>("personBirthTime"),
                personTitle = m.Field<string>("personTitle"),
                personCompany = m.Field<string>("personCompany"),
                personState = m.Field<string>("personState")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.persons>>(personelList));
        }


        [Authorize]
        [HttpGet]
        [Route("[controller]/Control/{personTC}")]
        public IActionResult GetPersonTCAsync([FromRoute] string personTC)
        {
            var personneltable = personrepository.GetPersonTCAsync(personTC);

            List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
            {
                personId = m.Field<int>("personId"),
                personTC = m.Field<string>("personTC"),
                personFullname = m.Field<string>("personFullname"),
                personBirthTime = m.Field<DateTime>("personBirthTime"),
                personTitle = m.Field<string>("personTitle"),
                personCompany = m.Field<string>("personCompany"),
                personState = m.Field<string>("personState")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.persons>>(personelList));
        }

        [Authorize]
        [HttpGet]
        [Route("[controller]/ControlOnay/{personTC}")]
        public IActionResult GetPersonTCOnayAsync([FromRoute] string personTC)
        {
            var personneltable = personrepository.GetPersonTCOnayAsync(personTC);

            List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
            {
                personId = m.Field<int>("personId"),
                personTC = m.Field<string>("personTC"),
                personFullname = m.Field<string>("personFullname"),
                personBirthTime = m.Field<DateTime>("personBirthTime"),
                personTitle = m.Field<string>("personTitle"),
                personCompany = m.Field<string>("personCompany"),
                personState = m.Field<string>("personState")
            }).ToList();

            ;

            return Ok(mapper.Map<List<DomainModels.persons>>(personelList));
        }






        //[HttpGet]
        //[Route("[controller]/Exists/{personTC}")]
        //public IActionResult ExistsTC([FromRoute] string personTC)
        //{
        //    var personneltable = personrepository.ExistsTC(personTC);

        //    List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
        //    {
        //        personId = m.Field<int>("personId"),
        //        personTC = m.Field<string>("personTC"),
        //        personFullname = m.Field<string>("personFullname"),
        //        personBirthTime = m.Field<string>("personBirthTime"),
        //        personTitle = m.Field<string>("personTitle"),
        //        personCompany = m.Field<string>("personCompany"),
        //        personState = m.Field<string>("personState")
        //    }).ToList();
        //    return Ok(mapper.Map<List<DomainModels.persons>>(personelList));


        //}

        [Authorize]
        [HttpGet]
        [Route("[controller]/{personCompany}")]
        public IActionResult GetPersonCAsync([FromRoute] string personCompany)
        {
            var personneltable = personrepository.GetPersonCAsync(personCompany);

            List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
            {
                personId = m.Field<int>("personId"),
                personTC = m.Field<string>("personTC"),
                personFullname = m.Field<string>("personFullname"),
                personBirthTime = m.Field<DateTime>("personBirthTime"),
                personTitle = m.Field<string>("personTitle"),
                personCompany = m.Field<string>("personCompany"),
                personState = m.Field<string>("personState")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.persons>>(personelList));
        }
        [Authorize]
        [HttpGet]
        [Route("[controller]/State/{personState}")]
        public IActionResult GetPersonSAsync([FromRoute] string personState)
        {
            var personneltable = personrepository.GetPersonSAsync(personState);

            List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
            {
                personId = m.Field<int>("personId"),
                personTC = m.Field<string>("personTC"),
                personFullname = m.Field<string>("personFullname"),
                personBirthTime = m.Field<DateTime>("personBirthTime"),
                personTitle = m.Field<string>("personTitle"),
                personCompany = m.Field<string>("personCompany"),
                personState = m.Field<string>("personState")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.persons>>(personelList));
        }


        [Authorize]
        [HttpGet]
        [Route("[controller]/Filter/{Search}/{personCompany}/{personState}")]
        public IActionResult GetPersonFullFilter([FromRoute] string Search, [FromRoute] string personCompany, [FromRoute] string personState)
        {
            var personneltable = personrepository.GetPersonFullFilter(Search, personCompany, personState);

            List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
            {
                personId = m.Field<int>("personId"),
                personTC = m.Field<string>("personTC"),
                personFullname = m.Field<string>("personFullname"),
                personBirthTime = m.Field<DateTime>("personBirthTime"),
                personTitle = m.Field<string>("personTitle"),
                personCompany = m.Field<string>("personCompany"),
                personState = m.Field<string>("personState")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.persons>>(personelList));
        }


        [Authorize]
        [HttpGet]
        [Route("[controller]/Search/{Search}")]
        public IActionResult GetPersonSearchAsync([FromRoute] string Search)
        {
            var personneltable = personrepository.GetPersonSearchAsync(Search);

            List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
            {
                personId = m.Field<int>("personId"),
                personTC = m.Field<string>("personTC"),
                personFullname = m.Field<string>("personFullname"),
                personBirthTime = m.Field<DateTime>("personBirthTime"),
                personTitle = m.Field<string>("personTitle"),
                personCompany = m.Field<string>("personCompany"),
                personState = m.Field<string>("personState")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.persons>>(personelList));
        }

        [Authorize]
        [HttpGet]
        [Route("[controller]/SC/{personState}/{personCompany}")]
        public IActionResult GetPersonSCAsync([FromRoute] string personState, [FromRoute] string personCompany)
        {
            var personneltable = personrepository.GetPersonSCAsync(personState, personCompany);

            List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
            {
                personId = m.Field<int>("personId"),
                personTC = m.Field<string>("personTC"),
                personFullname = m.Field<string>("personFullname"),
                personBirthTime = m.Field<DateTime>("personBirthTime"),
                personTitle = m.Field<string>("personTitle"),
                personCompany = m.Field<string>("personCompany"),
                personState = m.Field<string>("personState")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.persons>>(personelList));
        }

        [Authorize]
        [HttpGet]
        [Route("[controller]/SS/{Search}/{personState}")]
        public IActionResult GetPersonSSAsync([FromRoute] string Search, [FromRoute] string personState)
        {
            var personneltable = personrepository.GetPersonSS(Search, personState);

            List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
            {
                personId = m.Field<int>("personId"),
                personTC = m.Field<string>("personTC"),
                personFullname = m.Field<string>("personFullname"),
                personBirthTime = m.Field<DateTime>("personBirthTime"),
                personTitle = m.Field<string>("personTitle"),
                personCompany = m.Field<string>("personCompany"),
                personState = m.Field<string>("personState")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.persons>>(personelList));
        }

        [Authorize]
        [HttpGet]
        [Route("[controller]/SearchC/{Search}/{personCompany}")]
        public IActionResult GetPersonSearchC([FromRoute] string Search, [FromRoute] string personCompany)
        {
            var personneltable = personrepository.GetPersonSearchC(Search, personCompany);

            List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
            {
                personId = m.Field<int>("personId"),
                personTC = m.Field<string>("personTC"),
                personFullname = m.Field<string>("personFullname"),
                personBirthTime = m.Field<DateTime>("personBirthTime"),
                personTitle = m.Field<string>("personTitle"),
                personCompany = m.Field<string>("personCompany"),
                personState = m.Field<string>("personState")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.persons>>(personelList));
        }


        [Authorize]
        [HttpPut]
        [Route("[controller]/{personId:int}")]
        public IActionResult UpdatePersonAsync([FromRoute] int personId, [FromBody] UpdatePersonRequest request)
        {

            var personneltable = personrepository.UpdatePerson(personId, mapper.Map<persons>(request));


            List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
            {
                personId = m.Field<int>("personId"),
                personTC = m.Field<string>("personTC"),
                personFullname = m.Field<string>("personFullname"),
                personBirthTime = m.Field<DateTime>("personBirthTime"),
                personTitle = m.Field<string>("personTitle"),
                personCompany = m.Field<string>("personCompany"),
                personState = m.Field<string>("personState")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.persons>>(personelList));
        }




        [Authorize]
        [HttpPost]
        [Route("[controller]/Add/{personTC}")]
        public IActionResult AddPersonAsync([FromBody] AddPersonRequest request)
        {
            var personneltable = personrepository.AddPerson(mapper.Map<persons>(request));


            List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
            {

                personTC = m.Field<string>("personTC"),
                personFullname = m.Field<string>("personFullname"),
                personBirthTime = m.Field<DateTime>("personBirthTime"),
                personTitle = m.Field<string>("personTitle"),
                personCompany = m.Field<string>("personCompany"),
                personState = m.Field<string>("personState")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.persons>>(personelList));
        }


        [Authorize]
        [HttpPost]
        [Route("[controller]/AddOnayNormal/{personTC}")]
        public IActionResult AddPersonOnayNormal([FromBody] AddPersonRequest request)
        {
            var personneltable = personrepository.AddPersonOnayNormal(mapper.Map<persons>(request));


            List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
            {

                personTC = m.Field<string>("personTC"),
                personFullname = m.Field<string>("personFullname"),
                personBirthTime = m.Field<DateTime>("personBirthTime"),
                personTitle = m.Field<string>("personTitle"),
                personCompany = m.Field<string>("personCompany"),
                personState = m.Field<string>("personState")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.persons>>(personelList));
        }

        [Authorize]
        [HttpPost]
        [Route("[controller]/AddOnay/{personTC}")]
        public IActionResult AddPersonOnayAsync([FromBody] AddPersonRequest request)
        {
            var personneltable = personrepository.AddOnayPerson(mapper.Map<persons>(request));

           


            List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
            {
                personTC = m.Field<string>("personTC"),
                personFullname = m.Field<string>("personFullname"),
                personBirthTime = m.Field<DateTime>("personBirthTime"),
                personTitle = m.Field<string>("personTitle"),
                personCompany = m.Field<string>("personCompany"),
                personState = m.Field<string>("personState")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.persons>>(personelList));
        }



        [Authorize]
        [HttpDelete]
        [Route("[controller]/{personId:int}")]
        public IActionResult DeletePersonAsync([FromRoute] int personId)
        {
            var personneltable = personrepository.DeletePerson(personId);


            List<persons> personelList = personneltable.AsEnumerable().Select(m => new persons()
            {
                personId = m.Field<int>("personId"),
                personTC = m.Field<string>("personTC"),
                personFullname = m.Field<string>("personFullname"),
                personBirthTime = m.Field<DateTime>("personBirthTime"),
                personTitle = m.Field<string>("personTitle"),
                personCompany = m.Field<string>("personCompany"),
                personState = m.Field<string>("personState")
            }).ToList();
            return Ok(mapper.Map<List<DomainModels.persons>>(personelList));
        }

    }
}





