import { 
    FaCircle,
    FaSquare,
    FaSquareFull,
} from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";

import { 
    ActiveTool, 
    Editor,
    STROKE_COLOR 
} from "@/app/features/editor/types";
import { ToolSidebarClose } from "@/app/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/app/features/editor/components/tool-sidebar-header";
import { ColorPicker } from "@/app/features/editor/components/color-picker";
import { ShapeTool } from "@/app/features/editor/components/shape-tool";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StrokeColorSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const StrokeColorSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: StrokeColorSidebarProps) => {
    const value = editor?.getActiveStrokeColor() || STROKE_COLOR;

    const onClose = () => onChangeActiveTool("select") 

    const onChange = (value: string) => {
        editor?.changeStrokeColor(value);
    };

    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "stroke-color" ? "visible" : "hidden",
            )}
        >
            <ToolSidebarHeader 
                title="Border color"
                description="Add border color to your element"
            />
            <ScrollArea>
                <div className="p-4 space-y-6">
                    <ColorPicker
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};