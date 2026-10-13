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
              <li>1307 – Hundreds of the Knights Templar in France are arrested at dawn by King Philip the Fair, and later confess under torture to heresy.</li>
              <li>409 – Vandals and Alans cross the Pyrenees and appear in Hispania.</li>
              <li>1399 – Coronation of Henry IV of England at Westminster Abbey.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1892 – Edward Emerson Barnard is first to discover a comet by photographic means.</li>
              <li>1885 – The Georgia Institute of Technology is founded in Atlanta, Georgia.</li>
              <li>1775 – The Continental Congress establishes the Continental Navy (predecessor of the United States Navy).</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1993 – At least 60 people die in eastern Papua New Guinea when a series of earthquakes rock the Finisterre Range, triggering massive landslides.</li>
              <li>1976 – The first electron micrograph of an Ebola virus is taken at the Centers for Disease Control and Prevention by Dr. F. A. Murphy.</li>
              <li>1962 – The Pacific Northwest experiences a cyclone the equal of a Category 3 hurricane, with winds above 150 mph. Forty-six people die.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1499 – Claude of France (died 1524)</li>
              <li>1453 – Edward of Westminster, Prince of Wales, son and heir of Henry VI of England (died 1471)</li>
              <li>1563 – Francis Caracciolo, Italian Catholic priest (died 1608)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1887 – Jozef Tiso, Slovak priest and politician, President of Slovakia (died 1947)</li>
              <li>1853 – Lillie Langtry, English actress and singer (died 1929)</li>
              <li>1867 – Jacques Inaudi, Italian calculating prodigy (died 1950)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1941 – Neil Aspinall, Welsh-English record producer and manager (died 2008)</li>
              <li>1923 – John C. Champion, American screenwriter and producer (died 1994)</li>
              <li>1929 – Richard Howard, American poet, critic, and translator (died 2022)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1093 – Robert I, count of Flanders (born 1035)</li>
              <li>1100 – Guy I, count of Ponthieu</li>
              <li>807 – Simpert, bishop of Augsburg</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1815 – Joachim Murat, French general (born 1767)</li>
              <li>1605 – Theodore Beza, French theologian and scholar (born 1519)</li>
              <li>1882 – Arthur de Gobineau, French philosopher and author (born 1816)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2006 – Wang Guangmei, Chinese philanthropist and politician, 2nd Spouse of the President of the People's Republic of China (born 1921)</li>
              <li>2024 – Mayra Gómez Kemp, Cuban-Spanish television host and actress (born 1948)</li>
              <li>1992 – James Marshall, American author and illustrator (born 1942)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
