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
              <li>869 – The Fourth Council of Constantinople is convened to depose patriarch Photios I.</li>
              <li>816 – King Louis the Pious is crowned emperor of the Holy Roman Empire by the Pope.</li>
              <li>1143 – With the signing of the Treaty of Zamora, King Alfonso VII of León and Castile recognises Portugal as a Kingdom.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1869 – The Saxby Gale devastates the Bay of Fundy region in Canada.</li>
              <li>1869   – The Eastman tunnel, in Minnesota, United States, collapses during construction, causing a landslide that nearly destroys St. Anthony Falls.</li>
              <li>1789 – French Revolution: The Women's March on Versailles effectively terminates royal authority.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1974 – Bombs planted by the PIRA in pubs in Guildford kill four British soldiers and one civilian.</li>
              <li>1936 – The Jarrow March sets off for London.</li>
              <li>2021 – Windows 11 is released to the general public.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1274 – Al-Dhahabi, Syrian scholar and historian (died 1348)</li>
              <li>1520 – Alessandro Farnese, Italian cardinal and diplomat (died 1589)</li>
              <li>1524 – Rani Durgavati, Queen of Gond (died 1564)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1888 – Mary Fuller, American actress and screenwriter (died 1973)</li>
              <li>1877 – Mike O'Neill, Irish-American baseball player and manager (died 1959)</li>
              <li>1887   – Manny Ziener, German actress (died 1972)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1923   – Albert Guðmundsson, Icelandic footballer and politician (died 1994)</li>
              <li>1925 – Gail Davis, American actress (died 1997)</li>
              <li>1975 – Bobo Baldé, French-Guinean footballer</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1524 – Joachim Patinir, Flemish landscape painter (born c. 1480)</li>
              <li>1564 – Pierre de Manchicourt, Flemish composer and educator (born 1510)</li>
              <li>1056 – Henry III, Holy Roman Emperor (born 1016)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1827 – William Mullins, 2nd Baron Ventry, Anglo-Irish politician and peer (born 1761)</li>
              <li>1714 – Kaibara Ekken, Japanese botanist and philosopher (born 1630)</li>
              <li>1805 – Charles Cornwallis, 1st Marquess Cornwallis, English general and politician, Lord Lieutenant of Ireland (born 1738)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2003 – Dan Snyder, Canadian-American ice hockey player (born 1978)</li>
              <li>1930 – Christopher Thomson, 1st Baron Thomson, Indian-English soldier and politician, Secretary of State for Air (born 1875)</li>
              <li>2004   – Maurice Wilkins, New Zealand-English physicist and biologist, Nobel Prize laureate (born 1916)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
