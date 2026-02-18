import ThemeToggle from "./ThemeToggle";
import React from 'react';

interface Props {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, children }: Props) {
    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
                <h1 className="text-xl font-bold leading-tight">{title}</h1>
                {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-1">
                {children}
                <ThemeToggle />
            </div>
        </div>
    );
}
