async function MainPage() {
    let url = "/";
    let response = await fetch(url);

    if (response.ok) {
        window.location.href = url;
    } else {
        console.error("ERROR LOADING PAGE");
    }
}


