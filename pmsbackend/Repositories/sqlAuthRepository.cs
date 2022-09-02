using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using pmsbackend.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace pmsbackend.Repositories
{
    public class sqlAuthRepository : Iauthrepository
    {

        private readonly Context context;
        public sqlAuthRepository(Context context)
        {
            this.context = context;
        }


        public DataTable GetAuthsAsync()
        {
            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("sel_listAuths", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;
        }

        public DataTable GetAuthsHepsiAsync()
        {
            SqlConnection sqlCon = null;
            var dataTable = new DataTable();
            using (sqlCon = new SqlConnection("server=.;database=personsDb;Trusted_Connection=true;"))
            {
                sqlCon.Open();
                SqlCommand sql_cmnd = new SqlCommand("sel_listAuthsHepsi", sqlCon);
                sql_cmnd.CommandType = CommandType.StoredProcedure;
                var sqlreader = sql_cmnd.ExecuteReader();
                dataTable.Load(sqlreader);
                sqlCon.Close();
            }
            return dataTable;
        }


    }
}
