using Microsoft.AspNetCore.Mvc;
using pmsbackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pmsbackend.Controllers
{
    [ApiController]
    public class TokenController : Controller
    {
        [HttpGet]
        [Route("[controller]")]
        public IActionResult GetToken()
        {
            return Ok(new Token().CreateToken());
        }
    }
}
