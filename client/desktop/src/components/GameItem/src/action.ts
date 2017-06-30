'use strict';

export const registerNewGame = (url: string, gameId: string): Promise<any> => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            gameName: gameId
        })
    })
    .then((response: Response) => {
        if (response.status === 200) {
            return response.json();
        }
        throw new Error('Register-game: Connection problem, status = ' + response.status);
    })
    .catch((err) => {
        console.error(err ? err : 'Register-game: error.');
    });
};