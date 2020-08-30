using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HugoWarehouse.Models.Poco;
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

        public async Task<string> Login(string username, string password)
        {
            var user = await _context.User.Include(x=>x.Role).FirstOrDefaultAsync(u => u.UserName == username && u.Password == password);

            if (user == null) throw new Exception("Verifica tu contraseña o tu nombre de usuario.");

            return TokenUtils.GenerateJsonWebToken(user);
        }

        public async Task<bool> Logout()
        {
            Task<bool> v = Task.Run(() => true);

            return await v;
        }
    }
}
