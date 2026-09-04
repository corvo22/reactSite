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
              <li>1479 – The Treaty of Alcáçovas is signed by the Catholic Monarchs of Castile and Aragon on one side and Afonso V and his son, Prince John of Portugal.</li>
              <li>626 – Li Shimin, posthumously known as Emperor Taizong of Tang, assumes the throne over the Tang dynasty of China.</li>
              <li>1260 – The Sienese Ghibellines, supported by the forces of Manfred, King of Sicily, defeat the Florentine Guelphs at Montaperti.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1797 – Coup of 18 Fructidor in France.</li>
              <li>1746 – The Treaty of Kerden concludes the Ottoman–Persian War (1743–1746).</li>
              <li>1862 – American Civil War Maryland Campaign: General Robert E. Lee takes the Army of Northern Virginia, and the war, into the North.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1939 – World War II: William J. Murphy commands the first Royal Air Force attack on Germany.</li>
              <li>1949 – Paul Robeson performs a second concert in Peekskill, New York eight days after the Peekskill riots.</li>
              <li>1944   – World War II: Finland exits from the war with Soviet Union.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1454 – Henry Stafford, 2nd Duke of Buckingham, English politician, Lord High Constable of England (died 1483)</li>
              <li>1596 – Constantijn Huygens, Dutch poet and composer (died 1687)</li>
              <li>1557 – Sophie of Mecklenburg-Güstrow, queen consort of Denmark and Norway (died 1631)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1848   – Jennie Lee, American actress (died 1925)</li>
              <li>1717 – Job Orton, English minister and author (died 1783)</li>
              <li>1885 – Antonio Bacci, Italian cardinal (died 1971)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1909 – Eduard Wirths, German physician (died 1945)</li>
              <li>1968 – John DiMaggio, American voice actor</li>
              <li>1955 – David Broza, Israeli singer-songwriter and guitarist</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>422 – Boniface I, pope of the Catholic Church</li>
              <li>1308 – Margaret of Burgundy, queen of Sicily (born 1250)</li>
              <li>1417 – Robert Hallam, English Catholic bishop</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1821 – José Miguel Carrera, Chilean general and politician (born 1785)</li>
              <li>1864 – John Hunt Morgan, American general (born 1825)</li>
              <li>1767 – Charles Townshend, English politician, Chancellor of the Exchequer (born 1725)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1996   – Rose Ouellette, Canadian actress and manager (born 1903)</li>
              <li>1998 – Ernst Jaakson, Estonian diplomat (born 1905)</li>
              <li>2013   – Stanislav Stepashkin, Russian boxer (born 1940)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
