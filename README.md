# Simpsons-Character-Lookup
A small web application that lets users search for characters from The Simpsons using the public API at https://thesimpsonsapi.com/. The app fetches character information, processes it with a simulated delay, and displays the character’s details along with an image and quote.

##  Features
- Search for any Simpsons character by name  
- Fetches character data from an external API  
- Adds a 10‑second simulated processing delay  
- Displays:
  - ✅ Name  
  - ✅ Age (or “Unknown”)  
  - ✅ Occupation  
  - ✅ Portrait  
  - ✅ A quote from the character  

##  How It Works
### 1. **Fetching Character Data**
```js
function fetchSimpsonsData(simpsonName) {
  return fetch(`https://thesimpsonsapi.com/api/characters/${simpsonName}`)
    .then(response => response.json())
    .then(data => {
      return data.results?.[0]; // first result (if any)
    });
}
```

### 2. **Processing Data With Delay**
``` js
function processData(data){
  return new Promise((resolve) => {
    setTimeout(() => {
      const processedData = {
        name: data.name,
        age: data.age,
        occupation: data.occupation,
        image: "https://cdn.thesimpsonsapi.com/500" + data.portrait_path,
        quote: data.phrases[0],
      };
      resolve(processedData);
    }, 10000);
  });
}
```

### 3. **Displaying Results**
```js
document.getElementById("search").addEventListener("click", () => {
  const simpsonName = document.getElementById("name").value;
  const output = document.getElementById("info");

  output.innerText = "Fetching data...";

  fetchSimpsonsData(simpsonName)
    .then(data => processData(data))
    .then(result => {
      output.innerHTML = `
        <h2>The Simpson:</h2>
        <p><strong>Name:</strong> ${result.name}</p>
        <p><strong>Age:</strong> ${result.age || "Unknown"}</p>
        <p><strong>Occupation:</strong> ${result.occupation || "Unknown"}</p>
        <img src="${result.image}" alt="${result.name}">
        <p><em>"${result.quote}"</em></p>
      `;
    })
    .catch(err => {
      output.innerHTML = `<p>Character not found</p>`;
    });
});
```

## Example HTML Structure
```html
<input id="name" type="text" placeholder="Enter a Simpsons character">
<button id="search">Search</button>
<div id="info"></div>
```

## License
This project is free to use for learning and hobby purposes.
