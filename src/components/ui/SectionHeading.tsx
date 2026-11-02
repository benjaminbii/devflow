import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    title : string;
    description?: ReactNode;
    className?: string;
}

export function SectionHeading({
    title,
    description,
    className
}: SectionHeadingProps) {
    return (
        <div className={cn("mb-12 max-w-[640px]", className)}>
            <h2 className="mb-3 text-[clamp(28px,4vw,40px)] font-[650] leading-[1.12] tracking-[-0.025em] text-foreground">{title}</h2>
            {description && (
                <p className="text-lg text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );
}





