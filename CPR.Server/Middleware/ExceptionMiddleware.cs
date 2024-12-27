﻿//using CPR.Application;
//using System.Net;
//using Newtonsoft.Json;
//using CPR.Application.Features.ChamadoSync.Queries;

//namespace CPR.Domain
//{
//    public class ExceptionMiddleware(RequestDelegate next)
//    {
//        private readonly RequestDelegate _next = next;

//        public async Task InvokeAsync(HttpContext httpContext)
//        {
//            try
//            {
//                await _next(httpContext);
//            }
//            catch (Exception exception)
//            {
//                await HandleExceptionAsync(httpContext, exception);
//            }
//        }

//        private static Task HandleExceptionAsync(HttpContext httpContext, Exception exception)
//        {
//            HttpStatusCode httpStatusCode = exception switch
//            {
//                BadRequestException => HttpStatusCode.BadRequest,
//                SyncMockApiChamadosRequest => HttpStatusCode.NotFound,
//                _ => HttpStatusCode.InternalServerError,
//            };

//            string errorDetails = JsonConvert.SerializeObject(new ErrorDetails
//            {
//                ErrorType = ErrorType.Failure,
//                ErrorMessage = exception.Message
//            });

//            httpContext.Response.StatusCode = (int)httpStatusCode;
//            httpContext.Response.ContentType = "application/json";

//            return httpContext.Response.WriteAsync(errorDetails);
//        }
//    }

//    public class ErrorDetails
//    {
//        public ErrorType ErrorType { get; set; }
//        public string? ErrorMessage { get; set; }
//    }

//    public enum ErrorType
//    {
//        Failure,
//        ValidationError,
//        NotFound
//    }
//}
