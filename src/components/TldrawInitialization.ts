import { Editor, TLFrameShape, TLShape, TLShapeId } from "@tldraw/tldraw";

export function registerBoundsShape(editor: Editor) {
  // Check if the bounds shape exists
  const boundsShape = editor
    .getCurrentPageShapes()
    .find((shape) => shape.id === "shape:BOUNDS") as TLFrameShape;

  if (!boundsShape) {
    // If the shape doesn't exist, create it
    editor.createShape({
      id: "shape:BOUNDS" as TLShapeId,
      type: "frame",
      x: 0,
      y: 0,
      isLocked: true,
      props: {
        w: 1280,
        h: 720,
      },
      meta: {
        name: "Image Export Bounds",
      },
    });
  }

  // Zoom to fit as initial view
  editor.zoomToFit();
}

// If the first shape is being created, set the bounds
export function registerTldrawShapeCreation(editor: Editor) {
  editor.sideEffects.registerAfterCreateHandler("shape", (shape: any) => {
    console.log("registerTldrawShapeCreation", shape);
    const allShapes = editor.getCurrentPageShapes();
    const validShapes = allShapes.filter(
      (shape) => shape.id !== "shape:BOUNDS",
    );
    const isFirstShape = validShapes.length === 1;

    if (isFirstShape) {
      fitBoundsToShape(editor, shape);
    }
    return shape;
  });
}

function fitBoundsToShape(editor: Editor, shape: any) {
  // Override lock and skip history
  editor.run(
    () => {
      // Update the bounds to fit the shape exactly
      editor.updateShape({
        id: "shape:BOUNDS" as TLShapeId,
        type: "frame",
        x: shape.x,
        y: shape.y,
        props: {
          w: shape.props.w,
          h: shape.props.h,
        },
      });
    },
    {
      ignoreShapeLock: true,
      history: "ignore",
    },
  );

  // Center the camera
  editor.zoomToFit({
    animation: { duration: 250 },
  });

  console.log(editor.getSnapshot());
}
