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
              <li>1552 – Russo-Kazan Wars: Russian troops enter Kazan.</li>
              <li>1187– Saladin won Jerusalem after the city surrendered to his forces following a prolonged siege.</li>
              <li>48 BC – Julius Caesar arrives in Ptolemaic Egypt in his pursuit of Pompey and learns of the latter's death.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1870 – By plebiscite, the citizens of the Papal States accept annexation by the Kingdom of Italy.</li>
              <li>1864 – American Civil War: Confederates defeat a Union attack on Saltville, Virginia. A massacre of wounded Union prisoners ensues.</li>
              <li>1766 - The Nottingham Cheese Riot breaks out at the Goose Fair in Nottingham, UK, in response to the excessive cost of cheese.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1996   – The Electronic Freedom of Information Act Amendments are signed by U.S. President Bill Clinton.</li>
              <li>1992 – Military police storm the Carandiru Penitentiary in São Paulo, Brazil during a prison riot. The resulting massacre leaves 111 prisoners dead.</li>
              <li>1919 – Seven days after suffering a "physical collapse" following a speech in Pueblo, Colorado, U.S. president Woodrow Wilson has a catastrophic stroke at the White House, leaving him physically and mentally incapacitated for the remainder of his presidency.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1470   – Isabella of Aragon, Queen of Portugal, Daughter of Isabella I of Castile and Ferdinand II of Aragon (died 1498)</li>
              <li>1538 – Charles Borromeo, Italian cardinal and saint (died 1584)</li>
              <li>1452 – Richard III of England (died 1485)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1895 – Ruth Cheney Streeter, American colonel (died 1990)</li>
              <li>1800 – Nat Turner, American slave and uprising leader (died 1831)</li>
              <li>1890 – Groucho Marx, American comedian and actor (died 1977)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1970   – Kelly Ripa, American actress and talk show host</li>
              <li>1926 – Jan Morris, Welsh historian and author (died 2020)</li>
              <li>1987   – Ricky Stenhouse Jr., American race car driver</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>534 – Athalaric, king of the Ostrogoths in Italy</li>
              <li>939 – Eberhard of Franconia</li>
              <li>939   – Gilbert, Duke of Lorraine</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1853 – François Arago, French mathematician, physicist, astronomer, and politician (born 1786)</li>
              <li>1847 – Vasil Aprilov, Bulgarian educator, merchant and writer (born 1789)</li>
              <li>1709 – Ivan Mazepa, Ukrainian diplomat (born 1639)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1971 – Jessie Arms Botke, American painter (born 1883)</li>
              <li>1974 – Vasily Shukshin, Russian actor, director, and screenwriter (born 1929)</li>
              <li>2022 – Sacheen Littlefeather, American actress, model and activist for Native American civil rights (born 1946)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
