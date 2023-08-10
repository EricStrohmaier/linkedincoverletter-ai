import { FC, useState } from 'react'
import { apiURL } from './GenerateForm';

interface PersonURLProps {
  
}

const PersonURL: FC<PersonURLProps> = ({}) => {
    const [personURL, setPersonURL] = useState("");
    const [personLoader, setPersonLoader] = useState(false);
    const [personText, setPersonText] = useState("");


    const submitPersonURL = async (e: React.FormEvent) => {
        e.preventDefault();
        setPersonLoader(true);
    
        const personPost = apiURL + "/scrape";
    
        const personResponse = await fetch(personPost, {
          method: "POST",
          body: JSON.stringify({ pageURL: personURL }),
        });
        const personText = await personResponse.text();
        setPersonText(personText);
        console.log(personText);
    
        setPersonLoader(false);
      };
    
  return <div>PersonURL</div>
}

export default PersonURL