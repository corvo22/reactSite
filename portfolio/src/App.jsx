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
              <li>604 – Consecration of pope Sabinian following the death of pope Gregory I earlier that year.</li>
              <li>531 – Khosrow I becomes king of the Sassanid Empire following the death of his father Kavad I. He starts negotiations with the Byzantine Empire to end the Iberian War.</li>
              <li>1229 – Ögedei Khan is proclaimed Khagan of the Mongol Empire in Kodoe Aral, Khentii: Mongolia.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1848 – Vermont railroad worker Phineas Gage survives an iron rod 1+1⁄4 inches (3.2 cm) in diameter being driven through his brain; the reported effects on his behavior and personality stimulate discussion of the nature of the brain and its functions.</li>
              <li>1788 – The Congress of the Confederation sets the date for the first presidential election in the United States, and New York City becomes the country's temporary capital.</li>
              <li>1808 – Finnish War: In the Battle of Jutas, Swedish forces under Lieutenant General Georg Carl von Döbeln beat the Russians, making von Döbeln a Swedish war hero.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2001 – Civilian aircraft traffic resumes in the United States after the September 11 attacks.</li>
              <li>1953 – Nikita Khrushchev is appointed General Secretary of the Communist Party of the Soviet Union.</li>
              <li>1986 – A magnitude 6.0 earthquake strikes Kalamata, Greece with a maximum Modified Mercalli intensity of X (Extreme), killing at least 20 and causing heavy damage in the city.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>AD 64 – Julia Flavia, Roman daughter of Titus (died AD 91)</li>
              <li>1521 – William Cecil, 1st Baron Burghley, English academic and politician, Lord High Treasurer (died 1598)</li>
              <li>1087 – John II Komnenos, Byzantine emperor (died 1143)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1830 – Marie von Ebner-Eschenbach, Austrian author (died 1916)</li>
              <li>1891 – Max Pruss, German captain and pilot (died 1960)</li>
              <li>1880 – Jesse L. Lasky, American film producer, co-founded Famous Players–Lasky (died 1958)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1956 – Anne Geddes, Australian-New Zealand photographer and fashion designer</li>
              <li>1949 – Jim Cleamons, American basketball player and coach</li>
              <li>1924 – Maurice Jarre, French composer and conductor (died 2009)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>531 – Kavad I, Sasanian King of Kings of Iran (born 473)</li>
              <li>1313 – Notburga, Austrian saint (born 1265)</li>
              <li>1488 – Charles II, Duke of Bourbon (born 1434)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1894 – Emmanuel Chabrier, French pianist and composer (born 1841)</li>
              <li>1806 – Charles James Fox, English soldier and politician, Secretary of State for Foreign and Commonwealth Affairs (born 1749)</li>
              <li>1632 – Leopold V, Archduke of Austria (born 1586)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2007 – Whakahuihui Vercoe, New Zealand archbishop (born 1928)</li>
              <li>2015 – Erma Bergmann, American baseball player (born 1924)</li>
              <li>2015 – Moses Malone, American basketball player and sportscaster (born 1955)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
