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
              <li>762 – Led by Muhammad al-Nafs al-Zakiyya, the Hasanid branch of the Alids begins the Alid Revolt against the Abbasid Caliphate.</li>
              <li>1555 – The Peace of Augsburg is signed by Emperor Charles V and the princes of the Schmalkaldic League.</li>
              <li>867 – Basil I is crowned Byzantine emperor in the Hagia Sophia after he murdered the previous emperor Michael III in the night before.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1804 – The Teton Sioux (a subdivision of the Lakota) demand one of the boats from the Lewis and Clark Expedition as a toll for allowing the expedition to move further upriver.</li>
              <li>1786 – The mine of Huancavelica in the Peruvian Andes collapses, killing more than hundred people. The event was a major setback for quicksilver production in the Spanish Empire.</li>
              <li>1768 – Unification of Nepal</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1956 – TAT-1, the first submarine transatlantic telephone cable system, is inaugurated.</li>
              <li>1978 – PSA Flight 182, a Boeing 727, collides in mid-air with a Cessna 172 and crashes in San Diego, killing all 135 aboard Flight 182, both occupants of the Cessna, as well as seven people on the ground.</li>
              <li>1906 – Leonardo Torres Quevedo demonstrates the Telekino in the Bilbao Abra (Spain), guiding an electric boat from the shore with people on board, which was controlled at a distance over 2 km (1.2 mi), in what is considered to be the origin of modern wireless remote-control operation principles.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1599 – Francesco Borromini, Swiss-Italian architect, designed the San Carlo alle Quattro Fontane and Sant'Agnese in Agone (died 1667)</li>
              <li>1403 – Louis III of Anjou (died 1434)</li>
              <li>1528 – Otto II, Duke of Brunswick-Harburg (died 1603)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1773 – Agostino Bassi, Italian entomologist and author (died 1856)</li>
              <li>1877 – Plutarco Elías Calles, Mexican general and President (died 1945)</li>
              <li>1644 – Ole Rømer, Danish astronomer and instrument maker (died 1710)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1950 – E. C. Coleman, American basketball player</li>
              <li>1939   – David S. Mann, American lawyer and politician, Mayor of Cincinnati</li>
              <li>1969   – Catherine Zeta-Jones, Welsh actress</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1536 – Johannes Secundus, Dutch author and poet (born 1511)</li>
              <li>1066   – Maria Haraldsdotter, Norwegian princess</li>
              <li>1066   – Tostig Godwinson, English son of Godwin, Earl of Wessex (born c. 1029)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1867 – Oliver Loving, American rancher, co-developed the Goodnight–Loving Trail (born 1812)</li>
              <li>1665 – Archduchess Maria Anna of Austria (born 1610)</li>
              <li>1900 – Félix-Gabriel Marchand, Canadian journalist and politician, 11th Premier of Québec (born 1832)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2007    – André Emmerich, German-American art dealer (born 1924)</li>
              <li>2003   – Herb Gardner, American director, producer, and screenwriter (born 1934)</li>
              <li>2005   – George Archer, American golfer (born 1939)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
