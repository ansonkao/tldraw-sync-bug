import { Tldraw } from "@tldraw/tldraw";
import { useSyncDemo } from "@tldraw/sync";
import {
  registerBoundsShape,
  registerTldrawShapeCreation,
} from "@/components/TldrawInitialization";
import "@tldraw/tldraw/tldraw.css";

const roomId = "tldraw-sync-bug-dummy-key-1";

export default function TldrawWrapper() {
  const store = useSyncDemo({
    roomId,
  });

  return (
    <Tldraw
      store={store}
      onMount={(editor) => {
        registerBoundsShape(editor);
        registerTldrawShapeCreation(editor);
      }}
      // persistenceKey="tldraw-sync-bug-dummy-key-1"
    />
  );
}
