export type FooterColumn = {
    title: string;
    links: { label: string; href: string }[];
};

export const footerColumns: FooterColumn[] = [
    {
        title: "Product",
        links: [
            { label: "Features", href: "#features" },
            { label: "How it works", href: "#how" },
            { label: "Showcase", href: "#showcase" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Documentation", href: "#" },
            { label: "Changelog", href: "#" },
            { label: "GitHub", href: "#" },
        ],
    },
    {
        title: "Account",
        links: [
            { label: "Log in", href: "#" },
            { label: "Register", href: "#" },
        ],
    },
];