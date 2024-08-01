using OfficeOpenXml;
using RawUploadAPI.DTOs;
using RawUploadAPI.Interfaces;

namespace RawUploadAPI.Repositories
{
    public class FileUploadRepository : IFileUploadRepository
    {
        public async Task<FileUploadDto> UploadFile(IFormFile formData, string folderName)       
        {
            try
            {
                var fileExtention = "." + formData.FileName.Split('.')[formData.FileName.Split('.').Length - 1];
                if (fileExtention != ".xlsx")
                {
                    throw new Exception("Invalid file Format ");
                }
                var filename = DateTime.Now.Ticks.ToString() + fileExtention;

                var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files");
                if (!Directory.Exists(filepath))
                {
                    Directory.CreateDirectory(filepath);
                }
                var exactPath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files", filename);
                using (var stream = new FileStream(exactPath, FileMode.Create))
                {
                    await formData.CopyToAsync(stream);
                }

                string excelFilePath = exactPath;
                int[] extractedNumbers = ExtractNumbersFromExcel(excelFilePath);

                static int[] ExtractNumbersFromExcel(string filePath)
                {
                    List<int> numbersList = new List<int>();

                    using (var package = new ExcelPackage(new FileInfo(filePath)))
                    {
                        var worksheet = package.Workbook.Worksheets[0]; 

                        // Loop through rows and columns to extract numbers
                        for (int row = worksheet.Dimension.Start.Row; row <= worksheet.Dimension.End.Row; row++)
                        {
                            for (int col = worksheet.Dimension.Start.Column; col <= worksheet.Dimension.End.Column; col++)
                            {
                                if (int.TryParse(worksheet.Cells[row, col].Text, out int number))
                                {
                                    // Add the extracted number to the list
                                    numbersList.Add(number);
                                }
                            }
                        }
                    }

                    // Convert the list to an array
                    int[] extractedNumbers = numbersList.ToArray();

                    return extractedNumbers;
                }

                {
                    //int[] myIntArray = new int[60];
                    var numbers = extractedNumbers;
                    //var result = new List<FileUploadDto>();

                    // 1. Extract numbers divisible by 2
                    var divisibleBy2 = string.Join(", ", numbers.Where(n => n % 2 == 0));

                    // 2. Extract numbers divisible by 7
                    var divisibleBy7 = string.Join(", ", numbers.Where(n => n % 7 == 0));

                    // 3. Extract numbers divisible by 3
                    var divisibleBy3 = string.Join(", ", numbers.Where(n => n % 3 == 0));

                    // 4. Calculate the mode value
                    var modeValue = numbers.GroupBy(n => n).OrderByDescending(g => g.Count()).Select(g => g.Key).FirstOrDefault();

                    // 5. Calculate the median value
                    var sortedNumbers = numbers.OrderBy(n => n).ToList();
                    var medianValue = sortedNumbers[sortedNumbers.Count / 2];

                    // 6. Find the shortest series of numbers to get to 65
                    var sumTo65 = GetShortestSum(numbers, 65);

                    // 7. Find the shortest series of numbers to get to 35
                    var sumTo35 = GetShortestSum(numbers, 35);

                    // 8. Calculate the sum of all odd numbers
                    var sumOddNumbers = numbers.Where(n => n % 2 != 0).Sum();

                    // 9. Calculate the sum of all even numbers
                    var sumEvenNumbers = numbers.Where(n => n % 2 == 0).Sum();

                    // 10. Calculate the sum of all single-digit numbers
                    var sumSingleDigitNumbers = numbers.Where(n => n < 10).Sum();

                    // 11. Calculate the sum of all double-digit numbers
                    var sumDoubleDigitNumbers = numbers.Where(n => n >= 10 && n < 100).Sum();

                    var result = new FileUploadDto()
                    {
                        divisibleBy2 = divisibleBy2,
                        divisibleBy7 = divisibleBy7,
                        divisibleBy3 = divisibleBy3,
                        mode = modeValue,
                        median = medianValue,
                        sumTo65 = sumTo65,
                        sumTo35 = sumTo35,
                        oddNumberSum = sumOddNumbers,
                        evenNumberSum = sumEvenNumbers,
                        singleDigitSum = sumSingleDigitNumbers,
                        doubleDigitSum = sumDoubleDigitNumbers,

                    };
                   // result.Add(res);

                     return result;
                }
            }
            catch (Exception e) { throw e; }

            static string GetShortestSum(int[] numbers, int target)
            {
                List<int> selectedNumbers = new List<int>();

                for (int i = numbers.Length - 1; i >= 0; i--)
                {
                    int currentNumber = numbers[i];

                    if (currentNumber <= target)
                    {
                        selectedNumbers.Add(currentNumber);
                        target -= currentNumber;

                        if (target == 0)
                            break;
                    }
                }

                selectedNumbers.Reverse();
                return string.Join(", ", selectedNumbers);
            }

        }
    }
}
