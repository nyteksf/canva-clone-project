"use client";

import {
    LayoutTemplate,
    ImageIcon,
    Pencil,
    PresentationIcon,
    SettingsIcon,
    ShapesIcon,
    Sparkles,
    TypeIcon,
} from "lucide-react";

import { SidebarItem } from "@/app/features/editor/components/sidebar-item";
import { ActiveTool } from "@/app/features/editor/types";


interface SidebarProps {
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Sidebar = ({
    activeTool,
    onChangeActiveTool,
}: SidebarProps) => {

    return (
        <aside className="bg-white flex flex-col w-[100px] h-full border-r overflow-y-auto">
            <ul className="flex flex-col">
                <SidebarItem 
                    icon={LayoutTemplate}
                    label="Design"
                    isActive={activeTool === "templates"}
                    onClick={() => onChangeActiveTool("templates")}
                />
                <SidebarItem 
                    icon={ImageIcon}
                    label="Image"
                    isActive={activeTool === "images"}
                    onClick={() => onChangeActiveTool("images")}
                />
                <SidebarItem 
                    icon={TypeIcon}
                    label="Text"
                    isActive={activeTool === "text"}
                    onClick={() => onChangeActiveTool("text")}
                />
                <SidebarItem 
                    icon={ShapesIcon}
                    label="Shapes"
                    isActive={activeTool === "shapes"}
                    onClick={() => onChangeActiveTool("shapes")}
                />
                <SidebarItem 
                    icon={Sparkles}
                    label="AI"
                    isActive={activeTool === "ai"}
                    onClick={() => onChangeActiveTool("ai")}
                />
                <SidebarItem 
                    icon={SettingsIcon}
                    label="Settings"
                    isActive={activeTool === "settings"}
                    onClick={() => onChangeActiveTool("settings")}
                />
            </ul>
        </aside>
    );
};