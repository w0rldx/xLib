﻿namespace xLib.WebApp.Services;

using Application.Common.Interfaces;
using Application.Common.Models;
using Infastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Settings;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using xLib.Application.Common.Exceptions;
using xLib.Application.User.ViewModel;

public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly JWTToken _jwt;

    public UserService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IOptions<JWTToken> jwt)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _jwt = jwt.Value;
    }

    public async Task<string> RegisterAsync(RegisterModel model)
    {
        var user = new ApplicationUser
        {
            UserName = model.Username,
            Email = model.Email,
            FirstName = model.FirstName,
            LastName = model.LastName
        };
        var userWithSameEmail = await _userManager.FindByEmailAsync(model.Email);
        if (userWithSameEmail == null)
        {
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, DefaultUser.default_role.ToString());
            }
            return $"User Registered with username {user.UserName}";
        }
        else
        {
            return $"Email {user.Email} is already registered.";
        }
    }

    public async Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model)
    {
        var authenticationModel = new AuthenticationModel();
        var user = await _userManager.FindByEmailAsync(model.Email);

        if (user == null)
        {
            throw new ForbiddenAccessException();
        }

        if (await _userManager.CheckPasswordAsync(user, model.Password))
        {
            authenticationModel.IsAuthenticated = true;
            JwtSecurityToken jwtSecurityToken = await CreateJwtToken(user);
            authenticationModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            authenticationModel.Email = user.Email;
            authenticationModel.UserName = user.UserName;
            var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
            authenticationModel.Roles = rolesList.ToList();
            return authenticationModel;
        }

        throw new ForbiddenAccessException();
    }

    private async Task<JwtSecurityToken> CreateJwtToken(ApplicationUser user)
    {
        var userClaims = await _userManager.GetClaimsAsync(user);
        var roles = await _userManager.GetRolesAsync(user);
        var roleClaims = new List<Claim>();
        for (int i = 0; i < roles.Count; i++)
        {
            roleClaims.Add(new Claim("roles", roles[i]));
        }
        var claims = new[]
        {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            }
        .Union(userClaims)
        .Union(roleClaims);
        var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
        var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
        var jwtSecurityToken = new JwtSecurityToken(
            issuer: _jwt.Issuer,
            audience: _jwt.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_jwt.DurationInMinutes),
            signingCredentials: signingCredentials);
        return jwtSecurityToken;
    }

    public async Task<string> AddRoleAsync(AddRoleModel model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
        {
            return $"No Accounts Registered with {model.Email}.";
        }
        if (await _userManager.CheckPasswordAsync(user, model.Password))
        {
            var roleExists = Enum.GetNames(typeof(Roles)).Any(x => x.ToLower() == model.Role.ToLower());
            if (roleExists)
            {
                var validRole = Enum.GetValues(typeof(Roles)).Cast<Roles>().Where(x => x.ToString().ToLower() == model.Role.ToLower()).FirstOrDefault();
                await _userManager.AddToRoleAsync(user, validRole.ToString());
                return $"Added {model.Role} to user {model.Email}.";
            }
            return $"Role {model.Role} not found.";
        }
        return $"Incorrect Credentials for user {user.Email}.";
    }

    public async Task<UserModel> GetUserAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);

        var userVm = new UserModel
        {
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Username = user.UserName,
            Roles = rolesList.ToArray()
        };

        return userVm;
    }
}