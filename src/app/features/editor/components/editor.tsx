"use client";

import { 
    useRef, 
    useState,
    useEffect,
    useCallback, 
} from "react";
import { fabric } from "fabric";

import { Footer } from "@/app/features/editor/components/footer";
import { Navbar } from "@/app/features/editor/components/navbar";
import { Sidebar } from "@/app/features/editor/components/sidebar";
import { Toolbar } from "@/app/features/editor/components/toolbar";
import { useEditor } from "@/app/features/editor/hooks/use-editor";
import {
    ActiveTool,
    selectionDependentTools,
} from "@/app/features/editor/types";

import { ShapeSidebar } from "@/app/features/editor/components/shape-sidebar";
import { OpacitySidebar } from "@/app/features/editor/components/opacity-sidebar";
import { FillColorSidebar } from "@/app/features/editor/components/fill-color-sidebar";
import { StrokeColorSidebar } from "@/app/features/editor/components/stroke-color-sidebar";
import { StrokeWidthSidebar } from "@/app/features/editor/components/stroke-width-sidebar";
import { TextSidebar } from "@/app/features/editor/components/text-sidebar";
import { FontSidebar } from "@/app/features/editor/components/font-sidebar";
import { ImageSidebar } from "@/app/features/editor/components/image-sidebar";

const Editor = () => {
    const [activeTool, setActiveTool] = useState<ActiveTool>("select");

    const onClearSelection = useCallback(() => {
        if (selectionDependentTools.includes(activeTool)) {
            setActiveTool("select");
        }
    }, [activeTool]);

    const { init, editor } = useEditor({
        clearSelectionCallback: onClearSelection,
    });

    // EASY DE-SELECT OF TOOLS BY CLICKING ACTIVE TOOL
    const onChangeActiveTool = useCallback(
        (tool: ActiveTool) => {
            if (tool === activeTool) {
                return setActiveTool("select");
            }

            if (tool === "draw") {
                // ToDo: Enable draw mode when active
            }

            if (activeTool === "draw") {
                // ToDo: Disable draw mode when inactive
            }

            setActiveTool(tool);
        },
        [activeTool]
    );

    const canvasRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {

            controlsAboveOverlay: true,
            preserveObjectStacking: true,
        });

        init({
            initialCanvas: canvas,
            initialContainer: containerRef.current!,
        });

        // REMOVE: NOTE: NECESSARY BECAUSE IN STRICT MODE, REACT RUNS RENDERING/EFFECTS TWICE
        // (TO ENSURE RESULT IS SAME REGARDLESS OF AMOUNT OF RENDERS)
        return () => {
            canvas.dispose();
        };
    }, [init]);

    return (
        <div className="h-full flex flex-col">
            <Navbar
                activeTool={activeTool}
                onChangeActiveTool={onChangeActiveTool}
            />
            <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
                <Sidebar
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <ShapeSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <FillColorSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <StrokeColorSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <StrokeWidthSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <OpacitySidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <TextSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <FontSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <ImageSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
                    <Toolbar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                        key={JSON.stringify(editor?.canvas.getActiveObject())}
                    />
                    <div
                        className="flex-1 h-[calc(100%-124px)] bg-muted"
                        ref={containerRef}
                    >
                        <canvas ref={canvasRef} />
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
};

export default Editor;
