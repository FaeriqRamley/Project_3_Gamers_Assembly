export default async function CallApi(url,method,data=null) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: method, 
        credentials: "include", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
