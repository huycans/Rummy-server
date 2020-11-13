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

        this.sockets = [null,null];
        this.isWaiting = true;
        this.choosePhase = true;
        this.turn = 0;

        this.destruct = null;
        this.generateCards();
    }

    /**
     * This function is used to generate a deck of cards of 4 suits
     * In this game, Ace can be meld with 2 and 3 / Q and K
     */
    generateCards() {
        this.cardRanks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        let cards = [];

        for (let suit of ['spade', 'heart', 'diamond', 'club']) {
            let i = 2;
            while (i <= 10) {
                cards.push({
                    html: `.card._${i}.${suit}`,
                    suit: suit,
                    rank: "" + i,
                    value: this.cardRanks.indexOf("" + i)
                });
                i++;
            }
            for (let face of ['A', 'J', 'Q', 'K']) {
                cards.push({
                        html: `.card._${face}.${suit}`,
                        suit: suit,
                        rank: face,
                        value: this.cardRanks.indexOf(face)
                });
            }
        }
        //Loop for shuffling cards
        let l = cards.length - 1;
        while (l > 0) {
            const n = Math.floor(Math.random()*(l+1));
            [cards[l], cards[n]] = [cards[n], cards[l]];
            l--;
        }

        this.playerCards = [cards.splice(0,10), cards.splice(0,10)];
        this.melds = [];
        this.draw = cards.splice(0,1);
        this.deck = cards;
    }

    /**
     * This is the main function for processing the clients' data while playing the game
     * @param {WebSocket} webSocket -> the clients' websocket
     * @param {Object} data -> the data received from clients 
     */
    processingData(webSocket, data) {
        //Postpone selfDestruct
        clearTimeout(this.destruct);
        this.destruct = setTimeout( () => { this.selfDestruct(); }, 300*1000);

        this.checkPlayers();

        if (data.cmd == 'join') {
            this.joinProcess(webSocket);
        }
        else if (data.cmd == 'click' && this.sockets.indexOf(webSocket) == this.turn) {
            let playerIndex = this.sockets.indexOf(webSocket);

            if (this.choosePhase) {
                this.cardChoosing(playerIndex,data);
            }
            else {
                let card = this.findMatchCards(this.playerCards[playerIndex], data);

                if (card != null) {
                    if (data.button == 'left') {
                        this.discardCard(playerIndex,card);
                    }
                    else {
                        this.meldCards(playerIndex,card);
                    }
                    this.checkWinner();
                }
            }
        }
    }

    /**
     * This function is used to delete the lobby when the game is over
     */
    selfDestruct() {
        console.log("Removing Lobby", this.code);
        for(let socket of this.sockets) {
            if(socket != null) {
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
        while(l < this.sockets.length) {
            if(this.sockets[l] != null) {
                try {
                    this.sendData(this.sockets[l], {cmd: 'ping'});
                }
                catch(err) {
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
        //Game lobby is already full
        if(this.sockets.indexOf(null) == -1 || !this.isWaiting) {
            this.sendData(webSocket, {cmd: 'exit'} );
        }
        else {
            //Add client to the game lobby
            this.sockets[this.sockets.indexOf(null)] = webSocket;
            if(this.sockets.indexOf(null) == -1) {
                this.isWaiting = false;
            }

            //Send copy of current deck and layout to new client
            this.sendData(webSocket, {
                cmd: 'cards',
                cards: this.playerCards[this.sockets.indexOf(webSocket)],
                opcards: this.playerCards[this.sockets.indexOf(webSocket) ^ 1].length,
                deck: this.deck.length,
                melds: this.melds,
                draw: this.draw,
                myturn: this.sockets.indexOf(webSocket) == this.turn
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
        if(data.button=='left' && data.card=='deck' && this.deck.length>0) {
            let nCard = this.deck.pop();
            this.playerCards[playerIndex].push(nCard);

            this.sendData(this.sockets[playerIndex], {
                cmd: 'draw',
                from: 'deck',
                player: 'me',
                card: nCard
            });
            this.sendData(this.sockets[playerIndex ^ 1], {
                cmd: 'draw',
                from: 'deck',
                player: 'op'
            });
            this.choosePhase = false;
        } 
        //Draw card from pile
        else if(data.button=='left' && data.card!='deck' && this.draw.length>0 && this.findMatchCards(this.draw,data)!=null) {
            let nCard = this.draw.pop();
            this.playerCards[playerIndex].push(nCard);

            this.sendData(this.sockets[playerIndex], {
                cmd: 'draw',
                from: 'draw',
                player: 'me',
                card: nCard
            });
            this.sendData(this.sockets[playerIndex ^ 1], {
                cmd: 'draw',
                from: 'draw',
                player: 'op'
            });
            this.choosePhase = false;
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
        this.playerCards[playerIndex].splice(this.playerCards[playerIndex].indexOf(card),1);
        this.draw.push(card);

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
        this.choosePhase = true;
        this.turn ^= 1;
    }

    /**
     * This function is used to meld cards either by suit or rank
     * @param {number} playerIndex -> the current player that is doing a meld
     * @param {*} card -> the card(s) that is melded
     */
    meldCards(playerIndex, card) {
        let nMeld = this.createNewMeld(this.playerCards[playerIndex],card);

        //Create a new meld
        if (nMeld.length >= 3) {
            this.sortDeck(nMeld);

            for (let card of nMeld) {
                this.playerCards[playerIndex].splice(this.playerCards[playerIndex].indexOf(card),1);
            }
            this.melds.push(nMeld);

            this.sendData(this.sockets[playerIndex],
                {
                    cmd: 'newmeld',
                    player: 'me',
                    meld: nMeld
                });
            this.sendData(this.sockets[playerIndex ^ 1],
                {
                    cmd: 'newmeld',
                    player: 'op',
                    meld: nMeld
                });
        }
        //Check if the card can be added to a meld
        else {
            let meld = this.addToExistingMeld(card);

            if (meld.index >= 0) {
                this.playerCards[playerIndex].splice(this.playerCards[playerIndex].indexOf(card),1);
                this.melds[meld.index] = meld.meld;

                this.sendData(this.sockets[playerIndex], {
                    cmd: 'addmeld',
                    player: 'me',
                    index: meld.index,
                    card: card,
                    meld: meld.meld
                });
                this.sendData(this.sockets[playerIndex ^ 1], {
                    cmd: 'addmeld',
                    player: 'op',
                    index: meld.index,
                    card: card,
                    meld: meld.meld
                });
            }
        }
    }

    /**
     * This function is used to create a new meld from current player's cards
     * @param {Card[]} cards -> a collection of player's card
     * @param {Card} targetCard -> the card that is targetted to form a meld
     * @returns {Card[]} -> return a meld if the target card satisfies meld requirements
     */
    createNewMeld(cards, targetCard) {
        let aCard = (deck,suit,value) => this.findMatchCardsByVal(deck,suit,value)!=null;

        let suitMeld = [targetCard];

        //Loops to find the longest sequence for suit meld
        let index = targetCard.value;
        let lowerIndex = index - 1;
        let upperIndex = index + 1;
        while(lowerIndex>=0 && aCard(cards,targetCard.suit,lowerIndex)) {
            suitMeld.unshift(this.findMatchCards(cards,{suit:targetCard.suit, rank:this.cardRanks[lowerIndex]}));
            lowerIndex--;
        }
        while(upperIndex<this.cardRanks.length && aCard(cards,targetCard.suit,upperIndex)) {
            suitMeld.push(this.findMatchCards(cards,{suit:targetCard.suit,rank:this.cardRanks[upperIndex]}));
            upperIndex++;
        }

        //If the card is an Ace, try switching its value
        if (targetCard.value == 0) {
            targetCard.value = 14;
            let aMeld = this.createNewMeld(cards,targetCard);
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
            if (card.suit==suit && card.value==value) {
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
        deck.sort( (m,n) => {
            if (m.rank != n.rank) {
                return m.value - n.value;
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
    addToExistingMeld(targetCard) {
        let index = targetCard.value;
        let l = 0;

        while (l < this.melds.length) {
            let meld = this.melds[l].slice(0);

            //Meld with the same suit
            if (meld[0].rank != meld[meld.length-1].rank) {
                if (meld[0].suit == targetCard.suit) {
                    let firstRankIndex = meld[0].value;
                    let lastRankIndex = meld[meld.length-1].value;

                    //Add to the front
                    if ((firstRankIndex-1) == index) {
                        meld.unshift(targetCard);
                        return {
                            index: 1,
                            meld: meld
                        };
                    }
                    //Add to the back
                    else if ((lastRankIndex + 1) == index) {
                        meld.push(targetCard);
                        return {
                            index: l,
                            meld: meld
                        };
                    }
                }
            }
            //Meld with the same rank
            else if (meld[0].rank == targetCard.rank) {
                meld.push(targetCard);
                this.sortDeck(meld);
                return {
                    index: l,
                    meld: meld
                };
            }
            l++;
        }

        // If the card is an Ace, try switching its value to match existing meld
        if(targetCard.value == 0) {
            targetCard.value = 14;
            return this.addToExistingMeld(targetCard);
        }

        return {index: -1};
    }

    /**
     * This function is used to check whether a player win or loss
     */
    checkWinner() {
        let l = 0;
        while (l < this.playerCards.length) {
            if (this.playerCards[l].length == 0) {
                this.sendData(this.sockets[l], {
                    cmd: 'win',
                    score: this.calcScore(this.playerCards[l^1])
                });
                this.sendData(this.sockets[l^1],{cmd: 'loss'});
                this.selfDestruct();
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
            if (card.rank == 'A') {
                total += 1;
            }
            else if (card.rank=='J' || card.rank=='Q' || card.rank=='K') {
                total += 10;
            }
            else {
                total += card.value+1;
            }
        }
        return total;
    }
}