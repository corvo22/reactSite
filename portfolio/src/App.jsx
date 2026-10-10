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
              <li>1575 – Roman Catholic forces under Henry I, Duke of Guise, defeat the Protestants, capturing Philippe de Mornay among others.</li>
              <li>19 – The Roman general Germanicus dies near Antioch. He was convinced that the mysterious illness that ended in his death was a result of poisoning by the Syrian governor Gnaeus Calpurnius Piso, whom he had ordered to leave the province.</li>
              <li>1471 – Sten Sture the Elder, the Regent of Sweden, with the help of farmers and miners, repels an attack by King Christian I of Denmark.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1845 – In Annapolis, Maryland, the Naval School (later the United States Naval Academy) opens with 50 students.</li>
              <li>1760 – In a treaty with the Dutch colonial authorities, the Ndyuka people of Suriname – descended from escaped slaves – gain territorial autonomy.</li>
              <li>1780 – The Great Hurricane of 1780 kills 20,000–30,000 in the Caribbean.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2018 – The National Fire and Rescue Administration is founded, replacing the China Fire Services [zh] and the People's Armed Police Forestry Corps [zh] as China's primary firefighting agency.</li>
              <li>1963   – The Partial Nuclear Test Ban Treaty comes into effect.</li>
              <li>1935 – In Greece, a coup d'état ends the Second Hellenic Republic.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>AD 19 – Tiberius Gemellus, Roman son of Drusus Julius Caesar and Livilla; adoptive son of the Emperor Caligula (died 38)</li>
              <li>1332 – King Charles II of Navarre (died 1387)</li>
              <li>1584 – Philip Herbert, 4th Earl of Pembroke (died 1649)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1877 – William Morris, 1st Viscount Nuffield, English businessman and philanthropist, founded Morris Motors (died 1963)</li>
              <li>1731 – Henry Cavendish, French-English chemist, physicist, and philosopher (died 1810)</li>
              <li>1858 – Maurice Prendergast, American painter and academic (died 1924)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1914 – Tommy Fine, American baseball player and businessman (died 2005)</li>
              <li>1946   – Chris Tarrant, English radio and television host</li>
              <li>1995   – Courtland Sutton, American football player</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1308 – Patrick Dunbar, 8th Earl of Dunbar</li>
              <li>1174 – Adela of Ponthieu, Countess of Surrey</li>
              <li>1149 – Al-Hafiz, Fatimid imam-caliph (born 1074/77)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1723 – William Cowper, 1st Earl Cowper, English lawyer and politician, Lord High Chancellor of Great Britain (born 1665)</li>
              <li>1806 – Prince Louis Ferdinand of Prussia (born 1772)</li>
              <li>1759 – Granville Elliott, English general (born 1713)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1987 – Behice Boran, Turkish Marxist politician, author and sociologist (born 1910)</li>
              <li>1963 – Roy Cazaly, Australian footballer and coach (born 1893)</li>
              <li>2014   – Ed Nimmervoll, Austrian-Australian journalist, historian, and author (born 1947)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
