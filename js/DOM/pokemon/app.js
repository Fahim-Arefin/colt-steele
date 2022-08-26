// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png


for (let i = 1; i <= 151; i++) {
    const pokemon = document.createElement('div')
    const label = document.createElement('span')
    const image = document.createElement('img')
    const root = document.querySelector('#container')
    label.innerText=`#${i}`
    image.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`
    pokemon.appendChild(image)
    pokemon.appendChild(label)
    root.appendChild(pokemon)
    pokemon.classList.add('pokemon')
}

