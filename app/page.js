import Link from 'next/link'

export default function Home() {
    const chapters = require('../data/chapters.json')

    return (
        <div className="comic-container">
            <h1 className="comic-title">BHAGAVAD GITA</h1>
            <p className="comic-subtitle">⚡ The Divine Comic Adventure ⚡</p>

            <div className="chapter-grid">
                {chapters.map((chapter) => (
                    <Link
                        key={chapter.chapter_number}
                        href={`/chapter/${chapter.chapter_number}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="chapter-card">
                            <div className="chapter-number">#{chapter.chapter_number}</div>
                            <h2 className="chapter-name">{chapter.name_translation}</h2>
                            <p className="chapter-meaning">{chapter.name_meaning}</p>
                            <div className="chapter-verses">
                                📖 {chapter.verses_count} verses
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
