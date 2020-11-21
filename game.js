const Lobby = require('./lobby');

/**
 * The Game class handles the connection of players 
 * who want to enter the lobby and play the game
 */
module.exports = class Game {
    
    /**
     * Construct a Game instance with the following:
     * @constructor
     * @param {webSocketServer} webSocketSrv -> the server's web socket
     */
    constructor(webSocketSrv) {
        this.webSocketSrv = webSocketSrv;
        this.lobbies = {};

        webSocketSrv.on('connection', (ws,req) => {
            console.log("A client has connected.");
            this.sendData(ws, {
                cmd: 'connected'
            })
            ws.on('message', (message) => {
                let data = JSON.parse(message);
                if(data.cmd == 'status') {
                    this.sendData(ws, {
                        cmd: 'status',
                        status: this.getLobbyStatus(data.lobby)
                    });
                }
                else if (data.token && this.verifyData(data)) {
                    this.lobbies[data.lobby].processingData(ws,data);
                }
            });
        });
    }

    /**
     * This function is used to send data to a socket
     * @param {WebSocket} webSocket -> data is sent to this socket
     * @param {Object} data -> data that is sent 
     */
    sendData(ws,data) {
        ws.send(JSON.stringify(data));
    }

    /**
     * This function is used to get the status of a game lobby
     * @param {string} code -> lobby code
     * @returns {string} -> returns the status of the game lobby
     */
    getLobbyStatus(code) {
        if(/^\w{5,12}$/.test(code)) {
            let lobby = this.lobbies[code];

            if(lobby) {
                if(lobby.isWaiting) {
                    return 'waiting';
                }
                else {
                    return 'closed';
                }
                //return lobby.isWaiting ? 'waiting' : 'closed';
            }
            else {
                return 'open';
            }
        }
        return 'closed';
    }

    /**
     * This function is used to verify whether the data is valid
     * @param {Object} data -> data to be checked
     * @returns {boolean} -> data is valid or not
     */
    verifyData(data) {
        return this.lobbies[data.lobby] && this.lobbies[data.lobby].token == data.token;
    }

    /**
     * This function is used to delete a game lobby
     * @param {string} code -> the code of the lobby that is deleted
     */
    delLobby(code) {
        delete this.lobbies[code];
    }

    /**
     * This function is used to add a game lobby
     * @param {string} code -> the lobby code
     * @returns {boolean} -> confirm whether the lobby has been added
     */
    addLobby(code) {
        let status = this.getLobbyStatus(code);

        if (status == 'waiting')
        {
            return true;
        }
        //Create new lobby
        else if (status == 'open') {
            this.lobbies[code] = new Lobby(code, this);
            return true;
        }
        else {
            return false;
        }
    }
}