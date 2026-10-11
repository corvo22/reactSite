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
              <li>1531 – The five Catholic cantons defeat the Protestant canton of Zurich in the battle of Kappel.</li>
              <li>1138 – A massive earthquake strikes Aleppo; it is one of the most destructive earthquakes ever.</li>
              <li>1142 – A peace treaty ends the Jin–Song wars.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1797 – The Royal Navy decisively defeats the Batavian Navy at Camperdown during the French Revolutionary Wars.</li>
              <li>1811 – The Juliana begins operation as the first steam-powered ferry in New York harbor.</li>
              <li>1852 – The University of Sydney, Australia's oldest university, is inaugurated in Sydney.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1976 – George Washington is posthumously promoted to the grade of General of the Armies.</li>
              <li>2013 – A migrant boat sinks in the Channel of Sicily, with at least 359 people drowning.</li>
              <li>1984 – Aboard the Space Shuttle Challenger, astronaut Kathryn D. Sullivan becomes the first American woman to perform a space walk.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1492 – Charles Orlando, Dauphin of France, French noble (died 1495)</li>
              <li>1552 – Tsarevich Dmitry Ivanovich of Russia, Grand Prince of Moscow (died 1553)</li>
              <li>1827 – Afzal-ud-Daulah, Asaf Jah V, 5th Nizam of Hyderabad</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1879 – Ernst Mally, Austrian philosopher and academic (died 1944)</li>
              <li>1885 – François Mauriac, French novelist, poet, and playwright, Nobel Prize laureate (died 1970)</li>
              <li>1932 – Saul Friedländer, Israeli historian and author</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1932   – Dottie West, American singer-songwriter and actress (died 1991)</li>
              <li>1965   – Alexander Hacke, German singer-songwriter, guitarist, and producer</li>
              <li>1159 – William of Blois, Count of Boulogne and Earl of Surrey (born c. 1137)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1542 – Thomas Wyatt, English poet and diplomat (born 1503)</li>
              <li>1188 – Robert I, Count of Dreux (born 1123)</li>
              <li>1721 – Edward Colston, English merchant and politician (born 1636)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1897 – Léon Boëllmann, French organist and composer (born 1862)</li>
              <li>1698 – William Molyneux, Irish philosopher and writer (born 1656)</li>
              <li>1935 – Steele Rudd, Australian author (born 1868)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2000 – Luc-Marie Bayle, French historian, photographer, and painter (born 1914)</li>
              <li>1977 – MacKinlay Kantor, American journalist, author, and screenwriter (born 1904)</li>
              <li>2014   – Ed Nimmervoll, Austrian-Australian journalist, historian, and author (born 1947)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
