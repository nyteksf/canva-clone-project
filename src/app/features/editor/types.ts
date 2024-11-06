import { fabric } from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";
import * as material from "material-colors";

export const fonts = [
    // WEB FONTS
    "Arial",
    "Arial Black",
    "Bookman Old Style",
    "Brush Script MT",
    "Calibri", // DEFAULT IN MICROSOFT OFFICE
    "Candara", // SIMILAR TO CALIBRI
    "Century Gothic",
    "Comic Sans MS",
    "Courier New",
    "Futura", // CLASSIC GEOMETRIC SANS-SERIF FONT
    "Franklin Gothic Medium",
    "Garamond",
    "Geneva", // FOUND ON MANY OLDER MACOS SYSTEMS
    "Georgia",
    "Gill Sans", // ELEGANT SANS-SERIF FONT
    "Helvetica", // COMMON ON MACOS
    "Impact",
    "Lucida Console",
    "Lucida Handwriting", // SCRIPT FONT
    "Lucida Sans",
    "Lucida Sans Typewriter", // MONOSPACE FONT
    "Monospace", // GENERIC FALLBACK FOR MONOSPACE FONTS
    "Optima", // COMMON MACOS FONT
    "Palatino Linotype",
    "Perpetua",
    "Sans-Serif", // GENERIC FALLBACK FOR SANS-SERIF FONTS
    "Segoe UI",
    "Tahoma",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana",
    // GOOGLE FONTS
    "Bebas Neue",
    "Cabin",
    "Fira Sans",
    "Inter",
    "Lato",
    "Lora",
    "Merriweather",
    "Montserrat",
    "Muli",
    "Nunito",
    "Open Sans",
    "Oswald",
    "Playfair Display",
    "Poppins",
    "Quicksand",
    "Raleway",
    "Roboto",
    "Source Sans Pro",
    "Space Grotesk",
    "Work Sans"
];

// IF NO ELEMENT SELECTED, THEN CLOSE TOOLBARS, SWITCH TO "SELECT" TOOL
export const selectionDependentTools = [
    "fill",
    "font",
    "filter",
    "opacity",
    "remove-bg",
    "stroke-color",
    "stroke-width",
];

export const colors = [
    // RED TO VIOLET (ROYGBIV) // COLOR KEY:
    material.red["200"], // LIGHT RED
    material.red["500"], // RED
    material.red["900"], // DARK RED
    material.pink["500"], // PINK
    material.purple["500"], // PURPLE
    material.deepPurple["500"], // DEEP PURPLE
    material.indigo["500"], // INDIGO
    material.blue["200"], // LIGHT BLUE
    material.blue["500"], // BLUE
    material.blue["900"], // DARK BLUE
    material.cyan["500"], // CYAN
    material.teal["500"], // TEAL
    material.green["200"], // LIGHT GREEN
    material.green["500"], // GREEN
    material.green["900"], // DARK GREEN
    material.lime["500"], // LIME
    material.yellow["500"], // YELLOW
    material.amber["500"], // AMBER
    material.orange["500"], // ORANGE
    material.deepOrange["500"], // DEEP ORANGE

    // NEUTRALS
    material.brown["500"], // BROWN
    material.blueGrey["500"], // BLUE GRAY
    material.grey["50"], // VERY LIGHT GRAY
    "#f5f5f5", // WHITESMOKE
    material.grey["200"], // LIGHT GRAY
    material.grey["500"], // MEDIUM GRAY
    material.grey["700"], // DARK GRAY
    "#333333", // CHARCOAL
    "#242424", // DARK CHARCOAL

    // WHITE/BLACK
    "black", // BLACK
    "#ffffff", // WHITE

    // TRANSPARENT
    "transparent", // TRANSPARENT
];

export type ActiveTool =
    | "select"
    | "shapes"
    | "text"
    | "images"
    | "draw"
    | "fill"
    | "stroke-color"
    | "stroke-width"
    | "font"
    | "opacity"
    | "filter"
    | "settings"
    | "ai"
    | "remove-bg"
    | "templates";

export const FILL_COLOR = "rgba(0, 0, 0, 1)";
export const STROKE_COLOR = "rgba(0, 0, 0, 1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];
export const FONT_FAMILY = "Arial";
export const FONT_SIZE = 32;
export const FONT_WEIGHT = 400;

export const CIRCLE_OPTIONS = {
    left: 100,
    top: 100,
    radius: 225,
    fill: FILL_COLOR,
    stroke_color: STROKE_COLOR,
    stroke_width: STROKE_WIDTH,
};

export const RECTANGLE_OPTIONS = {
    top: 100,
    angle: 0,
    left: 100,
    width: 400,
    height: 400,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    stroke_width: STROKE_WIDTH,
};

export const TRIANGLE_OPTIONS = {
    top: 100,
    angle: 0,
    left: 100,
    width: 400,
    height: 400,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    stroke_width: STROKE_WIDTH,
};

export const TEXT_OPTIONS = {
    top: 100,
    left: 100,
    fontSize: FONT_SIZE,
    fontFamily: FONT_FAMILY,
    type: "textbox",
    fill: FILL_COLOR,
};

export const DIAMOND_OPTIONS = {
    top: 100,
    angle: 0,
    left: 100,
    width: 600,
    height: 600,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
};

export interface EditorHookProps {
    clearSelectionCallback?: () => void;
}

export type BuildEditorProps = {
    canvas: fabric.Canvas;
    fillColor: string;
    fontFamily: string;
    strokeColor: string;
    strokeWidth: number;
    strokeDashArray: number[];
    selectedObjects: fabric.Object[];
    setFillColor: (value: string) => void;
    setFontFamily: (value: string) => void;
    setStrokeColor: (value: string) => void;
    setStrokeWidth: (value: number) => void;
    setStrokeDashArray: (value: number[]) => void;
};

export interface Editor {
    delete: () => void;
    changeFontSize: (fontWeight: number) => void;
    getActiveFontSize: () => number;
    changeTextAlign: (fontWeight: string) => void;
    getActiveTextAlign: () => string;
    changeFontUnderline: (fontWeight: boolean) => void;
    getActiveFontUnderline: () => boolean;
    changeFontLinethrough: (fontWeight: boolean) => void;
    getActiveFontLinethrough: () => boolean;
    changeFontStyle: (fontWeight: string) => void;
    getActiveFontStyle: () => string;
    changeFontWeight: (fontWeight: number) => void;
    getActiveFontWeight: () => number;
    getActiveFontFamily: () => string;
    addText: (value: string, options?: ITextboxOptions) => void;
    getActiveOpacity: () => number;
    changeOpacity: (value: number) => void;
    bringForward: () => void;
    sendBackwards: () => void;
    changeFillColor: (value: string) => void;
    changeFontFamily: (value: string) => void;
    changeStrokeColor: (value: string) => void;
    changeStrokeWidth: (value: number) => void;
    changeStrokeDashArray: (value: number[]) => void;
    addCircle: () => void;
    addSoftRectangle: () => void;
    addRectangle: () => void;
    addTriangle: () => void;
    addInverseTriangle: () => void;
    addDiamond: () => void;
    canvas: fabric.Canvas;
    getActiveFillColor: () => string; // | fabric.Pattern | fabric.Gradient; // <- If returning fill color of pattern or gradient in future, uncomment this
    getActiveStrokeColor: () => string;
    getActiveStrokeWidth: () => number;
    getActiveStrokeDashArray: () => number[];
    selectedObjects: fabric.Object[];
}
