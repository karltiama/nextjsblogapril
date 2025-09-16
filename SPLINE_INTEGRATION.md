# Spline Layer Opacity Integration Guide

This guide will help you integrate the layer opacity transition functionality with your actual Spline scene.

## Overview

The system provides two components:
1. **SplineOpacityDemo** - Demo component with manual controls for testing
2. **SplineOpacityAdvanced** - Production component for your actual Spline scene

## Setup Steps

### 1. Export Your Spline Scene

1. Open your Spline scene in the Spline editor
2. Go to **File > Export** 
3. Choose **React** as the export type
4. Copy the generated URL (e.g., `https://prod.spline.design/your-scene-id/scene.splinecode`)

### 2. Configure Your Spline Scene

In your Spline scene, you need to:

1. **Name your layers** - Make sure each layer has a unique, descriptive name:
   - Top layer: `Layer1` (or your preferred name)
   - Second layer: `Layer2`
   - Third layer: `Layer3`
   - Fourth layer: `Layer4`
   - Fifth layer: `Layer5`
   - Opacity layer: `OpacityLayer`

2. **Set up hover events** - For each layer (except the opacity layer), add hover events:
   - Select the layer object
   - Go to **Events** panel
   - Add **Mouse Enter** event
   - Add **Mouse Leave** event
   - These will be handled by the React component

### 3. Update the Component

Replace the placeholder URL and layer names in your page:

```tsx
<SplineOpacityAdvanced 
  splineUrl="https://prod.spline.design/YOUR-ACTUAL-SCENE-URL/scene.splinecode"
  layerNames={[
    'YourActualLayer1', // Update with your layer names
    'YourActualLayer2',
    'YourActualLayer3', 
    'YourActualLayer4',
    'YourActualLayer5',
    'YourActualOpacityLayer'
  ]}
  opacityValue={0.3} // Adjust opacity (0-1)
  transitionDuration={300} // Adjust transition speed (ms)
/>
```

## How the System Works

### Layer Transition Logic

- **Hover Layer 2**: 1 layer (top) becomes semi-transparent
- **Hover Layer 3**: 2 layers (top 2) become semi-transparent  
- **Hover Layer 4**: 3 layers (top 3) become semi-transparent
- **Hover Layer 5**: 4 layers (top 4) become semi-transparent
- **Mouse Leave**: All layers return to full opacity

### Technical Implementation

The component:
1. Loads your Spline scene using `@splinetool/react-spline`
2. Finds objects by name using `splineApp.findObjectByName()`
3. Modifies material opacity with smooth transitions
4. Handles hover events from your Spline scene

## Customization Options

### Opacity Value
```tsx
opacityValue={0.3} // 0 = fully transparent, 1 = fully opaque
```

### Transition Duration
```tsx
transitionDuration={300} // Milliseconds for smooth transitions
```

### Layer Names
```tsx
layerNames={[
  'CustomLayer1',
  'CustomLayer2', 
  // ... etc
]}
```

## Troubleshooting

### Common Issues

1. **Layers not found**: Check that layer names match exactly
2. **No hover events**: Ensure hover events are set up in Spline
3. **Transitions not smooth**: Adjust `transitionDuration` value
4. **Scene not loading**: Verify the Spline URL is correct

### Debug Mode

Add console logging to see what's happening:

```tsx
// In the component, uncomment these lines:
console.log('Spline scene loaded successfully')
console.log(`Setting up events for ${layerName}`)
console.warn(`Could not find layer: ${layerName}`, error)
```

## Advanced Usage

### Custom Event Handling

If you need more control over the hover events, you can modify the `setupEventListeners` function:

```tsx
const setupEventListeners = (splineApp: any) => {
  layerNames.forEach((layerName, index) => {
    if (index < layerNames.length - 1) {
      const object = splineApp.findObjectByName(layerName)
      if (object) {
        // Add custom event listeners here
        object.addEventListener('mouseenter', () => {
          handleLayerHover(index + 2) // +2 because index 0 = layer 2
        })
        object.addEventListener('mouseleave', () => {
          resetLayers()
        })
      }
    }
  })
}
```

### Multiple Scenes

To use this with multiple Spline scenes, create separate component instances:

```tsx
<SplineOpacityAdvanced 
  splineUrl="scene1-url"
  layerNames={scene1Layers}
/>
<SplineOpacityAdvanced 
  splineUrl="scene2-url" 
  layerNames={scene2Layers}
/>
```

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `/spline-demo`
3. Test the demo controls first
4. Replace with your actual scene URL
5. Verify hover behavior works as expected

## Next Steps

Once you have your Spline scene working:
1. Remove the demo component
2. Integrate the working component into your main site
3. Customize the styling to match your design
4. Add any additional interactions you need
