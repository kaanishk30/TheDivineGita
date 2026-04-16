import Link from 'next/link'

export default function ChapterPage({ params }) {
    const chapters = require('../../../data/chapters.json')
    const verses = require('../../../data/verses.json')

    const chapterId = parseInt(params.id)
    const chapter = chapters.find(c => c.chapter_number === chapterId)
    const chapterVerses = verses.filter(v => v.chapter_number === chapterId)

    if (!chapter) {
        return <div className="comic-container">Chapter not found</div>
    }

    return (
        <div className="comic-container">
            <Link href="/" className="back-button">
                ← BACK
            </Link>

            <div className="chapter-header">
                <h1>CHAPTER {chapter.chapter_number}</h1>
                <h2>{chapter.name_translation}</h2>
                <p style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>
                    {chapter.name_transliterated}
                </p>
            </div>

            <div className="summary-box">
                <h3>📜 CHAPTER SUMMARY</h3>
                <p>{chapter.chapter_summary}</p>
            </div>

            <div className="verses-section">
                <h3>⚡ VERSES ({chapterVerses.length}) ⚡</h3>

                {chapterVerses.map((verse) => (
                    <div key={verse.id} className="verse-panel">
                        <div className="verse-number">
                            VERSE {verse.verse_number}
                        </div>

                        <div className="sanskrit-text">
                            {verse.text}
                        </div>

                        <div className="transliteration">
                            🔤 {verse.transliteration}
                        </div>

                        <div className="word-meanings">
                            💬 <strong>Word Meanings:</strong><br />
                            {verse.word_meanings}
                        </div>
                    </div>
                ))}
            </div>

            <Link href="/" className="back-button" style={{ marginTop: '2rem' }}>
                ← BACK TO CHAPTERS
            </Link>
        </div>
    )
}
