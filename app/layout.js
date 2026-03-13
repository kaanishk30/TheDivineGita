import './globals.css'

export const metadata = {
    title: 'Bhagavad Gita Comic',
    description: 'Interactive Bhagavad Gita in comic format',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
