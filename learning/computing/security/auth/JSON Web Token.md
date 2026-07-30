---
title: JSON Web Token
created: 2023-01-19
updated: 2026-07-29
aliases: [JWT]
tags: [auth, standards, security]
type: evergreen
status: evergreen
---

# JSON Web Token

Compact, URL-safe tokens for **proving identity** to APIs after authentication. Canonical auth note for this vault.

## When to use

- Stateless API auth between trusted services and browsers/mobile clients
- Passing claims (user id, roles, expiry) without a server session store

## When not to use

- Storing highly sensitive secrets *inside* the token (tokens are often readable if not encrypted)
- As a replacement for careful refresh/rotation and revocation strategy

## Structure

JWTs have three Base64url parts separated by `.`:

1. **Header** — algorithm and type
2. **Payload** — claims (e.g. `sub`, `exp`, `iat`)
3. **Signature** — integrity over header + payload

Clients typically send `Authorization: Bearer <token>`. The service verifies signature and claims, enabling **stateless** REST-style services.

## Example shape

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.<payload>.<signature>
```

## Pitfalls

- Ignoring `exp` / clock skew
- Using weak secrets or alg confusion
- Putting PII or secrets in the payload without need
- No plan for logout/revocation when tokens are long-lived

## Sources

- [jwt.io introduction](https://jwt.io/introduction)
- RFC 7519 (JWT)

## Related

- Parent map: [[computing]]
- Quality bar: [[evergreen-quality]]
- Taxonomy: auth under `learning/computing/security/`
- Deprecated stub: `learning/computing/programming/authentication/JSON Web Token.md`
