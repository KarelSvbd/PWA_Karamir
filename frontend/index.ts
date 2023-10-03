const apiUrl = 'http://10.5.51.40:3000/courses';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    data.forEach((cours: any) => {
      const listecours = document.querySelector("#listecours") as HTMLElement;
      listecours.innerHTML += `
        <div class="w3-third w3-container w3-margin-bottom">
          <img src="csharpicon.png" alt="Norway" style="width:100%" class="w3-hover-opacity">
          <div class="w3-container w3-white">
            <p><b>${cours['category']}, ${cours['name']}</b></p>
            <p>${cours['description']}</p>
          </div>
        </div>
      `;
      console.log(cours);
    });
  })
  .catch(error => {
    console.error('Error fetching data from API:', error);
  });