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
              <li>437 – Valentinian III, Western Roman Emperor, marries Licinia Eudoxia, daughter of his cousin Theodosius II, Eastern Roman Emperor in Constantinople unifying the two branches of the House of Theodosius.</li>
              <li>312 – Constantine the Great enters Rome after his victory at the Battle of the Milvian Bridge, stages a grand adventus in the city, and is met with popular jubilation. Maxentius' body is fished out of the Tiber and beheaded.</li>
              <li>1281 – The Mamluk Sultanate defeats the Ilkhanate in the second battle of Homs.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1888 – The Convention of Constantinople is signed, guaranteeing free maritime passage through the Suez Canal during war and peace.</li>
              <li>1675 – Leibniz makes the first use of the long s (∫) as a symbol of the integral in calculus.</li>
              <li>1792 – Mount Hood (Oregon) is named after Samuel Hood, 1st Viscount Hood by Lt. William E. Broughton who sighted the mountain near the mouth of the Willamette River.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2012 – Hurricane Sandy hits the east coast of the United States, killing hundreds, while leaving nearly $70 billion in damages and causing major power outages.</li>
              <li>1980 – Demonstration flight of a secretly modified C-130 for an Iran hostage crisis rescue attempt ends in a crash landing at Eglin Air Force Base's Duke Field, Florida, leading to the cancellation of Operation Credible Sport.</li>
              <li>1998 – In South Africa, the Truth and Reconciliation Commission presents its report, which condemns both sides for committing atrocities.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1463 – Alessandro Achillini, Italian physician and philosopher (died 1512)</li>
              <li>1504 – Shin Saimdang, South Korean painter and poet (died 1551)</li>
              <li>1507 – Fernando Alvarez de Toledo, Spanish general (died 1582)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1808 – Caterina Scarpellini, Italian astronomer and meteorologist (died 1873)</li>
              <li>1877 – Narcisa de Leon, Filipino film producer (died 1966)</li>
              <li>1815 – Dan Emmett, American composer (died 1904)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1937 – Sonny Osborne, American bluegrass singer and banjo player (died 2021)</li>
              <li>1978 – Travis Henry, American football player</li>
              <li>1956 – Wilfredo Gómez, Puerto Rican-American boxer (died 2026)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1268 – Conradin, King of Sicily (born 1252)</li>
              <li>1590 – Dirck Coornhert, Dutch philosopher, theologian, and politician (born 1522)</li>
              <li>1321 – Stefan Milutin, King of Serbia (born 1253)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1804 – Sarah Crosby, English Methodist preacher (born 1729)</li>
              <li>1618 – Walter Raleigh, English admiral, explorer, and politician, Lieutenant Governor of Jersey (born 1554)</li>
              <li>1900 – Fatima Cates, British Muslim convert and activist (born 1865)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1975 – Edmund Hirst, British chemist (born 1898)</li>
              <li>1961 – Astrid Holm, Danish actress (born 1893)</li>
              <li>1905 – Étienne Desmarteau, Canadian weight thrower and shot putter (born 1873)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
