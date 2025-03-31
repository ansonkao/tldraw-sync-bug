# Tldraw Sync Bug

This is a minimal reproduction of this sync bug: a scenario where the remote store isn't receiving a particular mutation. The saved document is different from editor.getSnapshot().

## Steps to Reproduce

### Setup

```
git clone
yarn
yarn dev
```

On startup, there is a frame in the shot, which represents the "bounds" of the canvas. Upload an image, and the frame will automatically resize itself to fit the image. Drag the image around, and you will see that this is the case. Snap the image back to the original location matching the frame, before doing the next step.

Now, refresh the page. You'll be surprised to see that the frame and the image are NOT matched like they were before the refresh.

If you step through what's happening, you'll see that tldraw internally updates the the frame several times:

1. Initially, it resizes the frame to a first set of coordinates (I'm not sure which coordinates these are). This is what gets persisted via useSync.
2. It then resizes the frame to a correct size and position as expected, but this is not synced.

Note: This bug occurs regardless if it's a frame or a rectangular geo shape.

Interestingly, the behaviour is different if you switch from `store` to `persistenceKey` - the bounds matching doesn't even work there!
