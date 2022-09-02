using System;
using System.ComponentModel.DataAnnotations;

/// <summary>
/// Summary description for Class1
/// </summary>
public class persons
{

  [Key]
    public int personId { get; set; }
   
    public string personTC { get; set; }

    public string personFullname { get; set; }

    public string personTitle { get; set; }

    public DateTime personBirthTime { get; set; }

    public string personCompany { get; set; }

    public string personState { get; set; }

}

