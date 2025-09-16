# Spline Files Directory

Place your exported Spline `.splinecode` files here.

## How to use:

1. Export your Spline scene as a `.splinecode` file
2. Place it in this directory (e.g., `my-scene.splinecode`)
3. Use the local file path in your component: `/spline/my-scene.splinecode`

## Example:

```tsx
<SplineOpacityUnified 
  splineFile="/spline/my-scene.splinecode"
  method="file"
  layerNames={['Layer1', 'Layer2', 'Layer3', 'Layer4', 'Layer5', 'OpacityLayer']}
/>
```
