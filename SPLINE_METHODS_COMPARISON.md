# Spline Integration Methods Comparison

This document compares the two methods for integrating Spline scenes with layer opacity transitions.

## Method 1: URL (Recommended)

### How it works:
- Export your Spline scene as "React" type
- Get a URL like `https://prod.spline.design/your-scene-id/scene.splinecode`
- Pass the URL to the `splineUrl` prop

### Code Example:
```tsx
<SplineOpacityUnified 
  splineUrl="https://prod.spline.design/your-scene-id/scene.splinecode"
  method="url"
  layerNames={['Layer1', 'Layer2', 'Layer3', 'Layer4', 'Layer5', 'OpacityLayer']}
/>
```

### ✅ Pros:
- **No file management** - Just update the URL when you change the scene
- **Automatic updates** - Changes in Spline editor reflect immediately
- **Smaller bundle size** - Scene is loaded from CDN, not bundled
- **Better performance** - CDN delivery with caching
- **Easier deployment** - No need to manage scene files
- **Version control friendly** - Only the URL changes, not large files

### ❌ Cons:
- **Requires internet** - Won't work offline
- **External dependency** - Depends on Spline's servers
- **Loading time** - Initial load from external URL
- **Less control** - Can't modify the scene file directly

### Best for:
- Production websites
- Scenes that change frequently
- Projects where bundle size matters
- Teams that want easy updates

---

## Method 2: Local File

### How it works:
- Export your Spline scene as `.splinecode` file
- Place it in `public/spline/` directory
- Pass the file path to the `splineFile` prop

### Code Example:
```tsx
<SplineOpacityUnified 
  splineFile="/spline/my-scene.splinecode"
  method="file"
  layerNames={['Layer1', 'Layer2', 'Layer3', 'Layer4', 'Layer5', 'OpacityLayer']}
/>
```

### ✅ Pros:
- **Works offline** - No internet connection required
- **Full control** - You own the file completely
- **Faster loading** - Local file access
- **No external dependencies** - Self-contained
- **Version control** - Can track scene changes in git
- **Custom modifications** - Can edit the .splinecode file if needed

### ❌ Cons:
- **Larger bundle size** - Scene file is included in build
- **Manual file management** - Need to update files manually
- **Deployment complexity** - Need to include scene files in deployment
- **Version control overhead** - Large binary files in git
- **No automatic updates** - Must manually replace files

### Best for:
- Offline applications
- Scenes that rarely change
- Projects where you need full control
- Internal tools or demos

---

## Performance Comparison

| Aspect | URL Method | Local File Method |
|--------|------------|-------------------|
| **Initial Load** | Slower (network request) | Faster (local file) |
| **Bundle Size** | Smaller | Larger |
| **Caching** | CDN caching | Browser caching |
| **Updates** | Automatic | Manual |
| **Offline** | ❌ No | ✅ Yes |

## Bundle Size Impact

### URL Method:
- Only includes the Spline runtime (~200KB)
- Scene loaded on-demand from CDN
- **Total impact: ~200KB**

### Local File Method:
- Includes Spline runtime (~200KB)
- Includes your scene file (varies, typically 1-10MB)
- **Total impact: ~200KB + scene file size**

## Recommendation

### Start with URL Method because:
1. **Easier setup** - Just copy/paste a URL
2. **Better for development** - Changes reflect immediately
3. **Smaller bundle** - Better for production
4. **Standard approach** - Most Spline integrations use this

### Switch to Local File Method if:
1. You need offline functionality
2. Your scene file is very small (<1MB)
3. You want full control over the files
4. You're building an internal tool

## Migration Path

You can easily switch between methods:

```tsx
// URL Method
<SplineOpacityUnified 
  splineUrl="https://prod.spline.design/your-scene-id/scene.splinecode"
  method="url"
/>

// Local File Method  
<SplineOpacityUnified 
  splineFile="/spline/your-scene.splinecode"
  method="file"
/>
```

Just change the props - the component handles the rest!

## Testing Both Methods

Visit `/spline-demo` to see both methods in action:
- **Method 1** shows URL integration
- **Method 2** shows local file integration
- Both have the same opacity transition functionality
- Compare loading times and behavior side by side
