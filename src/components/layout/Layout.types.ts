export type Variant = "football" | "basketball" | "tennis";

export interface LayoutProps {
    children: React.ReactNode;
    variant?: Variant;
}
