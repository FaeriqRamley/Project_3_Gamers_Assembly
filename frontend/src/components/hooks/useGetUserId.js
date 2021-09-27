import { useState, useEffect } from "react";

function useGetUserId(id) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/users/user/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw Error("Could not fetch data");
            }
            return res.json();
        })
        .then((data) => {
            setData(data);
            setLoading(false);
            setError(null);
        }).catch((err) => {
            setLoading(false);
            setError(err.message);
        })
    }, [id]);

    return { data, loading, error };
}

export default useGetUserId;
