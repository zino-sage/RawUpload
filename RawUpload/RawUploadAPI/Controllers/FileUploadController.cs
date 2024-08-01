using Microsoft.AspNetCore.Mvc;
using RawUploadAPI.Interfaces;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
//using System.Web.Http;
using System.Net;
using System.Net.Http.Headers;


namespace RawUploadAPI.Controllers
{
    [Route("[controller]")]
    public class FileUploadController : ControllerBase
    {
        private IFileUploadRepository repo;

        public FileUploadController(IFileUploadRepository _repo)
        {
            repo = _repo;
        }

        [HttpPost]
        [Route("raw-upload")]
        public async Task<IActionResult> UploadData(IFormFile formData)
        {       
          
            var data = repo.UploadFile(formData, "files");

            if (data != null)
            {
                bool success = true;
                
                if (!success) { return Ok(new { success = success, result = data, message = "Raw file failed to uploaded." }); }

                return Ok(new { success = success, result = data, message = "Raw file data was successfully uploaded" });
            }

            return Ok(new { success = false, message = "Error uploading Raw file data" });
        }
    }
}

