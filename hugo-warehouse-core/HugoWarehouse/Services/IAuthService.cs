using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HugoWarehouse.Models.Responses;

namespace HugoWarehouse.Services
{
    public interface IAuthService
    {
        public Task<AuthResponse> Login(string username, string password);
        public Task<bool> Logout();
    }
}
