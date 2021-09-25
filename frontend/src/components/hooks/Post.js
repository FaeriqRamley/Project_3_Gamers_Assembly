export default async function Post(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        credentials: "include", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
