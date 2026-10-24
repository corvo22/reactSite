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
              <li>1590 – John White, the governor of the second Roanoke Colony, returns to England after an unsuccessful search for the "lost" colonists.</li>
              <li>1260   – After defeating the Mongols at the Battle of Ain Jalut and assassinating the previous Mamluk sultan, Qutuz, Baybars ascends to the Egyptian throne as the fourth sultan of the Mamluk Sultanate.</li>
              <li>1273 – Rudolf of Habsburg is crowned king of the Romans in Aachen.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1641 – Felim O'Neill of Kinard, the leader of the Irish Rebellion, issues his Proclamation of Dungannon, justifying the uprising and declaring continued loyalty to King Charles I of England.</li>
              <li>1861 – The first transcontinental telegraph line across the United States is completed.</li>
              <li>1900 – U.S. Government announces plans to buy Danish West Indies for $7 million.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1917 – World War I: Italy suffers a disastrous defeat at the Battle of Caporetto on the Austro-Italian front.</li>
              <li>1926 – Harry Houdini's last performance takes place at the Garrick Theatre in Detroit.</li>
              <li>2018 – The world's longest sea crossing, the Hong Kong–Zhuhai–Macau Bridge, opens for public traffic.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1378 – David Stewart, Duke of Rothesay heir to the throne of Scotland (died 1402)</li>
              <li>AD 51 – Domitian, Roman emperor (died 96)</li>
              <li>1503 – Isabella of Portugal (died 1539)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1876 – Saya San, Burmese monk and activist (died 1931)</li>
              <li>1763 – Dorothea von Schlegel, German author and translator (died 1839)</li>
              <li>1854 – Hendrik Willem Bakhuis Roozeboom, Dutch chemist and academic (died 1907)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1959   – Michelle Lujan Grisham, American lawyer and politician</li>
              <li>1988   – Christopher Linke, German race walker</li>
              <li>1963 – Rosana Arbelo, Spanish singer-songwriter and guitarist</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1152 – Jocelin of Soissons, French theologian, philosopher and composer</li>
              <li>1168 – Count William IV of Nevers, French nobleman</li>
              <li>1572 – Edward Stanley, 3rd Earl of Derby, English admiral and politician, Lord Lieutenant of Lancashire (born 1508)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1633 – Jean Titelouze, French organist and composer (born 1562/3)</li>
              <li>1655 – Pierre Gassendi, French priest, astronomer, and mathematician (born 1592)</li>
              <li>1824 – Israel Bissell, American patriot post rider during American Revolutionary War (born 1752)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2001   – Jaromil Jireš, Czech director and screenwriter (born 1935)</li>
              <li>2005   – Immanuel C. Y. Hsu, Chinese sinologist and scholar (born 1923)</li>
              <li>1949 – Yaroslav Halan, Ukrainian playwright and publicist (born 1902)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
