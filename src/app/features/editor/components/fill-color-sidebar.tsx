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
    FILL_COLOR 
} from "@/app/features/editor/types";
import { ToolSidebarClose } from "@/app/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/app/features/editor/components/tool-sidebar-header";
import { ColorPicker } from "@/app/features/editor/components/color-picker";
import { ShapeTool } from "@/app/features/editor/components/shape-tool";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FillColorSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FillColorSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: FillColorSidebarProps) => {
    const value = editor?.getActiveFillColor() || FILL_COLOR;

    const onClose = () => onChangeActiveTool("select") 

    const onChange = (value: string) => {
        editor?.changeFillColor(value);
    };

    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "fill" ? "visible" : "hidden",
            )}
        >
            <ToolSidebarHeader 
                title="Fill color"
                description="Add fill color to your element"
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