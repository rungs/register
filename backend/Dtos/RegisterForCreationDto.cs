using System.ComponentModel.DataAnnotations;

namespace RegisterApi.Dtos
{
    public class RegisterForCreationDto
    {
        [Required(ErrorMessage = "RegisterType is required")]
        public string RegisterType { get; set; }
        [Required(ErrorMessage = "FirstName is required")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "LastName is required")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }
        [Required(ErrorMessage = "MobilePhone is required")]
        public string MobilePhone { get; set; }
        [Required(ErrorMessage = "Address is required")]
        public string? Address { get; set; }
        public string? ContactPerson { get; set; }
        public string? CompanyName { get; set; }
        public string? TaxId { get; set; }
        public string? CardId { get; set; }
        public DateTime? BirthDate { get; set; }
    }
}
