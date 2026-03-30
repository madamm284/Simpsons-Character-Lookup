function fetchSimpsonsData(simpsonName) {
  return fetch(`https://thesimpsonsapi.com/api/characters/${simpsonName}`)
    .then(response => response.json())
    .then(data => {
      return data.results?.[0]; // first result (if any)
    });
}


function processData(data){

    return new Promise((resolve) => {

        setTimeout(()=> {
            const processedData ={

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
document.getElementById("search").addEventListener("click", ()=> {

    const simpsonName= document.getElementById("name").value;
    const output =document.getElementById("info");

    output.innerText ="Fetching data...";

    fetchSimpsonsData(simpsonName)
    .then(data => processData(data))     
 
    .then(result =>{

        output.innerHTML=`
        <h2> The Simpson: </h2>
        <p><strong> Name: </strong> ${result.name}</p>
        <p><strong< Age: </strong> ${result.age} || "Unknown"</p>
        <p><strong> Occupation :</strong> ${result.occupation}|| "Unknown"</p>       

        <img src="${result.image}" alt="${result.name}">
        <p><em>"${result.quote}"</em></p>

      
        `;

    })
    .catch(err => {
        output.innerHTML =`<p>Character not found</p>`;

    });

   });
