import type { IconName } from "@/components/ui/Icon";
import type { Tone } from "@/components/ui/ProgressBar";
import type { Status } from "@/components/ui/StatusPill";

export type SideItem = {
    label: string;
    icon: IconName;
    active?: boolean;
}

export interface SideGroup {
    id: string;
    title?: string;
    items: SideItem[];
}

export interface Stat {
    label: string;
    value: string;
    delta: string;
}

export interface Task {
    title: string;
    id?: string;
    status?: Status;

}
export interface BoardColumn {
    id: string;
    title: string;
    tasks: Task[];
}
export type LearningItem = {
    name: string;
    value: number;
    tone: Tone;
};