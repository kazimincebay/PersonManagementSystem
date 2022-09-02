using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using pmsbackend.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace pmsbackend.Repositories
{
    public class sqlPersonRepository : Ipersonrepository
    {
        private readonly Context context;
        public sqlPersonRepository(Context context)
        {
            this.context = context;
        }

        public DataTable GetPersonsAsync()
        {
            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("sel_listperson", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;
        }

        public DataTable GetPersonsOnayAsync()
        {
            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("sel_listOnayperson", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;
        }


        public DataTable GetPersonAsync(int personId)
        {
            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("sel_listoneperson", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;

                SqlParameter personid = sql_cmnd.CreateParameter();
                personid.ParameterName = @"@personId";
                personid.DbType = DbType.Int32;
                personid.Direction = ParameterDirection.Input;
                personid.Value = personId; personid.Size = 450;

                sql_cmnd.Parameters.Add(personid);
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;
        }

        public DataTable GetPersonTCAsync(string personTC)
        {
            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("sel_listTCperson", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                SqlParameter persontc = sql_cmnd.CreateParameter();
                persontc.ParameterName = @"@personTC";
                persontc.DbType = DbType.String;
                persontc.Direction = ParameterDirection.Input;
                persontc.Value = personTC; persontc.Size = 450;
                sql_cmnd.Parameters.Add(persontc);
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;
        }


        public DataTable GetPersonTCOnayAsync(string personTC)
        {
            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("sel_listpersonTCOnay", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                SqlParameter persontc = sql_cmnd.CreateParameter();
                persontc.ParameterName = @"@personTC";
                persontc.DbType = DbType.String;
                persontc.Direction = ParameterDirection.Input;
                persontc.Value = personTC; persontc.Size = 450;
                sql_cmnd.Parameters.Add(persontc);
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;
        }

        public DataTable GetPersonCAsync(string personCompany)
        {
            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("sel_getPersonC", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                SqlParameter personcompany = sql_cmnd.CreateParameter();
                personcompany.ParameterName = @"@personCompany";
                personcompany.DbType = DbType.String;
                personcompany.Direction = ParameterDirection.Input;
                personcompany.Value = personCompany; personcompany.Size = 450;

                sql_cmnd.Parameters.Add(personcompany);
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;
        }


        public DataTable GetPersonSearchAsync(string Search)
        {
            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("sel_getPersonSearch", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                SqlParameter search = sql_cmnd.CreateParameter();
                search.ParameterName = @"@Search";
                search.DbType = DbType.String;
                search.Direction = ParameterDirection.Input;
                search.Value = Search; search.Size = 450;

                sql_cmnd.Parameters.Add(search);
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;
        }


        public DataTable GetPersonFullFilter(string Search, string personCompany, string personState)
        {
            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("sel_getFullFilter", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                SqlParameter search = sql_cmnd.CreateParameter();
                search.ParameterName = @"@Search";
                search.DbType = DbType.String;
                search.Direction = ParameterDirection.Input;
                search.Value = Search; search.Size = 450;

                sql_cmnd.Parameters.Add(search);
                SqlParameter company = sql_cmnd.CreateParameter();
                company.ParameterName = @"@PersonCompany";
                company.DbType = DbType.String;
                company.Direction = ParameterDirection.Input;
                company.Value = personCompany; company.Size = 450;

                sql_cmnd.Parameters.Add(company);
                SqlParameter state = sql_cmnd.CreateParameter();
                state.ParameterName = @"@PersonState";
                state.DbType = DbType.String;
                state.Direction = ParameterDirection.Input;
                state.Value = personState; state.Size = 450;

                sql_cmnd.Parameters.Add(state);
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }

            return dataTable;

        }




        public DataTable GetPersonSCAsync(string personState, string personCompany)
        {
            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("sel_getPersonSC", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                SqlParameter personstate = sql_cmnd.CreateParameter();
                personstate.ParameterName = @"@personState";
                personstate.DbType = DbType.String;
                personstate.Direction = ParameterDirection.Input;
                personstate.Value = personState; personstate.Size = 450;
                sql_cmnd.Parameters.Add(personstate);
                SqlParameter personcompany = sql_cmnd.CreateParameter();
                personcompany.ParameterName = @"@personCompany";
                personcompany.DbType = DbType.String;
                personcompany.Direction = ParameterDirection.Input;
                personcompany.Value = personCompany; personcompany.Size = 450;
                sql_cmnd.Parameters.Add(personcompany);
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;

        }

        public DataTable GetPersonSS(string Search, string personState)
        {
            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("sel_getPersonSS", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                SqlParameter search = sql_cmnd.CreateParameter();
                search.ParameterName = @"@Search";
                search.DbType = DbType.String;
                search.Direction = ParameterDirection.Input;
                search.Value = Search; search.Size = 450;
                sql_cmnd.Parameters.Add(search);
                SqlParameter state = sql_cmnd.CreateParameter();
                state.ParameterName = @"@personState";
                state.DbType = DbType.String;
                state.Direction = ParameterDirection.Input;
                state.Value = personState; state.Size = 450;
                sql_cmnd.Parameters.Add(state);
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;

        }

        public DataTable GetPersonSearchC(string Search, string personCompany)
        {
            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("sel_getPersonSearchC", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                SqlParameter search = sql_cmnd.CreateParameter();
                search.ParameterName = @"@Search";
                search.DbType = DbType.String;
                search.Direction = ParameterDirection.Input;
                search.Value = Search; search.Size = 450;
                sql_cmnd.Parameters.Add(search);
                SqlParameter company = sql_cmnd.CreateParameter();
                company.ParameterName = @"@personCompany";
                company.DbType = DbType.String;
                company.Direction = ParameterDirection.Input;
                company.Value = personCompany; company.Size = 450;
                sql_cmnd.Parameters.Add(company);
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;

        }




        public DataTable GetPersonSAsync(string personState)
        {
            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("sel_getPersonS", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                SqlParameter personstate = sql_cmnd.CreateParameter();
                personstate.ParameterName = @"@personState";
                personstate.DbType = DbType.String;
                personstate.Direction = ParameterDirection.Input;
                personstate.Value = personState; personstate.Size = 450;
                sql_cmnd.Parameters.Add(personstate);
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;

        }
        //public DataTable ExistsTC(string personTC)
        //{
        //    SqlConnection sqlCon = null;
        //    var dataTable = new DataTable();
        //    using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
        //    {
        //        sqlCon.Open();
        //        SqlCommand sql_cmnd = new SqlCommand("sel_existsTC", sqlCon);
        //        sql_cmnd.CommandType = CommandType.StoredProcedure;
        //        SqlParameter persontc = sql_cmnd.CreateParameter();
        //        persontc.ParameterName = @"@personTC";
        //        persontc.DbType = DbType.String;
        //        persontc.Direction = ParameterDirection.Input;
        //        persontc.Value = personTC; persontc.Size = 450;
        //        sql_cmnd.Parameters.Add(persontc);
        //        var sqlreader = sql_cmnd.ExecuteReader();
        //        dataTable.Load(sqlreader);
        //        sqlCon.Close();
        //    }
        //    return dataTable;


        //}


        public DataTable Exists(int personId)
        {
            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("sel_exists", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                SqlParameter personid = sql_cmnd.CreateParameter();
                personid.ParameterName = @"@personId";
                personid.DbType = DbType.Int32;
                personid.Direction = ParameterDirection.Input;
                personid.Value = personId; personid.Size = 450;
                sql_cmnd.Parameters.Add(personId);
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;
        }

        public DataTable UpdatePerson(int personId, persons request)
        {



            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("up_updateperson", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                SqlParameter personid = sql_cmnd.CreateParameter();
                personid.ParameterName = @"@personId";
                personid.DbType = DbType.String;
                personid.Direction = ParameterDirection.Input;
                personid.Value = personId; personid.Size = 450;
                sql_cmnd.Parameters.Add(personid);
                SqlParameter persontc = sql_cmnd.CreateParameter();
                persontc.ParameterName = @"@personTC";
                persontc.DbType = DbType.String;
                persontc.Direction = ParameterDirection.Input;
                persontc.Value = request.personTC; persontc.Size = 450;
                sql_cmnd.Parameters.Add(persontc);
                SqlParameter personfullname = sql_cmnd.CreateParameter();
                personfullname.ParameterName = @"@personFullname";
                personfullname.DbType = DbType.String;
                personfullname.Direction = ParameterDirection.Input;
                personfullname.Value = request.personFullname; personfullname.Size = 450;
                sql_cmnd.Parameters.Add(personfullname);
                SqlParameter persontitle = sql_cmnd.CreateParameter();
                persontitle.ParameterName = @"@personTitle";
                persontitle.DbType = DbType.String;
                persontitle.Direction = ParameterDirection.Input;
                persontitle.Value = request.personTitle; persontitle.Size = 450;
                sql_cmnd.Parameters.Add(persontitle);
                SqlParameter personcompany = sql_cmnd.CreateParameter();
                personcompany.ParameterName = @"@personCompany";
                personcompany.DbType = DbType.String;
                personcompany.Direction = ParameterDirection.Input;
                personcompany.Value = request.personCompany; personcompany.Size = 450;
                sql_cmnd.Parameters.Add(personcompany);
                SqlParameter personbirthtime = sql_cmnd.CreateParameter();
                personbirthtime.ParameterName = @"@personBirthTime";
                personbirthtime.DbType = DbType.DateTime;
                personbirthtime.Direction = ParameterDirection.Input;
                personbirthtime.Value = request.personBirthTime; personbirthtime.Size = 450;
                sql_cmnd.Parameters.Add(personbirthtime);
                SqlParameter personstate = sql_cmnd.CreateParameter();
                personstate.ParameterName = @"@personState";
                personstate.DbType = DbType.String;
                personstate.Direction = ParameterDirection.Input;
                personstate.Value = request.personState; personstate.Size = 450;
                sql_cmnd.Parameters.Add(personstate);
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;


        }

        public DataTable AddPerson(persons request)
        {


            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("up_addperson", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                SqlParameter persontc = sql_cmnd.CreateParameter();
                persontc.ParameterName = @"@personTC";
                persontc.DbType = DbType.String;
                persontc.Direction = ParameterDirection.Input;
                persontc.Value = request.personTC; persontc.Size = 450;
                sql_cmnd.Parameters.Add(persontc);
                SqlParameter personfullname = sql_cmnd.CreateParameter();
                personfullname.ParameterName = @"@personFullname";
                personfullname.DbType = DbType.String;
                personfullname.Direction = ParameterDirection.Input;
                personfullname.Value = request.personFullname; personfullname.Size = 450;
                sql_cmnd.Parameters.Add(personfullname);
                SqlParameter persontitle = sql_cmnd.CreateParameter();
                persontitle.ParameterName = @"@personTitle";
                persontitle.DbType = DbType.String;
                persontitle.Direction = ParameterDirection.Input;
                persontitle.Value = request.personTitle; persontitle.Size = 450;
                sql_cmnd.Parameters.Add(persontitle);
                SqlParameter personcompany = sql_cmnd.CreateParameter();
                personcompany.ParameterName = @"@personCompany";
                personcompany.DbType = DbType.String;
                personcompany.Direction = ParameterDirection.Input;
                personcompany.Value = request.personCompany; personcompany.Size = 450;
                sql_cmnd.Parameters.Add(personcompany);
                DateTime date = Convert.ToDateTime(request.personBirthTime);
                SqlParameter personbirthtime = sql_cmnd.CreateParameter();
                personbirthtime.ParameterName = @"@personBirthTime";
                personbirthtime.DbType = DbType.DateTime;
                personbirthtime.Direction = ParameterDirection.Input;
                personbirthtime.Value = request.personBirthTime; personbirthtime.Size = 450;
                sql_cmnd.Parameters.Add(personbirthtime);
                SqlParameter personstate = sql_cmnd.CreateParameter();
                personstate.ParameterName = @"@personState";
                personstate.DbType = DbType.String;
                personstate.Direction = ParameterDirection.Input;
                personstate.Value = date; personstate.Size = 450;
                sql_cmnd.Parameters.Add(personstate);
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;

        }


        public DataTable AddPersonOnayNormal(persons request)
        {


            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("up_addOnayNormalperson", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                SqlParameter persontc = sql_cmnd.CreateParameter();
                persontc.ParameterName = @"@personTC";
                persontc.DbType = DbType.String;
                persontc.Direction = ParameterDirection.Input;
                persontc.Value = request.personTC; persontc.Size = 450;
                sql_cmnd.Parameters.Add(persontc);
                SqlParameter personfullname = sql_cmnd.CreateParameter();
                personfullname.ParameterName = @"@personFullname";
                personfullname.DbType = DbType.String;
                personfullname.Direction = ParameterDirection.Input;
                personfullname.Value = request.personFullname; personfullname.Size = 450;
                sql_cmnd.Parameters.Add(personfullname);
                SqlParameter persontitle = sql_cmnd.CreateParameter();
                persontitle.ParameterName = @"@personTitle";
                persontitle.DbType = DbType.String;
                persontitle.Direction = ParameterDirection.Input;
                persontitle.Value = request.personTitle; persontitle.Size = 450;
                sql_cmnd.Parameters.Add(persontitle);
                SqlParameter personcompany = sql_cmnd.CreateParameter();
                personcompany.ParameterName = @"@personCompany";
                personcompany.DbType = DbType.String;
                personcompany.Direction = ParameterDirection.Input;
                personcompany.Value = request.personCompany; personcompany.Size = 450;
                sql_cmnd.Parameters.Add(personcompany);
                SqlParameter personbirthtime = sql_cmnd.CreateParameter();
                personbirthtime.ParameterName = @"@personBirthTime";
                personbirthtime.DbType = DbType.DateTime;
                personbirthtime.Direction = ParameterDirection.Input;
                personbirthtime.Value = request.personBirthTime; personbirthtime.Size = 450;
                sql_cmnd.Parameters.Add(personbirthtime);
                SqlParameter personstate = sql_cmnd.CreateParameter();
                personstate.ParameterName = @"@personState";
                personstate.DbType = DbType.String;
                personstate.Direction = ParameterDirection.Input;
                personstate.Value = request.personState; personstate.Size = 450;
                sql_cmnd.Parameters.Add(personstate);
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;

        }

        public DataTable AddOnayPerson(persons request)
        {


            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("up_addOnayperson", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;

                SqlParameter persontc = sql_cmnd.CreateParameter();
                persontc.ParameterName = @"@personTC";
                persontc.DbType = DbType.String;
                persontc.Direction = ParameterDirection.Input;
                persontc.Value = request.personTC; persontc.Size = 450;
                sql_cmnd.Parameters.Add(persontc);

                SqlParameter personfullname = sql_cmnd.CreateParameter();
                personfullname.ParameterName = @"@personFullname";
                personfullname.DbType = DbType.String;
                personfullname.Direction = ParameterDirection.Input;
                personfullname.Value = request.personFullname; personfullname.Size = 450;
                sql_cmnd.Parameters.Add(personfullname);

                SqlParameter persontitle = sql_cmnd.CreateParameter();
                persontitle.ParameterName = @"@personTitle";
                persontitle.DbType = DbType.String;
                persontitle.Direction = ParameterDirection.Input;
                persontitle.Value = request.personTitle; persontitle.Size = 450;
                sql_cmnd.Parameters.Add(persontitle);

                SqlParameter personcompany = sql_cmnd.CreateParameter();
                personcompany.ParameterName = @"@personCompany";
                personcompany.DbType = DbType.String;
                personcompany.Direction = ParameterDirection.Input;
                personcompany.Value = request.personCompany; personcompany.Size = 450;
                sql_cmnd.Parameters.Add(personcompany);

                SqlParameter personbirthtime = sql_cmnd.CreateParameter();
                personbirthtime.ParameterName = @"@personBirthTime";
                personbirthtime.DbType = DbType.DateTime;
                personbirthtime.Direction = ParameterDirection.Input;
                personbirthtime.Value = request.personBirthTime; personbirthtime.Size = 450;
                sql_cmnd.Parameters.Add(personbirthtime);
                SqlParameter personstate = sql_cmnd.CreateParameter();
                personstate.ParameterName = @"@personState";
                personstate.DbType = DbType.String;
                personstate.Direction = ParameterDirection.Input;
                personstate.Value = request.personState; personstate.Size = 450;
                sql_cmnd.Parameters.Add(personstate);

                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;

        }

        public DataTable DeletePerson(int personId)
        {
            var existingPerson = GetPersonAsync(personId);


            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("up_deleteperson", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                SqlParameter personid = sql_cmnd.CreateParameter();
                personid.ParameterName = @"@personId";
                personid.DbType = DbType.Int32;
                personid.Direction = ParameterDirection.Input;
                personid.Value = personId; personid.Size = 450;
                sql_cmnd.Parameters.Add(personid);
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();


                context.SaveChangesAsync();
                return dataTable;
            }




        }
    }
}
