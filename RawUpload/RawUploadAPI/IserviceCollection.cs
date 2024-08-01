using Microsoft.Extensions.Configuration;
using RawUploadAPI.Interfaces;
using RawUploadAPI.Repositories;

namespace RawUploadAPI
{
    public static class IserviceCollection
    {
        private static string AllowCorsSite = "AllowCorsSite";

        public static IServiceCollection AddPortalSettings(this IServiceCollection services)
        {
            

            
            services.AddConfigureServices();
            services.AddConfigureCors();
           
            //services.AddConfigureSwagger();

            return services;
        }

        private static IServiceCollection AddConfigureServices(this IServiceCollection services)
        {
            services.AddScoped<IFileUploadRepository, FileUploadRepository>();
            return services;
        }

        private static IServiceCollection AddConfigureCors(this IServiceCollection services) =>
           services.AddCors(options =>
           {
               options.AddPolicy(name: AllowCorsSite,
                   policy =>
                   {
                       policy.WithOrigins("http://localhost:4200")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                           //.SetIsOriginAllowedToAllowWildcardSubdomains();
                   });
           });
    }
}
