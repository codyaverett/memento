---
title: JSON Web Token
created: 2023-01-19
updated: 2026-07-29
aliases: [JWT]
tags: [auth, standards, security]
type: evergreen
status: budding
---

# JSON Web Token

Canonical auth note (see also deprecated stub under `learning/computing/programming/authentication/`).

JWTs are provided to a client that has proven their identity. These tokens consist of 3 parts separated by period characters `.`.

Normally to access a service's resources you pass the JWT along with the request so it can verify the identity associated with the token.

This enables stateless RESTful services.

## Related

- Parent map: [[computing]]
- Taxonomy: auth notes live under `learning/computing/security/`
