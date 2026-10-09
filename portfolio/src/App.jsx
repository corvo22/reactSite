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
              <li>1410 – The first known mention of the Prague astronomical clock.</li>
              <li>1238 – James I of Aragon founds the Kingdom of Valencia.</li>
              <li>1594 – Pressed by a food embargo, the five Catholic cantons of Central Switzerland declare war on the Protestant canton of Zurich, starting the Second War of Kappel.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1604 – Kepler's Supernova is the most recent supernova to be observed within the Milky Way.</li>
              <li>1635 – Roger Williams is banished from the Massachusetts Bay Colony after religious and policy disagreements.</li>
              <li>1790 – A severe earthquake in northern Algeria causes severe damage and a tsunami in the Mediterranean Sea and kills three thousand.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2016 – The Arakan Rohingya Salvation Army launches its first attack on Myanmar security forces along the Bangladesh–Myanmar border.</li>
              <li>1937 – Murder of 9 Catholic priests in Zhengding, China, who protected the local population from the advancing Japanese army.</li>
              <li>2007 – The Dow Jones Industrial Average reaches its all-time high of 14,164 points before rapidly declining due to the 2008 financial crisis.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1581 – Claude Gaspard Bachet de Méziriac, French mathematician, poet, and scholar (died 1638)</li>
              <li>1201 – Robert de Sorbon, French minister and theologian, founded the Collège de Sorbonne (died 1274)</li>
              <li>1221 – Salimbene di Adam, Italian historian and scholar (died 1290)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1895 – Eugene Bullard, American pilot (died 1961)</li>
              <li>1898   – Joe Sewell, American baseball player (died 1990)</li>
              <li>1893 – Mário de Andrade, Brazilian author, poet, and photographer (died 1945)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1993 – Ani Amiraghyan, Armenian tennis player</li>
              <li>1990   – Jake Lamb, American baseball player</li>
              <li>1994 – Jodelle Ferland, Canadian actress</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1581 – Louis Bertrand, Spanish missionary and saint (born 1526)</li>
              <li>1296 – Louis III, Duke of Bavaria (born 1269)</li>
              <li>680 – Ghislain, Frankish anchorite and saint</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1873 – George Ormerod, English historian and author (born 1785)</li>
              <li>1806 – Benjamin Banneker, American astronomer and surveyor (born 1731)</li>
              <li>1793 – Jean Joseph Marie Amiot, French missionary and linguist (born 1718)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2024 – Ratan Tata, Indian businessman and philanthropist (born 1937)</li>
              <li>1926 – Evald Relander, Finnish teacher, agronomist and banker (born 1856)</li>
              <li>2009   – John Daido Loori, American Zen Buddhist monastic and teacher (born 1931)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
