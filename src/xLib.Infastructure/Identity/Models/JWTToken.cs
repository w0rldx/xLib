﻿namespace xLib.Infastructure.Identity.Models;

public class JWTToken
{
    public string Key { get; set; }
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public double DurationInMinutes { get; set; }
}