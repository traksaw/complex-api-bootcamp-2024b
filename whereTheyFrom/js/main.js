document.querySelector('#factBtn').addEventListener('click', findMyCeleb)
document.querySelector('#factBtn').addEventListener('click', resetInput)


function findMyCeleb() {
    const name = document.querySelector('#nameIpt').value;
    const urlUno = `https://api.api-ninjas.com/v1/celebrity?name=${name}`;
    const options = {
        method: 'GET',
        headers: {
            'x-Api-key': apiKey,
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
                        const flagName = document.querySelector('#flagName')
                        flagName.textContent = `${flagCode}`

                        const input = document.querySelector('#nameIpt')

                        // input.addEventListener('focus',resetInput)
                        // function resetInput() {
                        //     input.value = '';
                        // } //takes input value off when clicked on it

                    }) //refactor point
                }
                
                
                
                
            });



        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}
function resetInput() {
const input = document.querySelector('#nameIpt')
input.value = ''

}