const Footer = () => {
    const footerLinks = [
        {
            title: "About",
            links: [
                { name: "Our Story", href: "#" },
                { name: "Team", href: "#" },
                { name: "Careers", href: "#" },
            ],
        },
        {
            title: "Privacy",
            links: [
                { name: "Privacy Policy", href: "#" },
                { name: "Data Protection", href: "#" },
                { name: "Security", href: "#" },
            ],
        },
        {
            title: "Terms",
            links: [
                { name: "Terms of Service", href: "#" },
                { name: "Usage Policy", href: "#" },
                { name: "FAQs", href: "#" },
            ],
        },
        {
            title: "Contact",
            links: [
                { name: "Support", href: "#" },
                { name: "Sales", href: "#" },
                { name: "Press", href: "#" },
            ],
        },
    ]

    return (
        <footer className="bg-[#001337] text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {footerLinks.map((column) => (
                        <div key={column.title}>
                            <h3 className="text-sm font-medium mb-4">{column.title}</h3>
                            <ul className="space-y-2">
                                {column.links.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                        <svg className="h-5 w-5 text-white mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                        <span className="font-medium">OptiCheck</span>
                    </div>
                    <div className="text-xs text-gray-400">© 2025 OptiCheck Technologies. All rights reserved.</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
