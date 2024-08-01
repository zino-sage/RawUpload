namespace RawUploadAPI.DTOs
{
    public class FileUploadDto
    {
       public string?  divisibleBy2 {get; set;}
       public string?  divisibleBy7 {get; set;}
       public string?  divisibleBy3 {get; set;}
       public int?  mode {get; set;}
       public int?  median {get; set;}
       public int?  oddNumberSum {get; set;}
       public int?  evenNumberSum {get; set;}
       public int?  singleDigitSum {get; set;}
       public int?  doubleDigitSum {get; set;}
       public string? sumTo35 { get; set;}
       public string? sumTo65 { get; set;}

    }
}
