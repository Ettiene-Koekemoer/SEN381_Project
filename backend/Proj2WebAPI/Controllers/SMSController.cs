using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proj2WebAPI.Data;
using Proj2WebAPI.Models;
using Proj2WebAPI.Services;

namespace Proj2WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SMSController : ControllerBase
    {
        private readonly SmsService _smsService;

        public SMSController(SmsService smsService)
        {
            _smsService = smsService;
        }


        [HttpPost("send-sms")]
        public async Task<IActionResult> SendSms([FromQuery] string phoneNumber, [FromQuery] string message)
        {
            if (string.IsNullOrEmpty(phoneNumber) || string.IsNullOrEmpty(message))
            {
                return BadRequest(new { Error = "Phone number and message are required." });
            }

            try
            {

                await _smsService.SendSmsAsync(phoneNumber, message);
                return Ok(new { Message = "SMS sent successfully!" });
            }
            catch (System.Exception ex)
            {

                return StatusCode(500, new { Error = ex.Message });
            }
        }
    }
}
