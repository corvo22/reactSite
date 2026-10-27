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
              <li>312 – Constantine the Great is said to have received his famous Vision of the Cross.</li>
              <li>1553 – Condemned as a heretic, Michael Servetus is burned at the stake just outside Geneva.</li>
              <li>625 – Election of Pope Honorius I following the death of Pope Boniface V two days prior.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1864 – American Civil War: Union General Benjamin Butler launches an attack during the Siege of Petersburg with the Battle of Fair Oaks & Darbytown Road, but is repulsed by the next day.</li>
              <li>1726 – J. S. Bach leads the first performance of Ich will den Kreuzstab gerne tragen, BWV 56, one of few works he called a cantata.</li>
              <li>1674 – The French garrison in Grave surrenders the town to a Dutch army after a difficult siege.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1979 – Saint Vincent and the Grenadines gains its independence from the United Kingdom.</li>
              <li>1991 – Turkmenistan achieves independence from the Soviet Union.</li>
              <li>1994 – Gliese 229B is the first Substellar Mass Object to be unquestionably identified.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1156 – Raymond VI, Count of Toulouse (died 1222)</li>
              <li>921 – Chai Rong, Chinese emperor (died 959)</li>
              <li>1401 – Catherine of Valois, Queen consort of England (died 1437)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1842 – Giovanni Giolitti, Italian politician, 13th Prime Minister of Italy (died 1928)</li>
              <li>1868 – William Gillies, Australian politician, 21st Premier of Queensland (died 1928)</li>
              <li>1811 – Stevens T. Mason, American lawyer and politician, 1st Governor of Michigan (died 1843)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1913   – Luigi Piotti, Italian race car driver (died 1971)</li>
              <li>1948 – Kevin Borich, New Zealand-Australian guitarist and songwriter</li>
              <li>1991 – Shohei Takahashi, Japanese footballer</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1439 – Albert II of Germany (born 1397)</li>
              <li>1327 – Elizabeth de Burgh, queen of Robert the Bruce</li>
              <li>1272 – Hugh IV, Duke of Burgundy (born 1213)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1789 – John Cook, American farmer and politician, 6th Governor of Delaware (born 1730)</li>
              <li>1617 – Ralph Winwood, English lawyer and politician, English Secretary of State (born 1563)</li>
              <li>1613 – Gabriel Báthory, Prince of Transylvania (born 1589)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2015   – Betsy Drake, French-American actress and singer (born 1923)</li>
              <li>2014 – Daniel Boulanger, French actor and screenwriter (born 1922)</li>
              <li>2012   – Göran Stangertz, Swedish actor and director (born 1944)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
