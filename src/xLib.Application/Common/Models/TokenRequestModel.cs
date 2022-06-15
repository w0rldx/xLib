﻿namespace xLib.Application.Common.Models;

using System.ComponentModel.DataAnnotations;

public class TokenRequestModel
{
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }

}