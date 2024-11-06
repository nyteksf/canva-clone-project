import { 
    ActiveTool, 
    Editor,
    STROKE_DASH_ARRAY,
    STROKE_WIDTH
} from "@/app/features/editor/types";
import { ToolSidebarClose }  from "@/app/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/app/features/editor/components/tool-sidebar-header";

import { cn } from "@/lib/utils";
import { Label }  from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StrokeWidthSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const StrokeWidthSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: StrokeWidthSidebarProps) => {
    const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
    const typeValue  = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;

    const onClose = () => onChangeActiveTool("select") 

    const onChangeStrokeWidth = (value: number) => {
        editor?.changeStrokeWidth(value);
    };
    
    const onChangeStrokeType = (value: number[]) => {
        editor?.changeStrokeDashArray(value);
    };

    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "stroke-width" ? "visible" : "hidden",
            )}
        >
            <ToolSidebarHeader 
                title="Border options"
                description="Modify the border width of your element"
            />
            <ScrollArea>
                <div className="p-4 space-y-6 border-b">
                    <Label className="text-sm">Border width</Label>
                    <Slider 
                        value={[widthValue]}
                        onValueChange={(values) => {
                            onChangeStrokeWidth(values[0]);
                        }}
                        className="background-[#242424]"
                    />
                </div>
                <div className="p-4 space-y-6 border-b">
                    <Label className="text-sm">Border type</Label>
                    <Button
                        onClick={() => onChangeStrokeType([])}
                        variant="secondary"
                        size="lg"
                        className={cn(
                            "w-full h-16 justify-start text-left py-[8px] px-[16px]",
                            JSON.stringify(typeValue) === `[]` && "border-[1.5px] border-blue-500"
                        )}
                    >
                        <div className="w-full border-[#242424] rounded-full border-4" />
                    </Button>
                    <Button
                        onClick={() => onChangeStrokeType([5, 5])}
                        variant="secondary"
                        size="lg"
                        className={cn(
                            "w-full h-16 justify-start text-left py-[8px] px-[16px]",
                            JSON.stringify(typeValue) === `[5,5]` && "border-[1.5px] border-blue-500"
                        )}
                    >
                        <div className="w-full border-[#242424] rounded-full border-4 border-dashed" />
                    </Button>
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};