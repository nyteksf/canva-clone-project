import { 
    FaCircle,
    FaSquare,
    FaSquareFull,
} from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";

import { ActiveTool, Editor } from "@/app/features/editor/types";
import { ToolSidebarHeader } from "@/app/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/app/features/editor/components/tool-sidebar-close";
import { ShapeTool } from "@/app/features/editor/components/shape-tool";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ShapeSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ShapeSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: ShapeSidebarProps) => {
    const onClose = () => onChangeActiveTool("select") 

    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "shapes" ? "visible" : "hidden",
            )}
        >
            <ToolSidebarHeader 
                title="Shapes"
                description="Add shapes to your canvas"
            />
            <ScrollArea>
                <div className="grid grid-cols-3 gap-4 p-4">
                    <ShapeTool 
                        onClick={() => {
                            editor?.addCircle();
                            console.log("ADDING CIRCLE TO CANVAS...");                           
                        }}
                        icon={FaCircle}
                    />
                    <ShapeTool 
                        onClick={() => {
                            editor?.addSoftRectangle();
                            console.log("ADDING A (SOFT) SQUARE TO CANVAS...");
                        }}
                        icon={FaSquare}
                    />
                    <ShapeTool 
                        onClick={() => {
                            editor?.addRectangle();
                            console.log("ADDING SQUARE TO CANVAS...");
                        }}
                        icon={FaSquareFull}
                    />
                    <ShapeTool 
                        onClick={() => {
                            editor?.addTriangle();
                            console.log("ADDING TRIANGLE TO CANVAS...");
                        }}
                        icon={IoTriangle}
                    />
                    <ShapeTool 
                        onClick={() => {
                            editor?.addInverseTriangle();
                            console.log("ADDING INVERSE TRIANGLE TO CANVAS...");
                        }}
                        icon={IoTriangle}
                        iconClassName="rotate-180"
                    />
                    <ShapeTool 
                        onClick={() => {
                            editor?.addDiamond();
                            console.log("ADDING DIAMOND TO CANVAS...");
                        }}
                        icon={FaDiamond}
                    />
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};