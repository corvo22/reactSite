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
              <li>1572 – Eighty Years' War: Three thousand Spanish soldiers wade through fifteen miles of water in one night to effect the relief of Goes.</li>
              <li>1568 – The Spanish Duke of Alba defeats a Dutch rebel force under William the Silent.</li>
              <li>1448 – The second battle of Kosovo ends when the larger army of the Ottoman Empire defeats those of the Kingdom of Hungary after the Wallachian troops desert.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1774 – American Revolution: The Continental Association, a nonconsumption and nonimportation agreement against the British Isles and the British West Indies, is adopted by the First Continental Congress.</li>
              <li>1803 – The United States Senate ratifies the Louisiana Purchase.</li>
              <li>1818 – The Convention of 1818 is signed between the United States and the United Kingdom, which settles the Canada–United States border on the 49th parallel for most of its length.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2018 – The BepiColombo spacecraft is launched on an Ariane 5 rocket to study Mercury.</li>
              <li>1904 – Chile and Bolivia sign the Treaty of Peace and Friendship, delimiting the border between the two countries.</li>
              <li>1944 – World War II:  American general Douglas MacArthur fulfills his promise to return to the Philippines when he comes ashore during the Battle of Leyte.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1496 – Claude, Duke of Guise (died 1550)</li>
              <li>1554 – Bálint Balassi, Hungarian writer and noble (died 1594)</li>
              <li>1475 – Giovanni di Bernardo Rucellai, Italian poet and playwright (died 1525)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1784 – Henry John Temple, 3rd Viscount Palmerston, English academic and politician, Prime Minister of the United Kingdom (died 1865)</li>
              <li>1808 – Karl Andree, German geographer and journalist (died 1875)</li>
              <li>1832 – Constantin Lipsius, German architect and theorist (died 1894)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1962 – Dave Wong, Hong Kong-Taiwanese singer-songwriter and actor</li>
              <li>1944 – David Mancuso, American party planner, created The Loft (died 2016)</li>
              <li>1948 – Piet Hein Donner, Dutch jurist and politician, Dutch Minister of Justice</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1327 – Teresa d'Entença, Countess of Urgell (born 1300)</li>
              <li>1122 – Ralph d'Escures, archbishop of Canterbury</li>
              <li>1524 – Thomas Linacre, English physician and scholar (born 1460)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1900 – Naim Frashëri, Albanian poet and translator (born 1846)</li>
              <li>1740 – Charles VI, Holy Roman Emperor (born 1685)</li>
              <li>1880 – Lydia Maria Child, American journalist, author, and activist (born 1802)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2014 – Christophe de Margerie, French businessman (born 1951)</li>
              <li>2016 – Kaneta Kimotsuki, Japanese actor, voice actor, and theater director (born 1935)</li>
              <li>2010 – Farooq Leghari, Pakistani politician, 8th President of Pakistan (born 1940)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
