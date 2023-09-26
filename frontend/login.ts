// get the element from html file with id="submit" and add an event listener with the query selector
document.querySelector("#submit")?.addEventListener("click", () => {
    // get the values from the input fields
    const email = (document.querySelector("#email") as HTMLInputElement)?.value;
    const password = (document.querySelector("#password") as HTMLInputElement)?.value;
    console.log(email, CryptoJS.SHA256(password).toString());
    // send a post request to the backend to check the login by passing the data in the body in json and encrypting the password in sha256
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: CryptoJS.SHA256(password).toString(), // use CryptoJS.SHA256 instead of SHA256
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // if the login is successful, redirect to the notes page
        if (data.success) {
          window.location.href = "/index";
        } else {
            
          // else show an error message
          //document.querySelector("#error")!.innerHTML = data.message;
        }
      })
      .catch((error) => console.error(error));
  });