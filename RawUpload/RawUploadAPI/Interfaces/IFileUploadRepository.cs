using RawUploadAPI.DTOs;
using System.Threading.Tasks;

namespace RawUploadAPI.Interfaces
{
    public interface IFileUploadRepository
    {
        Task<FileUploadDto> UploadFile(IFormFile formData, string folderName);
       
    }
}
