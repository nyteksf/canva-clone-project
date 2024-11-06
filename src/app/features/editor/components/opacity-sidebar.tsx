import { 
    useState, 
    useEffect,
    useMemo, 
} from "react";

import { 
    ActiveTool, 
    Editor,
} from "@/app/features/editor/types";
import { ToolSidebarClose }  from "@/app/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/app/features/editor/components/tool-sidebar-header";

import { cn } from "@/lib/utils";
import { Label }  from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OpacitySidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const OpacitySidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: OpacitySidebarProps) => {
    const defaultOpacityLvl = 1;
    const initialValue = editor?.getActiveOpacity() || defaultOpacityLvl;
    const selectedObject = useMemo(() => editor?.selectedObjects[0], [editor?.selectedObjects]);

    const [opacity, setOpacity] = useState(initialValue);

    useEffect(() => {
        if (selectedObject) {
            setOpacity(selectedObject.get("opacity") || defaultOpacityLvl);
        }
    }, [selectedObject]);

    const onClose = () => onChangeActiveTool("select") 

    const onChange = (value: number) => {
        editor?.changeOpacity(value);
        setOpacity(value);
    };

    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "opacity" ? "visible" : "hidden",
            )}
        >
            <ToolSidebarHeader 
                title="Opacity"
                description="Modify the opacity of the selected element"
            />
            <ScrollArea>
                <div className="p-4 space-y-6 border-b">
                    <Slider 
                        value={[opacity]}
                        onValueChange={(values) => onChange(values[0])}
                        max={1}
                        min={0}
                        step={0.01}
                    />
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};