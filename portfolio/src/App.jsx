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
              <li>394 – Battle of the Frigidus: Roman emperor Theodosius I defeats and kills Eugenius the usurper. His Frankish magister militum Arbogast escapes but commits suicide two days later.</li>
              <li>1492 – Christopher Columbus sails from La Gomera in the Canary Islands, his final port of call before crossing the Atlantic Ocean for the first time.</li>
              <li>1522 – The Victoria returns to Sanlúcar de Barrameda in Spain, the only surviving ship of Ferdinand Magellan's expedition and the first known ship to circumnavigate the world.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1863 – American Civil War: Confederate forces evacuate Battery Wagner and Morris Island in South Carolina.</li>
              <li>1634 – Thirty Years' War: In the Battle of Nördlingen, the Catholic Imperial army defeats Swedish and German Protestant forces.</li>
              <li>1870 – Louisa Ann Swain of Laramie, Wyoming becomes the first woman in the United States to cast a vote legally after 1807.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2018   – Brazilian presidential candidate Jair Bolsonaro survives a stabbing at a campaign rally in Juiz de Fora, Minas Gerais.</li>
              <li>2018 – Supreme Court of India decriminalises all consensual sex among adults in private, making homosexuality legal on the Indian lands.</li>
              <li>1943   – Pennsylvania Railroad's premier train derails at Frankford Junction in Philadelphia, killing 79 people and injuring 117 others.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1475   – Sebastiano Serlio, Italian Mannerist architect (died 1554)</li>
              <li>1475 – Artus Gouffier, Lord of Boissy, French nobleman and politician (died 1519)</li>
              <li>1802 – Alcide d'Orbigny, French zoologist, palaeontologist, and geologist (died 1857)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1892 – Edward Victor Appleton, English-Scottish physicist and academic, Nobel Prize laureate (died 1965)</li>
              <li>1861 – William Lane, English-Australian journalist, founded New Australia (died 1917)</li>
              <li>1954   – Demetris Kizas, Cypriot footballer</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1984   – William Porterfield, Northern Irish cricketer</li>
              <li>1967 – William DuVall, American singer-songwriter and guitarist</li>
              <li>394 – Eugenius, Roman usurper</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1276 – Vicedomino de Vicedominis, Italian cardinal (born 1210)</li>
              <li>1178 – Ioveta, Latin princess</li>
              <li>1885 – Narcís Monturiol, Spanish engineer, designed the Ictineo I and Ictineo II (born 1819)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1868 – Pierre Adolphe Rost, American lawyer, judge, and politician (born 1797)</li>
              <li>1708 – Sir John Morden, 1st Baronet, English merchant and philanthropist, founded Morden College (born 1623)</li>
              <li>1952 – Gertrude Lawrence, English actress, singer, and dancer (born 1898)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2012 – Elisabeth Böhm, German architect (born 1921)</li>
              <li>2017   – Kate Millett, American feminist author and activist (born 1934)</li>
              <li>2024   – Laurent Tirard, French film director and screenwriter (born 1967)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
