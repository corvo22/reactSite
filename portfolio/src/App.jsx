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
              <li>1322 – Robert the Bruce of Scotland defeats King Edward II of England at the Battle of Old Byland, forcing Edward to accept Scotland's independence.</li>
              <li>1066 – The Norman conquest of England begins with the Battle of Hastings.</li>
              <li>1586 – Mary, Queen of Scots, goes on trial for conspiracy against Queen Elizabeth I of England.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1898 – The steam ship SS Mohegan sinks near the Lizard peninsula, Cornwall, killing 106.</li>
              <li>1676 – After superior Ottoman forces fail to break through Polish defenses under Jan Sobieski in the battle of Żurawno, the Ottoman commander initiates negotiations.</li>
              <li>1809 – The Treaty of Schönbrunn is signed, ending the War of the Fifth Coalition, the final successful war in Napoleon Bonaparte's military career.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1991 – Burmese opposition leader Aung San Suu Kyi is awarded the Nobel Peace Prize.</li>
              <li>1975 – An RAF Avro Vulcan bomber explodes and crashes over Żabbar, Malta after an aborted landing, killing five crew members and one person on the ground.</li>
              <li>1962 – The Cuban Missile Crisis begins when an American reconnaissance aircraft takes photographs of Soviet ballistic missiles being installed in Cuba.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1425 – Alesso Baldovinetti, Italian painter (died 1499)</li>
              <li>1465 – Konrad Peutinger, German humanist and antiquarian (died 1547)</li>
              <li>1569 – Giambattista Marino, Italian poet (died 1625)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1609 – Ernest Günther, Duke of Schleswig-Holstein-Sonderburg-Augustenburg (died 1689)</li>
              <li>1643 – Bahadur Shah I, Mughal emperor (died 1712)</li>
              <li>1644 – William Penn, English businessman who founded Pennsylvania (died 1718)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1940 – Perrie Mans, South African snooker player (died 2023)</li>
              <li>1909   – Dorothy Kingsley, American screenwriter and producer (died 1997)</li>
              <li>1977   – Barry Ditewig, Dutch footballer</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1066 – Battle of Hastings:</li>
              <li>1552 – Oswald Myconius, Swiss theologian and reformer (born 1488)</li>
              <li>1366 – Ibn Nubata, Arab poet (born 1287)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1669 – Antonio Cesti, Italian organist and composer (born 1623)</li>
              <li>1631 – Sophie of Mecklenburg-Güstrow, queen of Denmark and Norway (born 1557)</li>
              <li>1831 – Jean-Louis Pons, French astronomer and educator (born 1761)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2014 – A. H. Halsey, English sociologist and academic (born 1923)</li>
              <li>2015   – Margaret Keyes, American historian and academic (born 1918)</li>
              <li>1967 – Marcel Aymé, French author and playwright (born 1902)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
