using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegisterApi.Dtos;
using RegisterApi.Models;

namespace RegisterApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {

        private readonly RegisterContext _context;

        public RegisterController(RegisterContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var register = _context.Registers.ToListAsync();

            return Ok(await register);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RegisterForCreationDto registerForCreationDto)
        {
            try
            {
                var register = registerForCreationDto.Adapt<Register>();

                _context.Registers.Add(register);

                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
