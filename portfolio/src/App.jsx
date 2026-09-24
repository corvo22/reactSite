import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import './App.css'

function SpotifyContent() {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentTracks = async () => {
      try {
        const response = await fetch('/api/recent-tracks');
        if (!response.ok) {
          throw new Error('Failed to fetch tracks');
        }
        const data = await response.json();
        setTracks(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching recent tracks:', err);
      }
    };

    fetchRecentTracks();
    // refresh every 5 minutes
    const intervalId = setInterval(fetchRecentTracks, 5 * 60 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return(
    <ul>
      {tracks.map((track, index) => (
        <li  key={index}> {track.name} <br/> {track.artist}</li>
      ))}
    </ul>
  )

}

function SectionContent({contentType, sectionId, onContentChange }) {
  const [markdownContent, setMarkdownContent] = useState('');
  var endpoint;

  if(contentType == "section") {
    endpoint = `/api/sections/${sectionId}`
  }
  else {
    endpoint = `/api/projects/${sectionId}`
  }


  // defaults to a GET
  useEffect(() => {
    fetch(endpoint)
      .then(response => response.text())
      .then(markdown => setMarkdownContent(markdown))
      .catch(error => console.error(error))
  }, [endpoint]);

  return (
    <ReactMarkdown
      components={{
        // For react-markdown v6+, this is how you handle code blocks
        code({children}) {
          // Log the entire props to see what's available
          
          // The code content is in the children prop
          const codeContent = String(children).trim();
          
          if(codeContent.startsWith('button')) {
            const [, contentType, content, text] = codeContent.split(':')
          
            return (
              <button className='button round-button' onClick={() => onContentChange({ contentType: contentType, content: content}) }>{text}</button>
            )

          }
        }
      }}
    >
      {markdownContent}
    </ReactMarkdown>
  );
}

function App() {
  const [contentState, setContent] = useState({contentType: "section", content: "about"});
  return (
    <div className="layout-container">
      <div className="left-col">
        <div className="icon">
          <img src="/dnd_char.png" alt="My Current DnD character, an elf paladin"></img>
        </div>
        <div className="spotify">
          <p>Most Recent Spotify Songs:</p>
          <SpotifyContent />
        </div>
      </div>
      <div className="right-col">
        <nav>
          <button className="button" onClick={() => setContent({ contentType: "section", content: "about"}) }>About</button>
          <button className="button" onClick={() => setContent({ contentType: "section", content: "resume"}) }>Resume</button>
          <button className="button" onClick={() => setContent({ contentType: "section", content: "projects"}) }>Projects</button>
          <button className="button" onClick={() => console.log('Go to contact')}>Writing</button>
          <button className="button" onClick={() => location.href='https://github.com/corvo22?tab=repositories'}>Git</button>
        </nav>
        <div className="content-area">
            <div className="display-screen"> 
              <SectionContent contentType={contentState.contentType} sectionId={contentState.content} onContentChange={setContent}/>
            </div>
          <div className="today-info">
            <h2>Events:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>867 – Byzantine emperor Michael III is murdered in his chamber by his junior emperor Basil I.</li>
              <li>1568 – Spanish naval forces defeat an English fleet, under the command of John Hawkins, at the Battle of San Juan de Ulúa near Veracruz.</li>
              <li>787 – The Second Council of Nicaea begins at the Church of Holy Wisdom in the city of Nicaea in Bithynia.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1869 – Black Friday (1869): Gold prices plummet after United States President Ulysses S. Grant orders the Treasury to sell large quantities of gold after Jay Gould and James Fisk plot to control the market.</li>
              <li>1890 – The Church of Jesus Christ of Latter-day Saints officially renounces polygamy.</li>
              <li>1789 – The United States Congress passes the Judiciary Act, creating the office of the Attorney General and federal judiciary system and ordering the composition of the Supreme Court.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1911 – His Majesty's Airship No. 1, Britain's first rigid airship, is wrecked by strong winds before her maiden flight at Barrow-in-Furness.</li>
              <li>2005 – Hurricane Rita makes landfall in the United States, devastating portions of southwestern Louisiana and extreme southeastern Texas.</li>
              <li>2023 – NASA's OSIRIS-REx capsule containing samples from the asteroid 101955 Bennu successfully lands back on Earth.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>936 – 'Adud al-Dawla, Buyid king (died 983)</li>
              <li>1501 – Gerolamo Cardano, Italian mathematician, physician, and astrologer (died 1576)</li>
              <li>1473 – Georg von Frundsberg, German Knight and landowner (died 1528)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1884 – Gustave Garrigou, French cyclist (died 1963)</li>
              <li>1667 – Jean-Louis Lully, French composer (died 1688)</li>
              <li>1861 – Bhikaiji Cama, Indian activist (died 1936)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1958 – Kevin Sorbo, American actor and producer</li>
              <li>1971 – Mike Michalowicz, American businessman and author</li>
              <li>1922 – Ettore Bastianini, Italian actor and singer (died 1967)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>366 – Pope Liberius</li>
              <li>1143 – Pope Innocent II</li>
              <li>1572 – Túpac Amaru, last of the Incas</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1863 – William Debenham, English businessman, founded Debenhams (born 1794)</li>
              <li>1896 – Louis Gerhard De Geer, Swedish lawyer and politician, 1st Prime Minister of Sweden (born 1818)</li>
              <li>1732 – Emperor Reigen of Japan (born 1654)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1976 – Philip Gbeho, Ghanaian composer and educator (born 1904)</li>
              <li>2015 – Alan Moore, Australian painter and educator (born 1914)</li>
              <li>2016 – Mel Charles, Welsh footballer (born 1935)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
