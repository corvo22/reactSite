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
              <li>394 – On the first day of the battle of Frigidus, the Western Roman troops of Arbogast manage to defend their positions against the Eastern Roman troops of emperor Theodosius I.</li>
              <li>1590 – An army led by Alexander Farnese, Duke of Parma forces Henry IV of France to lift the siege of Paris.</li>
              <li>1234 – The Decretals of Gregory IX, a new canonical collection assembled by Raymond of Peñafort, are promulgated.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1816 – Louis XVIII of France has to dissolve the Chambre introuvable ("Unobtainable Chamber").</li>
              <li>1798 – Conscription is made mandatory in France by the Jourdan law.</li>
              <li>1725 – Wedding of Louis XV and Maria Leszczyńska.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1991 – The current international treaty defending indigenous peoples, Indigenous and Tribal Peoples Convention, 1989, comes into force.</li>
              <li>1945 – Cold War: Igor Gouzenko, a Soviet Union embassy clerk, defects to Canada, exposing Soviet espionage in North America, signalling the beginning of the Cold War.</li>
              <li>1915 – The pacifist Zimmerwald Conference begins.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1451 – Isabel Neville, daughter of Richard Neville (died 1476)</li>
              <li>1540 – Magnus of Holstein, prince of Denmark  (died 1583)</li>
              <li>1201 – Alix of Thouars, duchess of Brittany (died 1221)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1876 – Wilhelm Ritter von Leeb, German field marshal (died 1956)</li>
              <li>1667 – Giovanni Girolamo Saccheri, Italian priest, mathematician, and philosopher (died 1733)</li>
              <li>1642 – Maria of Orange-Nassau, Dutch princess (died 1688)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1978 – Chris Hipkins, New Zealand politician, 41st Prime Minister of New Zealand</li>
              <li>1965 – David Brabham, Australian race car driver</li>
              <li>1994 – Kings Elliot, Swiss-English singer</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>590 – Authari, Lombard king (born 540)</li>
              <li>714 – Shang, emperor of the Tang Dynasty</li>
              <li>1235 – Henry I, duke of Brabant (born 1165)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1876 – Manuel Blanco Encalada, Chilean admiral and politician, 1st President of Chile (born 1790)</li>
              <li>1894 – George Stoneman, Jr., United States Army cavalry officer (born 1822)</li>
              <li>1803 – François Devienne, French flute player and composer (born 1759)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1999   – Allen Funt, American director, producer, and screenwriter (born 1914)</li>
              <li>2016 – Hugh O'Brian, American actor (born 1925)</li>
              <li>2024   – Laurent Tirard, French film director and screenwriter (born 1967)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
