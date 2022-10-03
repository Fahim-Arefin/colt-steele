const tvShowAPI = async (inputValue) => {
    try {
        const config = {
            params: {
                q: inputValue
            }
        }
        const response = await axios.get('https://api.tvmaze.com/search/shows', config)
        return response.data
    } catch {
        return 'could not collect data from API'
    }
}
const form = document.querySelector('#serchForm')
form.addEventListener('submit', async (e) => {
    deleteSectionChild()
    e.preventDefault()
    let inputValue = form.elements.query.value
    let data = await tvShowAPI(inputValue)
    addImage(data)
    form.elements.query.value =''
})
const addImage = (data) => {
    let section = document.querySelector('#result')
    for (let result of data) {
        if (result.show.image) {
            let div = document.createElement('div')
            let img = document.createElement('IMG')
            img.src = result.show.image.medium
            div.append(img)
            section.append(div)
        }
    }
}
const deleteSectionChild =()=>{
    let allDivs = document.querySelectorAll('#result div')
    // console.log(allDivs)
    for(let div of allDivs){
        div.remove()
    }
}