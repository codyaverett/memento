# Linear Interpolation
- LERP

![[Pasted image 20221008161106.png]]

The last parameter is useful.

`lerp(A, B, f(t)`
`f(t) = t`
`f(t) = t * t`
`f(t) = sqrt(t)`
`f(t) = smoothstep(t)`

Used to shape the curve as a point moves on its path.

## Applications
 - blending between two colors (bilinear filtering)
 - ui animations

## Traps

### Vectors
- Most things can be interpolated safely, but direction vectors can become skewed
- normalizing the vectors are important
- `slerp()` is useful to interpolate over a sphere

### Zoom
- linear zoom - jaring
- logarithmic zoom - looks better

## Reference
- [# An In-Depth look at Lerp, Smoothstep, and Shaping Functions](https://www.youtube.com/watch?v=YJB1QnEmlTs)