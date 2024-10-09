
function loadData() {
  return new Promise((resolve, reject) => {
    fetch('https://starwars-n5ec-developuptcs-projects.vercel.app/')
      .then(result => result.json())
      .then(result => {
        resolve(result);
      })
      .catch(err => reject(err));
  });
}

function updateTable(data) {
    const tableBody = document.querySelector('#table tbody');
  
    data.forEach(star => {
      const row = tableBody.insertRow();
  
      const cellid = row.insertCell(0);
      cellid.textContent = star._id;
  
      const cellName = row.insertCell(1);
      cellName.textContent = star.name;

      const cellHeight = row.insertCell(2);
      cellHeight.textContent = star.height;
  
      const cellMass = row.insertCell(3);
      cellMass.textContent = star.mass;

      const cellHair_color = row.insertCell(4);
      cellHair_color.textContent = star.hair_color;
  
      const cellSkin_color = row.insertCell(5);
      cellSkin_color.textContent = star.skin_color;

      const cellEye_color = row.insertCell(6);
      cellEye_color.textContent = star.eye_color;

      const cellBirth_year = row.insertCell(7);
      cellBirth_year.textContent = star.birth_year;

      const cellGender = row.insertCell(8);
      cellGender.textContent = star.gender;
      
      const cellHomeworld = row.insertCell(9);
      cellHomeworld.textContent = star.homeworld;

      const cellSpecies = row.insertCell(10);
      cellSpecies.textContent = star.species;


    })
}

function begin() {
    document.addEventListener('DOMContentLoaded', () => {
        loadData()
          .then(result => {
            updateTable(result.data)
          })
          .catch(error => {
            console.error('Error al cargar datos:', error)
          });
      })
}


function searchCharacter() {
  const characterId = document.getElementById('characterId').value;

  if (characterId) {
    getCharacterById(characterId)
      .then(character => {
        if (character) {
          displayCharacterData(character);
        } else {
          alert('Character not found');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    alert('Please enter a character ID');
  }
}

function getCharacterById(objectId) {
  return new Promise((resolve, reject) => {
    fetch(`https://starwars-n5ec-developuptcs-projects.vercel.app/${objectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(result => result.json())
      .then(result => {
        resolve(result);
      })
      .catch(err => reject(err));
  });
}

function getCharacterByName(name) {
  return new Promise((resolve, reject) => {
      fetch(`https://starwars-n5ec-developuptcs-projects.vercel.app/name/${name}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      })
          .then(result => result.json())
          .then(result => {
              // Verificamos si se encontraron personajes
              if (result.length > 0) {
                  resolve(result); // Resolvemos con los personajes encontrados
              } else {
                  resolve([]); // Si no hay personajes, resolvemos con un array vacío
              }
          })
          .catch(err => reject(err));
  });
}

function displayCharacterData(character) {
  const tableBody = document.getElementById('characterData');
  tableBody.innerHTML = '';
  const row = `
    <tr>
      <td>${character._id}</td>
      <td>${character.name}</td>
      <td>${character.height}</td>
      <td>${character.mass}</td>
      <td>${character.hair_color}</td>
      <td>${character.skin_color}</td>
      <td>${character.eye_color}</td>
      <td>${character.birth_year}</td>
      <td>${character.gender}</td>
      <td>${character.homeworld}</td>
      <td>${character.species}</td>
    </tr>
  `;
  tableBody.innerHTML = row;
}





function searchCharacter() {
  const characterId = document.getElementById('characterId').value;

  if (characterId) {
    getCharacterById(characterId)
      .then(character => {
        console.log('Character Data:', character); 
        if (character) {
          displayCharacterData(character);
        } else {
          alert('Character not found');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    alert('Please enter a character ID');
  }
}

function getCharacterById(objectId) {
  return new Promise((resolve, reject) => {
    fetch(`https://starwars-n5ec-developuptcs-projects.vercel.app/${objectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(result => result.json())
      .then(result => {
        resolve(result);
      })
      .catch(err => reject(err));
  });
}

function displayCharacterData(character) {
  const tableBody = document.getElementById('characterData');
  

  tableBody.innerHTML = '';
    const characterData = character._id ? character : character[0] || character.data || character.results;
  const row = `
    <tr>
      <td>${characterData._id || 'N/A'}</td>
      <td>${characterData.name || 'N/A'}</td>
      <td>${characterData.height || 'N/A'}</td>
      <td>${characterData.mass || 'N/A'}</td>
      <td>${characterData.hair_color || 'N/A'}</td>
      <td>${characterData.skin_color || 'N/A'}</td>
      <td>${characterData.eye_color || 'N/A'}</td>
      <td>${characterData.birth_year || 'N/A'}</td>
      <td>${characterData.gender || 'N/A'}</td>
      <td>${characterData.homeworld || 'N/A'}</td>
      <td>${characterData.species || 'N/A'}</td>
    </tr>
  `;

  tableBody.innerHTML = row;
}

  begin()
  