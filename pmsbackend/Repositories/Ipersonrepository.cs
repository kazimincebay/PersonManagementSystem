using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace pmsbackend.Repositories
{
    public interface Ipersonrepository
    {
        DataTable GetPersonsAsync();

        DataTable GetPersonsOnayAsync();

        DataTable GetPersonAsync(int personId);

        DataTable GetPersonCAsync(string personCompany);
        DataTable GetPersonSAsync(string personState);

        DataTable GetPersonSearchAsync(string Search);

        DataTable GetPersonSS(string Search,string personState);

        DataTable GetPersonSearchC(string Search, string personCompany);

        DataTable GetPersonFullFilter(string Search, string personCompany, string personState);

        DataTable GetPersonSCAsync(string personState,string personCompany);
        DataTable GetPersonTCAsync(string personTC);

        DataTable GetPersonTCOnayAsync(string personTC);

        //DataTable ExistsTC(string personTC);

        DataTable Exists(int personId);

        DataTable UpdatePerson(int personId,persons persons);

       DataTable DeletePerson(int personId);

        DataTable AddPerson(persons persons);

        DataTable AddPersonOnayNormal(persons persons);


        DataTable AddOnayPerson(persons persons);


    }
}
