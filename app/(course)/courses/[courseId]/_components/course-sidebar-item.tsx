"use client";

import { cn } from "@/lib/utils";
import { Lock, CheckCircle, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
    id: string;
    label: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean;
}

export const CourseSidebarItem = ({
    id,
    label,
    isCompleted,
    courseId,
    isLocked
}: CourseSidebarItemProps) => {

    const pathname = usePathname();
    const router = useRouter();

    const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle)
    const isActive = pathname.includes(id);

    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`);
    };

    return(
        <button
            onClick={onClick}
            type="button"
            className={cn(
                `flex items-center gap-x-2 text-slate-500 text-sm 
                font-[500] pl-6 transition-all`,
                isActive && `bg-white text-slate-900 font-semibold`,
                isCompleted && `text-green-900`,
                isCompleted && isActive && `text-green-900/20`,

            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon 
                    size={22}
                    className={cn(
                        `text-slate-500`,
                        isActive && `text-slate-900`,
                        isCompleted && `text-green-900`,
                    )}
                />
                {label}
            </div>
            <div className={cn(
                "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
                isActive && `opacity-100`,
                isCompleted && `border-green-500`,
            )}></div>
        </button>
    );
};