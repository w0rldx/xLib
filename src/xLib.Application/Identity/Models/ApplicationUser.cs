﻿namespace xLib.Application.Identity.Models;

using Microsoft.AspNetCore.Identity;

public class ApplicationUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool Private { get; set; }
    public string ProfilePicture { get; set; }
}