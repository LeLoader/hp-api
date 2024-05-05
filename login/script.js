const login = document.getElementById("login");
const signin = document.getElementById("signin");

login.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email);
    console.log(password)

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
          },
    });
    if(response.status == 200){
        const token = await response.text();
        localStorage.setItem("token", token);
        window.location.href = "../profile/profile.html";
    }
    
});

signin.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email2").value;
    const password = document.getElementById("password2").value;

    const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
          },
    });
    if(response.status == 200){
        const token = await response.text();
        localStorage.setItem("token", token);
        window.location.href = "../profile/profile.html";
    }
});

