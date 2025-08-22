package com.examly.springapp.config;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {
    private static final String SECRET ="357638792F423F4428472B4B6250655368566D597133743677397A2443264629";

    public String extractUsername(String token){
        return extractClaim(token , Claims::getSubject);
    }

    public Date extractExpiration(String token){
        return extractClaim(token , Claims::getExpiration);
    }

    public <T> T extractClaim(String token , Function<Claims,T>claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Claims extractAllClaims(String token){
        return Jwts
        .parserBuilder()
        .setSigningKey(getSignKey())
        .build()
        .parseClaimsJws(token)
        .getBody();   
    }

    private SecretKey getSignKey(){
        byte[] keyBytes=  Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
        // return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET));
    }

    public String generateToken(String username, String role, int userId){
        Map<String , Object> claims= new HashMap<>();
        return createToken(claims , username, role, userId);
    }

    @SuppressWarnings("deprecation")
    public String createToken(Map<String,Object>claims , String username, String role, int userId){
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(username)
            .claim("role",role)
            .claim("userId",userId)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis()+3000*60*60))
            .signWith(SignatureAlgorithm.HS256, getSignKey())
            .compact();
    }

    public boolean isExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token , UserDetails userDetails){
        final String username=  extractUsername(token);
        return (username.equals(userDetails.getUsername())&&!isExpired(token));
    }   
}
