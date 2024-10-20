document.querySelector('#factBtn').addEventListener('click', findMyCeleb)

function findMyCeleb() {
    const name = document.querySelector('#nameIpt').value;
    const urlUno = `https://api.api-ninjas.com/v1/celebrity?name=${name}`;
    const options = {
        method: 'GET',
        headers: {
            'x-Api-key': 'API_KEY',
        },
        contentType: 'application/json',
    };

    fetch(urlUno, options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const parentItem = document.querySelector('#imgSection')
            //removes all existing children from the list element
            while (parentItem.firstChild) {
                parentItem.removeChild(parentItem.lastChild);
            } //refactor point
            
            data.forEach(celeb => {
            // processCeleb(parentItem)
                const listItem = document.createElement('li')
                const imgItem = document.createElement('img')
                const textItem = document.createElement('p')
                
                parentItem.appendChild(listItem)
                listItem.appendChild(textItem)
                listItem.appendChild(imgItem)
                textItem.textContent = celeb.name
                const flagCode = celeb.nationality
                // console.log(`Celeb = ${celeb.name} : Nationality = ${celeb.nationality}`)

                if (!flagCode) {
                    //deal with unknown nationality
                    textItem.textContent = `${celeb.name} : unknown nationality`

                } else {
                    const urlDos = `https://restcountries.com/v3.1/alpha?codes=${flagCode}`;
                    fetch(urlDos)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        const flagImg = data[0].flags.png
                        const flagItem = data[0].flags
                        imgItem.src = flagImg
                        

                    }) //refactor point
                }
                
                
                
                
            });



        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}