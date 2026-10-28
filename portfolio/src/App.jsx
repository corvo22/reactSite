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
              <li>1531 – Abyssinian–Adal war: The Adal Sultanate seizes southern Ethiopia.</li>
              <li>1562 – James Stewart, 1st Earl of Moray, defeats the forces of the rebelious George Gordon, 4th Earl of Huntly, in the battle of Corrichie.</li>
              <li>1538 – The Universidad Santo Tomás de Aquino is founded in what is now the Dominican Republic.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1864 – American Civil War: In East Tennessee, Union forces under General Alvan C. Gillem rout Confederate troops under General John C. Vaughn during the Battle of Morristown.</li>
              <li>1776 – American Revolutionary War: British troops under General William Howe attack General George Washington's Continental Army and capture Chatterton Hill in the Battle of White Plains during the New York and New Jersey campaign.</li>
              <li>1835 – The United Tribes of New Zealand are established with the signature of the Declaration of Independence.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2014 – A rocket carrying NASA's Cygnus CRS Orb-3 resupply mission to the International Space Station explodes seconds after taking off from the Mid-Atlantic Regional Spaceport in Wallops Island, Virginia.</li>
              <li>2009   – NASA successfully launches the Ares I-X mission, the only rocket launch for its short-lived Constellation program.</li>
              <li>1948 – Ecological disaster in Donora, Pennsylvania.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1479 – John Gage, English courtier (died 1556)</li>
              <li>1017 – Henry III, Holy Roman Emperor (died 1056)</li>
              <li>1510 – Francis Borgia, 4th Duke of Gandía, Spanish priest and saint, 3rd Superior General of the Society of Jesus (died 1572)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1888 – Christopher Vane, 10th Baron Barnard, English soldier and politician, Lord Lieutenant of Durham (died 1964)</li>
              <li>1693 – Šimon Brixi, Czech composer (died 1735)</li>
              <li>1875 – Gilbert Hovey Grosvenor, Turkish-Canadian journalist (died 1966)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1942   – Kees Verkerk, Dutch speed skater</li>
              <li>1964 – Andrew Bridgen, English soldier and politician</li>
              <li>1944   – Anton Schlecker, German businessman, founded the Schlecker Company</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1266 – Saint Arsenije I Sremac</li>
              <li>457 – Ibas of Edessa, Syrian bishop</li>
              <li>1138 – King Bolesław III Wrymouth of Poland</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1900 – Max Müller, German philologist and orientalist (born 1823)</li>
              <li>1676 – Jean Desmarets, French author, poet, and playwright (born 1595)</li>
              <li>1792 – Paul Möhring, German physician, botanist, and zoologist (born 1710)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2024 – Renato Martino, Italian Roman Catholic cardinal (born 1932)</li>
              <li>2013   – Tadeusz Mazowiecki, Polish journalist and politician, Prime Minister of Poland (born 1927)</li>
              <li>1914 – Richard Heuberger, Austrian composer and critic (born 1850)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
