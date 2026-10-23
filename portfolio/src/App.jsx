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
              <li>1086 – Spanish Reconquista: At the Battle of Sagrajas, the Almoravids defeat the Castilians, but are unable to take advantage of their victory.</li>
              <li>425 – Valentinian III is elevated as Roman emperor at the age of six.</li>
              <li>1157 – The Battle of Grathe Heath ends the Danish Civil War.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1642 – The Battle of Edgehill is the first major battle of the English Civil War.</li>
              <li>1856 – Second Opium War: Dissatisfied with imperial commissioner Ye Mingchen's reparations for the alleged slighting of a British-owned vessel and at Consul Harry Parkes's urging, British Rear-Admiral Michael Seymour launches an assault on the Barrier Forts outside Canton in the first military engagement of the Second Opium War.</li>
              <li>1812 – General Claude François de Malet begins a conspiracy to overthrow Napoleon, claiming that the Emperor died in the Russian campaign.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2011 – A powerful 7.2 magnitude earthquake strikes Van Province, Turkey, killing 582 people and injuring thousands.</li>
              <li>1942   – World War II: The Battle for Henderson Field begins on Guadalcanal.</li>
              <li>1955 – The people of the Saar region vote in a referendum to unite with West Germany instead of France.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1491 (estimated) – Ignatius of Loyola, Catholic priest (died 1556)</li>
              <li>1516 – Charlotte of Valois, French princess (died 1524)</li>
              <li>1006 – Wen Yanbo, Chinese grand chancellor (died 1097)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1876 – Franz Schlegelberger, German judge and politician, Reich Ministry of Justice (died 1970)</li>
              <li>1880   – Una O'Connor, Irish-American actress and singer (died 1959)</li>
              <li>1896   – Lilyan Tashman, American actress (died 1934)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1984   – Jeffrey Hoogervorst, Dutch footballer</li>
              <li>1963 – Gordon Korman, Canadian-American author</li>
              <li>1993 – Josh Ruffels, English footballer</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>42 BC – Marcus Junius Brutus the Younger, Roman general and politician (born 85 BC)</li>
              <li>1157 – Sweyn III, Danish king (born c. 1125)</li>
              <li>877 – Ignatios of Constantinople, Byzantine patriarch (born 797)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1893 – Alexander of Battenberg (born 1857)</li>
              <li>1730 – Anne Oldfield, English actress (born 1683)</li>
              <li>1774 – Michel Benoist, French missionary and astronomer (born 1715)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2008 – Kevin Finnegan, English boxer (born 1948)</li>
              <li>2012   – Wilhelm Brasse, Polish photographer (born 1917)</li>
              <li>1944   – Hana Brady, Czech holocaust victim (born 1931)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
