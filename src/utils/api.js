const checkResOk = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const submitForm = async (data) => {
    const res = await fetch("https://hookb.in/eK160jgYJ6UlaRPldJ1P", {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return checkResOk(res);
};