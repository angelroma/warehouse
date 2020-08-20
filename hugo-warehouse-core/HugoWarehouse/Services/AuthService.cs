using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HugoWarehouse.Models.Poco;
using HugoWarehouse.Models.Responses;
using HugoWarehouse.Utils;
using Microsoft.EntityFrameworkCore;

namespace HugoWarehouse.Services
{
    public class AuthService : IAuthService
    {
        private readonly HugosConnectContext _context;

        public AuthService(HugosConnectContext context)
        {
            _context = context;
        }

        public async Task<AuthResponse> Login(string username, string password)
        {

            var user = _context.User.FirstOrDefault();

            Task<AuthResponse> auth = (from u in _context.User
                                       join r in _context.Role on u.RoleId equals r.Id
                                       where u.UserName == username && u.Password == password
                                       select new AuthResponse()
                                       {
                                           Id = u.Id,
                                           FirstName = u.Name,
                                           LastName = u.Name,
                                           Role = r.Name,
                                           Username = u.UserName,
                                       }).FirstOrDefaultAsync();

            auth.Wait();

            if (auth.Result == null) throw new Exception("Verifica tu contraseña o tu nombre de usuario.");

            auth.Result.Token = TokenUtils.GenerateJsonWebToken(auth.Result);

            return await auth;
        }

        public async Task<bool> Logout()
        {
            Task<bool> v = Task.Run(() => true);

            return await v;
        }
    }
}
