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
              <li>959 – Edgar the Peaceful becomes king of all England, in succession to Eadwig.</li>
              <li>965 – Pope John XIII is consecrated.</li>
              <li>331 BC – Alexander the Great defeats Darius III of Persia in the Battle of Gaugamela.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1898 – The Vienna University of Economics and Business Administration is founded under the name k.u.k. Exportakademie.</li>
              <li>1891 – Stanford University opens its doors in California, United States.</li>
              <li>1832 – Texian political delegates convene at San Felipe de Austin to petition for changes in the governance of Mexican Texas.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1947 – The North American F-86 Sabre flies for the first time.</li>
              <li>1953 – Andhra State is formed, consisting of a Telugu-speaking area carved out of India's Madras State.</li>
              <li>1910 – A large bomb destroys the Los Angeles Times building, killing 21.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1554 – Leonardus Lessius, Jesuit theologian (died 1623)</li>
              <li>1542 – Álvaro de Mendaña de Neira, Spanish explorer (died 1595)</li>
              <li>1207 – Henry III of England (died 1272)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1846 – Nectarios of Aegina, Greek metropolitan and saint (died 1920)</li>
              <li>1900 – Ashfaqulla Khan, Indian activist (died 1927)</li>
              <li>1878 – Othmar Spann, Austrian economist, sociologist, and philosopher (died 1950)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1998 – Daniel Gafford, American basketball player</li>
              <li>1946 – Dave Holland, English bassist, composer, and bandleader</li>
              <li>2000 – Kalle Rovanperä, Finnish professional rally driver</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1040 – Alan III, Duke of Brittany (born 997)</li>
              <li>1246 – Ednyfed Fychan, distain of Gwynedd</li>
              <li>895 – Kong Wei, chancellor of the Tang dynasty</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1878 – Mindon Min, Burmese king (born 1808)</li>
              <li>1895 – Eli Whitney Blake, Jr., American chemist, physicist, and academic (born 1836)</li>
              <li>1788 – William Brodie, Scottish businessman and politician (born 1741)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1901 – Abdur Rahman Khan, Afghan emir (born 1844)</li>
              <li>2013 – Tom Clancy, American author (born 1947)</li>
              <li>1950 – Faik Ali Ozansoy, Turkish poet, educator, and politician (born 1876)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
