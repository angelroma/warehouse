using HugoWarehouse.Models.Poco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HugoWarehouse.Services
{
    public interface IAuthService
    {
        public Task<string> Login(string username, string password);
        public Task<bool> Logout();
    }
}
