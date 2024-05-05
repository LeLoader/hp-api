const email = document.getElementById("email");
const password = document.getElementById("password");

const getMyProfile = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/getMyProfile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }); 

    if (response.status == 200) {
        const data = await response.json();
        email.innerText = "Email: " + data.email;
        password.innerText = "Hashed password: " + data.password;
    }
    else {
        window.location.href = "../login/login.html";
    }
};

function clearToken() {
    window.location.href = "../login/login.html";
    localStorage.setItem("token", "");
}

getMyProfile();