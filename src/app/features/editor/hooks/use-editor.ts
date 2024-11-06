import {
    useState, 
    useCallback, 
    useMemo 
} from "react";
import { fabric } from "fabric";

import { 
    BuildEditorProps, 
    Editor, 
    CIRCLE_OPTIONS,
    RECTANGLE_OPTIONS,
    TRIANGLE_OPTIONS,
    DIAMOND_OPTIONS,
    FILL_COLOR,
    STROKE_COLOR,
    STROKE_WIDTH,
    EditorHookProps,
    STROKE_DASH_ARRAY,
    TEXT_OPTIONS,
    FONT_FAMILY,
    FONT_WEIGHT,
    FONT_SIZE,
} from "@/app/features/editor/types";
import { useAutoResize } from "@/app/features/editor/hooks/use-auto-resize";
import { useCanvasEvents } from "@/app/features/editor/hooks/use-canvas-events";
import { isTextType } from "@/app/features/editor/utils";
import { ITextboxOptions } from "fabric/fabric-impl";
import { RxFontFamily } from "react-icons/rx";

const buildEditor = ({
    canvas,
    fillColor,
    fontFamily,
    setFillColor,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setFontFamily,
    setStrokeWidth,
    selectedObjects,
    strokeDashArray,
    setStrokeDashArray,
}: BuildEditorProps): Editor => {
    const getWorkspace = () => {

        return canvas
            .getObjects()
            .find((object) => object.name === "clip");
    };

    const center = (object: fabric.Object) => {
        const workspace = getWorkspace();
        const centerPoint = workspace?.getCenterPoint();

        canvas._centerObject(object, centerPoint); //ToDo: (NOT A TODO, but NOTE): changed from `center` to `centerPoint` for clarity
    };

    const addToCanvas = (object: fabric.Object) => {
        center(object);
        canvas.add(object);
        canvas.setActiveObject(object);
      };

    return {
        delete: () => {
            canvas.getActiveObjects().forEach(object => canvas.remove(object));
            canvas.discardActiveObject();
            canvas.renderAll();
        },
        addText: (value, options) => {
            const object = new fabric.Textbox(value, {
                ...TEXT_OPTIONS,
                fill: fillColor,
                ...options,
            });
            addToCanvas(object);
        },
        getActiveOpacity: () => {
            const defaultOpacityLvl = 1;
            const selectedObject = selectedObjects[0];
            
            if (!selectedObject) {
                
                return defaultOpacityLvl;
            };

            const value = selectedObject.get("opacity") || defaultOpacityLvl;

            return value;
        },
        changeFontLinethrough: (value: boolean) => {
            canvas
                .getActiveObjects()
                .forEach(object => {
                    if (isTextType(object.type)) {
                        // @ts-ignore
                        // FAULTY TS LIBRARY; `linethrough` EXISTS
                        object.set({ linethrough: value });
                    }
                });

                canvas.renderAll();
        },
        getActiveFontLinethrough: () => {
            const DEFAULT_FONT_STYLE = "normal";
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                
                return DEFAULT_FONT_STYLE;
            };

            // @ts-ignore
            // FAULTY TS LIBRARY; `linethrough` EXISTS
            const value = selectedObject.get("linethrough") || false;

            return value;
        },
        changeFontUnderline: (value: boolean) => {
            canvas
                .getActiveObjects()
                .forEach(object => {
                    if (isTextType(object.type)) {
                        // @ts-ignore
                        // FAULTY TS LIBRARY; `underline` EXISTS
                        object.set({ underline: value });
                    }
                });

                canvas.renderAll();
        },
        getActiveFontUnderline: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                
                return false;
            };

            // @ts-ignore
            // FAULTY TS LIBRARY; `underline` EXISTS
            const value = selectedObject.get("underline") || false;

            return value;
        },
        changeTextAlign: (value: string) => {
            canvas
                .getActiveObjects()
                .forEach(object => {
                    if (isTextType(object.type)) {
                        // @ts-ignore
                        // FAULTY TS LIBRARY; `textAlign` EXISTS
                        object.set({ textAlign: value });
                    }
                });

                canvas.renderAll();
        },
        getActiveTextAlign: () => {
            const selectedObject = selectedObjects[0];
            const DEFAULT_TEXT_ALIGNMENT = "left";

            if (!selectedObject) {
                
                return false;
            };

            // @ts-ignore
            // FAULTY TS LIBRARY; `textAlign` EXISTS
            const value = selectedObject.get("textAlign") || DEFAULT_TEXT_ALIGNMENT;

            return value;
        },
        changeFontSize: (value: number) => {
            canvas
                .getActiveObjects()
                .forEach(object => {
                    if (isTextType(object.type)) {
                        // @ts-ignore
                        // FAULTY TS LIBRARY; `fontSize` EXISTS
                        object.set({ fontSize: value });
                    }
                });

                canvas.renderAll();
        },
        getActiveFontSize: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                
                return FONT_SIZE;
            };

            // @ts-ignore
            // FAULTY TS LIBRARY; `fontSize` EXISTS
            const value = selectedObject.get("fontSize") || FONT_SIZE;

            return value;
        },
        changeFontStyle: (value: string) => {
            canvas
                .getActiveObjects()
                .forEach(object => {
                    if (isTextType(object.type)) {
                        // @ts-ignore
                        // FAULTY TS LIBRARY; fontStyle EXISTS
                        object.set({ fontStyle: value });
                    }
                });

                canvas.renderAll();
        },
        getActiveFontStyle: () => {
            const DEFAULT_FONT_STYLE = "normal";
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                
                return DEFAULT_FONT_STYLE;
            };

            // @ts-ignore
            // FAULTY TS LIBRARY; fontFamily EXISTS
            const value = selectedObject.get("fontStyle") || DEFAULT_FONT_STYLE;

            // CURRENTLY GRADIENTS & PATTERNS NOT SUPPORTED
            return value;
            // return; // <- remove "as string;" to accept fabric.Pattern && fabric.Gradient as well
        },
        changeFontWeight: (value: number) => {
            canvas
                .getActiveObjects()
                .forEach(object => {
                    if (isTextType(object.type)) {
                        // @ts-ignore
                        // FAULTY TS LIBRARY; fontWeight EXISTS
                        object.set({ fontWeight: value });
                    }
                });

                canvas.renderAll();
        },
        changeOpacity: (value: number) => {
            canvas
                .getActiveObjects()
                .forEach(object => {
                    object.set({ opacity: value });
                });

                canvas.renderAll();
        },
        bringForward: () => {
            canvas
                .getActiveObjects()
                .forEach((object) => {
                    canvas.bringForward(object);
                });

                canvas.renderAll();
                
                const workspace = getWorkspace();
                workspace?.sendToBack();
        },
        sendBackwards: () => {
            canvas
                .getActiveObjects()
                .forEach((object) => {
                    canvas.sendBackwards(object);
                });

                canvas.renderAll();
                
                const workspace = getWorkspace();
                workspace?.sendToBack();
        },
        changeFontFamily: (value: string) => {
            setFontFamily(value);
            canvas
                .getActiveObjects()
                .forEach((object) => {
                    if (isTextType(object.type)) {
                        // @ts-ignore
                        // FAULTY TS LIBRARY; fontFamily EXISTS
                        object.set({ fontFamily: value });
                    }
                });

            canvas.renderAll();
        },
        changeFillColor: (value: string) => {
            setFillColor(value);
            canvas
                .getActiveObjects()
                .forEach((object) => {
                    object.set({ fill: value });
                });

            canvas.renderAll();
        },
        changeStrokeColor: (value: string) => {
            setStrokeColor(value);
            canvas
                .getActiveObjects()
                .forEach((object) => {
                    // TEXT TYPES DON'T HAVE STROKE
                    if (isTextType(object.type)) {
                        object.set({ fill: value });

                        return;
                    }

                    object.set({ stroke: value });
                }); 

                canvas.renderAll();
        },
        changeStrokeWidth: (value: number) => {
            setStrokeWidth(value);
            canvas
                .getActiveObjects()
                .forEach((object) => {
                    object.set({ strokeWidth: value });
                });

                canvas.renderAll();
        },
        changeStrokeDashArray: (value: number[]) => {
            setStrokeDashArray(value);
            canvas
                .getActiveObjects()
                .forEach((object) => {
                    object.set({ strokeDashArray: value });
                });

                canvas.renderAll();
        },
        addCircle: () => {
            const object = new fabric.Circle({
                ...CIRCLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
            });
            addToCanvas(object);
        },
        addSoftRectangle: () => {
            const object = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                rx: 45,
                ry: 45,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray,
            });
            addToCanvas(object);
        },
        addRectangle: () => {
            const object = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray,
            });
            addToCanvas(object);

        },
        addTriangle: () => {
            const object = new fabric.Triangle({
                ...TRIANGLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray,
            });
            addToCanvas(object);
        },
        addInverseTriangle: () => {
            const HEIGHT = TRIANGLE_OPTIONS.height;
            const WIDTH  = TRIANGLE_OPTIONS.width;
            
            const object = new fabric.Polygon(
                [
                    { x: 0, y: 0 },
                    { x: WIDTH, y: 0 },
                    { x: WIDTH / 2, y: HEIGHT},

                ],
                {
                    ...TRIANGLE_OPTIONS,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray,
                }
            );
            addToCanvas(object);
        },
        addDiamond: () => {
            const HEIGHT = DIAMOND_OPTIONS.height;
            const WIDTH  = DIAMOND_OPTIONS.width;
            
            const object = new fabric.Polygon(
                [
                    { x: WIDTH / 2, y: 0 },              // i.e. TOP MIDDLE
                    { x: WIDTH, y: HEIGHT / 2 },         // i.e. RIGHT MIDDLE
                    { x: WIDTH / 2, y: HEIGHT },         // i.e. BOTTOM MIDDLE
                    { x: 0, y: HEIGHT / 2 },             // i.e. LEFT MIDDLE
                ],
                {
                    ...DIAMOND_OPTIONS,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray,
                }
            );
            addToCanvas(object);
        },
        canvas,
        getActiveFillColor: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                
                return fillColor;
            };

            const value = selectedObject.get("fill") || fillColor;

            // CURRENTLY GRADIENTS & PATTERNS NOT SUPPORTED
            return value as string;
            // return; // <- remove "as string;" to accept fabric.Pattern && fabric.Gradient as well
        },
        getActiveFontWeight: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                
                return FONT_WEIGHT;
            };

            // @ts-ignore
            // FAULTY TS LIBRARY; fontFamily EXISTS
            const value = selectedObject.get("fontWeight") || FONT_WEIGHT;

            // CURRENTLY GRADIENTS & PATTERNS NOT SUPPORTED
            return value;
            // return; // <- remove "as string;" to accept fabric.Pattern && fabric.Gradient as well
        },
        getActiveFontFamily: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                
                return fontFamily;
            };

            // @ts-ignore
            // FAULTY TS LIBRARY; fontFamily EXISTS
            const value = selectedObject.get("fontFamily") || fontFamily;

            // CURRENTLY GRADIENTS & PATTERNS NOT SUPPORTED
            return value;
            // return; // <- remove "as string;" to accept fabric.Pattern && fabric.Gradient as well
        },
        getActiveStrokeColor: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                
                return strokeColor;
            };

            const value = selectedObject.get("stroke") || strokeColor;

            return value;
        },
        getActiveStrokeWidth: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                
                return strokeWidth;
            };

            const value = selectedObject.get("strokeWidth") || strokeWidth;

            return value;
        },
        getActiveStrokeDashArray: () => {
            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                
                return strokeDashArray;
            };

            const value = selectedObject.get("strokeDashArray") || strokeDashArray;

            return value;
        },
        selectedObjects,
    };
};

export const useEditor = ({
    clearSelectionCallback,
}: EditorHookProps) => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

    const [fontFamily, setFontFamily] = useState(FONT_FAMILY);
    const [fillColor, setFillColor]   = useState(FILL_COLOR);
    const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
    const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
    const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY);

    useAutoResize({
        canvas,
        container,
    });

    useCanvasEvents({
        canvas,
        setSelectedObjects,
        clearSelectionCallback,
    });

    const editor = useMemo(() => {
        console.log("editor")
        if (canvas) {

            return buildEditor({
                canvas,
                fillColor,
                strokeColor,
                strokeWidth,
                setFillColor,
                strokeDashArray,
                setStrokeDashArray,
                setStrokeColor,
                setStrokeWidth,
                selectedObjects,
                fontFamily,
                setFontFamily,
            });
        }

        return undefined;
    }, [
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        fontFamily,
        setFontFamily,
        selectedObjects,
        strokeDashArray,
    ]);

    const init = useCallback(
        ({
            initialCanvas,
            initialContainer,
        }: {
            initialCanvas: any;
            initialContainer: HTMLDivElement;
        }) => {
            fabric.Object.prototype.set({
                cornerColor: "#fff",
                cornerStyle: "circle",
                borderColor: "#3b82f6",
                borderScaleFactor:  1.5,
                transparentCorners: false,
                borderOpacityWhenMoving: 1,
                cornerStrokeColor: "#3b82f6",
            });

            const initialWorkspace = new fabric.Rect({
                width:  900,
                height: 1200,
                name: "clip",
                fill: "white",
                selectable:  false,
                hasControls: false,
                shadow: new fabric.Shadow({
                    color: "rgba(0,0,0,0.8)",
                    blur:  5,
                }),
            });

            initialCanvas.setWidth(initialContainer.offsetWidth);
            initialCanvas.setHeight(initialContainer.offsetHeight);

            initialCanvas.add(initialWorkspace);
            initialCanvas.centerObject(initialWorkspace);
            initialCanvas.clipPath = initialWorkspace;

            setCanvas(initialCanvas);
            setContainer(initialContainer);
        },
        []
    );

    return { init, editor };
};
