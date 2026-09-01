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
              <li>1145 – The main altar of Lund Cathedral, at the time the seat of the archiepiscopal see of all the Nordic countries, is consecrated.</li>
              <li>1529 – The Spanish fort of Sancti Spiritu, the first one built in modern Argentina, is destroyed by indigenous people.</li>
              <li>1449 – Tumu Crisis: The Mongols capture the Emperor of China.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1772 – The Mission San Luis Obispo de Tolosa is founded in San Luis Obispo, California.</li>
              <li>1870 – Franco-Prussian War: The Battle of Sedan is fought, resulting in a decisive Prussian victory.</li>
              <li>1862 – American Civil War: Confederate forces under General Stonewall Jackson inflict heavy casualties in the Battle of Chantilly during the Union withdrawal from the Northern Virginia campaign.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1939   – J. Robert Oppenheimer and his student Hartland Snyder publish the Oppenheimer–Snyder model, proving for the first time in contemporary physics how black holes could develop.</li>
              <li>1974 – The SR-71 Blackbird sets (and holds) the record for flying from New York to London in the time of one hour, 54 minutes and 56.4 seconds at a speed of 1,435.587 miles per hour (2,310.353 km/h).</li>
              <li>1982 – The United States Air Force Space Command is founded.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1288 – Elizabeth Richeza of Poland (died 1335)</li>
              <li>948 – Jing Zong, emperor of the Liao Dynasty (died 982)</li>
              <li>1577 – Scipione Borghese, Italian cardinal and art collector (died 1633)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1653 – Johann Pachelbel, German organist, composer, and educator (died 1706)</li>
              <li>1856 – Sergei Winogradsky, Ukrainian-Russian microbiologist and ecologist (died 1953)</li>
              <li>1883 – Didier Pitre, Canadian ice hockey player (died 1934)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1948   – Józef Życiński, Polish archbishop and philosopher (died 2011)</li>
              <li>1946 – Barry Gibb, Manx-English singer-songwriter and producer</li>
              <li>1942 – C. J. Cherryh, American author and educator</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1081 – Bishop Eusebius of Angers</li>
              <li>1375 – Philip of Valois, Duke of Orléans (born 1336)</li>
              <li>1414 – William de Ros, 6th Baron de Ros, English politician, Lord High Treasurer (born 1369)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1839 – Izidor Guzmics, Hungarian theologian and educator (born 1786)</li>
              <li>1706 – Cornelis de Man, Dutch painter (born 1621)</li>
              <li>1678 – Jan Brueghel the Younger, Flemish painter (born 1601)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1930 – Peeter Põld, Estonian scientist and politician, 1st Estonian Minister of Education (born 1878)</li>
              <li>2014   – Roger McKee, American baseball player (born 1926)</li>
              <li>2004   – Alastair Morton, South African businessman (born 1938)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
