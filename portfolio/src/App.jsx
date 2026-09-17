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
              <li>1111 – Highest Galician nobility led by Pedro Fróilaz de Traba and the bishop Diego Gelmírez crown Alfonso VII as "King of Galicia".</li>
              <li>1577 – The Treaty of Bergerac is signed between King Henry III of France and the Huguenots.</li>
              <li>1462 – Thirteen Years' War: A Polish army under Piotr Dunin decisively defeats the Teutonic Order at the Battle of Świecino.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1900 – Philippine–American War: Filipinos under Juan Cailles defeat Americans under Colonel Benjamin F. Cheatham Jr. at Mabitac.</li>
              <li>1683 – Antonie van Leeuwenhoek writes a letter to the Royal Society describing "animalcules", later known as protozoa.</li>
              <li>1778 – The Treaty of Fort Pitt is signed. It is the first formal treaty between the United States and a Native American tribe.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1974 – Bangladesh, Grenada and Guinea-Bissau join the United Nations.</li>
              <li>1914 – Andrew Fisher becomes Prime Minister of Australia for the third time.</li>
              <li>2001 – The New York Stock Exchange reopens for trading after the September 11 attacks, the longest closure since the Great Depression.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1479 – Celio Calcagnini, Italian astronomer (died 1541)</li>
              <li>879 – Charles the Simple, Frankish king (died 929)</li>
              <li>1433 – James of Portugal, Portuguese prince and cardinal (died 1459)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1868 – James Alexander Calder, Canadian educator and politician, Canadian Minister of Militia and Defence (died 1956)</li>
              <li>1820 – Émile Augier, French playwright (died 1889)</li>
              <li>1860 – Mihkel Martna, Estonian journalist and politician (died 1934)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1940   – Gilberto Parlotti, Italian motorcycle racer (died 1972)</li>
              <li>1969   – Ken Doherty, Irish snooker player</li>
              <li>1916 – Mary Stewart, British author and poet (died 2014)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>456 – Remistus, Roman general</li>
              <li>958 – Li Jingsui, Chinese prince (born 920)</li>
              <li>1025 – Hugh Magnus, king of France (born 1007)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1879 – Eugène Viollet-le-Duc, French architect and theorist (born 1814)</li>
              <li>1877 – Henry Fox Talbot, English photographer, developed the Calotype Process (born 1800)</li>
              <li>1665 – Philip IV, king of Spain (born 1605)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2012 – Melvin Charney, Canadian sculptor and architect (born 1935)</li>
              <li>2013   – Marvin Rainwater, American singer-songwriter (born 1925)</li>
              <li>1943 – Friedrich Zickwolff, German general (born 1893)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
