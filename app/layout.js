import './globals.css'
import GitaChatbot from './components/GitaChatbot'

export const metadata = {
    title: 'Bhagavad Gita Comic',
    description: 'Interactive Bhagavad Gita in comic format',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}

                {/* 👇 ADD THIS */}
                <GitaChatbot />
            </body>
        </html>
    )
}