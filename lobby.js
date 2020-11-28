const crypt = require("crypto");

/**The Lobby Class is the main interface that handles interaction
 * between players and players' move to win the card game
 */
module.exports = class Lobby {

    /**
     * Construct a Lobby instance with the following:
     * @constructor
     * @param {string} code -> a unique code to identify a lobby
     * @param {Game} game -> the Rummy game
     */
    constructor(code, game) {
        this.code = code;
        this.game = game;

        //this is a game token to generate a random code for lobby
        this.token = crypt.randomBytes(22).toString('hex');

        //sockets represents players
        this.sockets = [null, null];
        //the lobby is waiting for new player
        this.isWaiting = true;
        //if true, the player is drawing a card; if false, the player is discarding a card
        this.drawPhase = true;
        //either 1 or 0, depends on this.sockets's index
        this.turn = 0;

        this.destruct = null;
        this.generateCards();
        this.numberOfMelds = 0;
    }

    /**
     * This function is used to generate a deck of cards of 4 suits
     * In this game, Ace can be meld with 2 and 3 / Q and K
     */
    generateCards() {
        this.cardRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

        let cards = [];

        for (let suit of ['s', 'h', 'd', 'c']) {
            let i = 1;
            while (i <= 13) {
                cards.push({
                    // html: `.card._${i}.${suit}`,
                    suit: suit,
                    rank: i,
                    // value: this.cardRanks.indexOf("" + i)
                });
                i++;
            }

        }
        //TODO: reenable this
        //Loop for shuffling cards
        let l = cards.length - 1;
        while (l > 0) {
            const n = Math.floor(Math.random() * (l + 1));
            [cards[l], cards[n]] = [cards[n], cards[l]];
            l--;
        }

        this.playerCards = [cards.splice(0, 10), cards.splice(0, 10)];
        this.melds = [];
        //a card to draw from the deck
        this.discardPile = cards.splice(0, 1);
        this.deck = cards;
    }

    /**
    * Check whether a userToken is in one of the preexisting connections
    * @param {string} userToken -> the clients' auth token
    * @return {Bool} 
    */
    checkUserToken(userToken){
        for (let socket of this.sockets){
            if (socket!=null && socket.userToken == userToken) return true;
        }
        return false;
    }
    /**
     * This is the main function for processing the clients' data while playing the game
     * @param {WebSocket} webSocket -> the clients' websocket
     * @param {Object} data -> the data received from clients 
     */
    processingData(webSocket, data) {
        console.log("data from clients: ", data);
        //sanitize data.card.rank, which was converted into string cus JSON.parse
        if (data.card) {
            data.card.rank = parseInt(data.card.rank);
        }
        //Postpone selfDestruct
        clearTimeout(this.destruct);
        this.destruct = setTimeout(() => { this.selfDestruct(); }, 300 * 1000);

        this.checkPlayers();

        if (data.cmd == 'join') {
            webSocket.userToken = data.userToken;
            this.joinProcess(webSocket);
        }
        // else if (data.cmd == 'click' && this.sockets.indexOf(webSocket) == this.turn) {
        else if (this.sockets.indexOf(webSocket) == this.turn) {
            let playerIndex = this.sockets.indexOf(webSocket);
            if (data.cmd == 'draw') {

                if (this.drawPhase) {
                    this.cardChoosing(playerIndex, data);
                }
            }
            else {
                if (data.cmd == 'newmeld' && data.meld != null && data.meld.length == 3) {
                    this.meldCards(playerIndex, data.meld);
                }
                else if (data.cmd == "addmeld") {
                    let card = this.findMatchCards(this.playerCards[playerIndex], data.card);
                    this.addCardToMeld(playerIndex, card, data.meldId);
                }
                else {
                    let card = this.findMatchCards(this.playerCards[playerIndex], data);

                    if (card != null) {
                        if (data.cmd = "discard") {
                            this.discardCard(playerIndex, card);
                        }
                        this.checkWinner();
                    }
                }
            }
        }
    }

    /**
     * This function is used to delete the lobby when the game is over
     */
    selfDestruct() {
        console.log("Removing Lobby", this.code);
        for (let socket of this.sockets) {
            if (socket != null) {
                socket.terminate();
            }
        }
        this.game.delLobby(this.code);
    }

    /**
     * This function is used to check the connection of the players
     */
    checkPlayers() {
        let l = 0;
        while (l < this.sockets.length) {
            if (this.sockets[l] != null) {
                try {
                    this.sendData(this.sockets[l], { cmd: 'ping' });
                }
                catch (err) {
                    this.isWaiting = true;
                    this.sockets[l] = null;
                }
            }
            l++;
        }
    }

    /**
     * This function is used to send data to client
     * @param {WebSocket} webSocket -> the client's websocket
     * @param {Object} data -> the data that is sent
     * @returns {boolean} -> the result of whether data is sent or not
     */
    sendData(webSocket, data) {
        if (webSocket != null) {
            try {
                webSocket.send(JSON.stringify(data));
                return true;
            }
            catch (err) {
                //catch error
            }
        }
        return false;
    }

    /**
     * This function is used to handle client(s) that are joining the game
     * @param {WebSocket} webSocket -> the client's socket
     */
    joinProcess(webSocket) {
        //(If Game lobby is already full OR lobby is not empty) AND client is NOT rejoining (no preexisting token)
        if ((this.sockets.indexOf(null) == -1|| !this.isWaiting )
            && !this.checkUserToken(webSocket.userToken)
            ) 
        {
            //do not allow client to join
            this.sendData(webSocket, { cmd: 'exit' });
        }
        else {
            //loop through the sockets/client connections
            for (let i = 0; i < this.sockets.length; i++) {
                if (this.sockets[i] != null && this.sockets[i].userToken == webSocket.userToken) {
                    //a user is rejoining the game
                    //reset client's websocket
                    this.sockets[i] = webSocket;
                    //Resend copy of current deck and layout to client
                    this.sendData(webSocket, {
                        cmd: 'cards',
                        cards: this.playerCards[this.sockets.indexOf(webSocket)],
                        opcards: this.playerCards[this.sockets.indexOf(webSocket) ^ 1].length,
                        deck: this.deck.length,
                        melds: this.melds,
                        discardPile: this.discardPile,
                        myturn: this.sockets.indexOf(webSocket) == this.turn,
                        drawPhase: this.drawPhase
                    });
                    return;
                }
            }

            //a new client is joining
            if (this.sockets.indexOf(webSocket) == -1) {
                //Add client to the game lobby
                this.sockets[this.sockets.indexOf(null)] = webSocket;

                if (this.sockets.indexOf(null) == -1) {
                    this.isWaiting = false;
                }
            }

            //Send copy of current deck and layout to new client
            this.sendData(webSocket, {
                cmd: 'cards',
                cards: this.playerCards[this.sockets.indexOf(webSocket)],
                opcards: this.playerCards[this.sockets.indexOf(webSocket) ^ 1].length,
                deck: this.deck.length,
                melds: this.melds,
                discardPile: this.discardPile,
                myturn: this.sockets.indexOf(webSocket) == this.turn,
                drawPhase: this.drawPhase
            });
        }
    }

    /**
     * This function is used to handle players when they are choosing a card
     * @param {number} playerIndex -> to indicate the current player that is choosing
     * @param {object} data -> the data that is associated with the choosing process
     */
    cardChoosing(playerIndex, data) {
        //Draw card from deck
        if (data.from == 'deck' && this.deck.length > 0) {
            let topCard = this.deck.pop();
            this.playerCards[playerIndex].push(topCard);

            this.sendData(this.sockets[playerIndex], {
                cmd: 'draw',
                from: 'deck',
                player: 'me',
                card: topCard
            });
            this.sendData(this.sockets[playerIndex ^ 1], {
                cmd: 'draw',
                from: 'deck',
                player: 'op'
            });
            this.drawPhase = false;
        }
        //Draw card from pile
        else if (data.from == 'discardPile' && this.discardPile.length > 0 && this.findMatchCards(this.discardPile, data) != null) {
            let topCard = this.discardPile.pop();
            this.playerCards[playerIndex].push(topCard);

            this.sendData(this.sockets[playerIndex], {
                cmd: 'draw',
                from: 'discardPile',
                player: 'me',
                card: topCard
            });
            this.sendData(this.sockets[playerIndex ^ 1], {
                cmd: 'draw',
                from: 'discardPile',
                player: 'op'
            });
            this.drawPhase = false;
        }
    }

    /**
     * This funtion is used to find card with the same suit and rank
     * @param {Card[]} playerCards -> the player's cards 
     * @param {Card} targetCard -> the suit and rank of this card is used as a comparison
     * @returns {Card} -> returns a matching card with the same suit and rank
     */
    findMatchCards(playerCards, targetCard) {
        for (let card of playerCards) {
            if (card.rank == targetCard.rank && card.suit == targetCard.suit) {
                return card;
            }
        }
        return null;
    }

    /**
     * This function is used to handle a discarding card action from player
     * @param {number} playerIndex -> the current player that is discarding a card
     * @param {Card} card -> the card that is discarded
     */
    discardCard(playerIndex, card) {
        this.playerCards[playerIndex].splice(this.playerCards[playerIndex].findIndex(cardVal => cardVal.rank == card.rank && cardVal.suit == card.suit), 1);
        this.discardPile.push(card);

        this.sendData(this.sockets[playerIndex], {
            cmd: 'discard',
            player: 'me',
            card: card
        });
        this.sendData(this.sockets[playerIndex ^ 1], {
            cmd: 'discard',
            player: 'op',
            card: card
        });
        this.drawPhase = true;
        this.turn ^= 1;
    }

    /**
     * This function is used to meld cards either by suit or rank
     * @param {number} playerIndex -> the current player that is doing a meld
     * @param {*} meld -> the client provided meld
     */
    meldCards(playerIndex, meld) {
        // let nMeld = this.createNewMeld(this.playerCards[playerIndex],card);

        //Create a new meld
        //TODO: validate meld
        let validateMeld = (meld) => {
            if (meld.length != 3) return false;
            else return true;
        };

        if (validateMeld(meld)) {
            this.sortDeck(meld);

            for (let card of meld) {
                this.playerCards[playerIndex]
                .splice(this.playerCards[playerIndex].findIndex(cardVal => cardVal.rank == card.rank && cardVal.suit == card.suit), 1);
            }
            //assign id to a meld
            let meldId = this.numberOfMelds;
            this.numberOfMelds++;

            this.melds.push(meld);

            this.sendData(this.sockets[playerIndex],
                {
                    cmd: 'newmeld',
                    player: 'me',
                    meld: meld,
                    meldId: meldId
                });
            this.sendData(this.sockets[playerIndex ^ 1],
                {
                    cmd: 'newmeld',
                    player: 'op',
                    meld: meld,
                    meldId: meldId
                });
        }

    }
    /**
    * This function is used to add a card from current player's cards into a meld
    * @param {int} playerIndex -> index of the player doing the adding
    * @param {Card} card -> the card that needs to be add to a meld
    * @param {int} meldId -> the card that needs to be add to a meld
    */
    addCardToMeld(playerIndex, card, meldId) {
        let meldWithAddedCard = this.addToExistingMeld(card, meldId);
        // let meld = this.melds[meldId];

        if (meldWithAddedCard != null) {
            this.playerCards[playerIndex].splice(this.playerCards[playerIndex].findIndex(cardVal => cardVal.rank == card.rank && cardVal.suit == card.suit), 1);
            this.melds[meldId] = meldWithAddedCard;

            this.sendData(this.sockets[playerIndex], {
                cmd: 'addmeld',
                player: 'me',
                meldId: meldId,
                card: card,
                meld: meldWithAddedCard
            });
            this.sendData(this.sockets[playerIndex ^ 1], {
                cmd: 'addmeld',
                player: 'op',
                meldId: meldId,
                card: card,
                meld: meldWithAddedCard
            });
        }
    }
    /**
     * This function is used to create a new meld from current player's cards
     * @param {Card[]} cards -> a collection of player's card
     * @param {Card} targetCard -> the card that is targetted to form a meld
     * @returns {Card[]} -> return a meld if the target card satisfies meld requirements
     */
    createNewMeld(cards, targetCard) {
        let aCard = (deck, suit, value) => this.findMatchCardsByVal(deck, suit, value) != null;

        let suitMeld = [targetCard];

        //Loops to find the longest sequence for suit meld
        let index = targetCard.value;
        let lowerIndex = index - 1;
        let upperIndex = index + 1;
        while (lowerIndex >= 0 && aCard(cards, targetCard.suit, lowerIndex)) {
            suitMeld.unshift(this.findMatchCards(cards, { suit: targetCard.suit, rank: this.cardRanks[lowerIndex] }));
            lowerIndex--;
        }
        while (upperIndex < this.cardRanks.length && aCard(cards, targetCard.suit, upperIndex)) {
            suitMeld.push(this.findMatchCards(cards, { suit: targetCard.suit, rank: this.cardRanks[upperIndex] }));
            upperIndex++;
        }

        //If the card is an Ace, try switching its value
        if (targetCard.value == 0) {
            targetCard.value = 14;
            let aMeld = this.createNewMeld(cards, targetCard);
            if (aMeld.length > suitMeld.length) {
                suitMeld = aMeld;
            }
        }

        let rankMeld = cards.filter((card) => card.rank == targetCard.rank);

        //Return a meld with the same rank or a sequence rank of cards
        if (rankMeld.length > suitMeld.length) {
            return rankMeld;
        }
        else {
            return suitMeld;
        }
    }

    /**
     * This function is used to find card that matches a suit and a value
     * @param {Card[]} cards -> a collection of cards to be checked 
     * @param {string} suit -> the suit to be compared
     * @param {number} value -> the card's value to be compared
     * @returns {Card} -> returns a card if it matches the given suit and value
     */
    findMatchCardsByVal(cards, suit, value) {
        for (let card of cards) {
            if (card.suit == suit && card.value == value) {
                return card;
            }
        }
        return null;
    }

    /**
     * This function is used to sort a deck of cards
     * @param {Card[]} deck -> a deck of cards to be sorted
     * @returns {} -> based on rank value or suit
     */
    sortDeck(deck) {
        deck.sort((m, n) => {
            if (m.suit == n.suit) {
                return m.value - n.value  ;//sort asc
            }
            else {
                return m.suit - n.suit;
            }
        });
    }

    /**
     * This function is used to add a card to an existing meld
     * @param {Card} targetCard -> the card to be added to an existing meld
     * @returns {Object} -> returns the index of the meld and the new meld
     */
    addToExistingMeld(targetCard, meldId) {
        let targetCardRank = targetCard.rank;
        // let l = 0;

        // while (l < this.melds.length) {
        let meld = this.melds[meldId].slice(0);

        //Meld with the same suit
        if (meld[0].rank != meld[meld.length - 1].rank) {
            if (meld[0].suit == targetCard.suit) {

                //Add to the front
                if ((meld[0].rank - 1) == targetCardRank) {
                    meld.unshift(targetCard);
                    return meld;
                }
                //Add to the back
                else if ((meld[meld.length - 1].rank + 1) == targetCardRank) {
                    meld.push(targetCard);
                    return meld;
                }
            }
        }
        //Meld with the same rank
        else if (meld[0].rank == targetCard.rank) {
            meld.push(targetCard);
            this.sortDeck(meld);
            return meld;
        }
        // l++;
        // }

        // If the card is an Ace, try switching its value to match existing meld
        // if (targetCard.value == 0) {
        //     targetCard.value = 14;
        //     return this.addToExistingMeld(targetCard);
        // }

        return null;
    }

    /**
     * This function is used to check whether a player win or lose
     */
    checkWinner() {
        let l = 0;
        while (l < this.playerCards.length) {
            if (this.playerCards[l].length == 0) {
                let winnerScore = this.calcScore(this.playerCards[l ^ 1])
                this.sendData(this.sockets[l], {
                    cmd: 'win',
                    score: winnerScore
                });
                this.sendData(this.sockets[l ^ 1], { 
                    cmd: 'loss', 
                    score: winnerScore 
                });
                //destroy the lobby in 5 secs
                setTimeout(() => {
                    this.selfDestruct();
                }, 1000); 
                break;
            }
            l++;
        }
    }

    /**
     * This function is used to calculate the score from the remaining cards
     * @param {Card[]} cards -> the remaining card(s) of the losing player
     * @returns {number} -> the total points of the remaining cards 
     */
    calcScore(cards) {
        let total = 0;

        for (let card of cards) {
            if (card.rank == 11 || card.rank == 12 || card.rank == 13) {
                total += 10;
            }
            else total += card.rank
        }
        return total;
    }
};