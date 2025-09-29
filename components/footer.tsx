import Link from 'next/link'

const links = [
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Admin', href: '/admin' },
]

const FooterSection=()=> {
    return (
        <footer className="border-b bg-white py-8 dark:bg-transparent">
            <div className="mx-auto max-w-5xl px-6">
                <div className="flex flex-wrap justify-between gap-6">
                    <span className="text-muted-foreground order-last block text-center text-sm md:order-first">© {new Date().getFullYear()} @jarek, All rights reserved</span>
                    <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-muted-foreground hover:text-primary block duration-150">
                                <span>{link.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default FooterSection