using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RegisterApi.Models
{
    public class Register
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string RegisterType { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string MobilePhone { get; set; }
        public string Address { get; set; }
        public string ContactPerson { get; set; }
        public string CompanyName { get; set; }
        public string TaxId { get; set; }
        public string CardId { get; set; }
        public DateTime? BirthDate { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
