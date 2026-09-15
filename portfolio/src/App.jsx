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
              <li>533 – The Byzantine army under Belisarius enters Carthage following their victory over the Vandals at Ad Decimum.</li>
              <li>1556 – Departing from Vlissingen, ex-Holy Roman Emperor Charles V returns to Spain.</li>
              <li>1530 – Appearance of the miraculous portrait of Saint Dominic in Soriano in Soriano Calabro, Calabria, Italy; commemorated as a feast day by the Roman Catholic Church 1644–1912.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1816 – HMS Whiting runs aground on the Doom Bar.</li>
              <li>1789 – The United States "Department of Foreign Affairs", established by law in July, is renamed the Department of State and given a variety of domestic duties.</li>
              <li>1813 – Followers of the Eight Trigram Sect loyal to Lin Qing attack the Forbidden City in a failed attempt to oust the Jiaqing Emperor of the Qing dynasty.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1966 – U.S. President Lyndon B. Johnson, responding to a sniper attack at the University of Texas at Austin, writes a letter to Congress urging the enactment of gun control legislation.</li>
              <li>2001 – During a CART race at the Lausitzring in Germany, former Formula One driver Alex Zanardi suffers a heavy accident resulting in him losing both his legs.</li>
              <li>1981   – The John Bull becomes the oldest operable steam locomotive in the world when the Smithsonian Institution operates it under its own power outside Washington, D.C.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1505 – Mary of Hungary, Dutch ruler (died 1558)</li>
              <li>1461 – Jacopo Salviati, Italian politician (died 1533)</li>
              <li>1254 – Marco Polo, Italian merchant and explorer (died 1324)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1846 – George Franklin Grant, African-American educator, dentist, and inventor (died 1910)</li>
              <li>1894 – Chic Harley, American football player (died 1974)</li>
              <li>1877   – Yente Serdatzky, Lithuanian-American author and playwright (died 1962)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1971   – Wayne Ferreira, South African tennis player</li>
              <li>1979   – Reece Young, New Zealand cricketer</li>
              <li>1968 – Danny Nucci, American actor</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1146 – Alan, 1st Earl of Richmond, English soldier (born 1100)</li>
              <li>1397 – Adam Easton, English cardinal</li>
              <li>1500 – John Morton, English cardinal and academic (born 1420)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1712 – Sidney Godolphin, 1st Earl of Godolphin, English politician, Lord High Treasurer (born 1645)</li>
              <li>1852 – Johann Karl Simon Morgenstern, German-Estonian philologist and academic (born 1770)</li>
              <li>1883 – Joseph Plateau, Belgian physicist and academic (born 1801)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1993 – Pino Puglisi, Italian priest and martyr (born 1937)</li>
              <li>2013   – Jackie Lomax, English singer-songwriter and guitarist (born 1944)</li>
              <li>2021 – Lou Angotti, Canadian ice hockey player and coach (born 1938)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
