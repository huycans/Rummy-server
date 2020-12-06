(this["webpackJsonprummy-client"]=this["webpackJsonprummy-client"]||[]).push([[0],{24:function(e,t,a){e.exports=a(38)},29:function(e,t,a){},31:function(e,t,a){},38:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(22),i=a.n(s),d=(a(29),a(4)),c=a.n(d),o=a(5),l=a(13),u=a(9),h=a(10),m=a(2),p=a(11),f=a(12),g=r.a.createContext(),v=function(e){Object(f.a)(a,e);var t=Object(p.a)(a);function a(e){return Object(u.a)(this,a),t.call(this,e)}return Object(h.a)(a,[{key:"render",value:function(){return r.a.createElement(g.Provider,{value:Object(l.a)({},this.props.value)},this.props.children)}}]),a}(n.Component),b=g.Consumer,k=(a(31),a(32),a(7)),w=function(e){var t=e.handleInputUsername,a=e.handleInputPassword,n=e.username,s=e.password,i=e.signin,d=function(e){e.preventDefault(),i()};return r.a.createElement(b,null,(function(e){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("h1",null,"Welcome to Rummy")),r.a.createElement("div",{className:"row"},r.a.createElement("h2",null,"Signin")),r.a.createElement("div",{className:"row"},r.a.createElement("form",null,r.a.createElement("div",{className:"row w-100"},r.a.createElement("label",{htmlFor:"username"},"Username: \xa0",r.a.createElement("input",{maxLength:50,type:"text",name:"username",value:n,onChange:t})),r.a.createElement("br",null)),r.a.createElement("div",{className:"row w-100"},r.a.createElement("label",{htmlFor:"username"},"Password: \xa0",r.a.createElement("input",{maxLength:50,type:"password",name:"password",value:s,onChange:a})),r.a.createElement("br",null)),r.a.createElement("div",{className:"row"},r.a.createElement("input",{type:"submit",value:"Signin",onClick:d}))),r.a.createElement("div",{style:{marginTop:"20px"},className:"row"},r.a.createElement("p",null,"Username must be between 3 and 50 characters, contains only alphanumerics or special characters (@._)."),r.a.createElement("p",null,"Password must be between 8 and 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&_)."))),r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("h4",null,"Don't have an account yet?"),r.a.createElement(k.b,{to:"/signup"},"Click here")))}))},y=function(e){var t=e.handleInputUsername,a=e.handleInputPassword,n=e.username,s=e.password,i=e.signup,d=function(e){e.preventDefault(),i()};return r.a.createElement(b,null,(function(e){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("h1",null,"Welcome to Rummy")),r.a.createElement("div",{className:"row"},r.a.createElement("h2",null,"Signup")),r.a.createElement("div",{className:"row"},r.a.createElement("form",null,r.a.createElement("div",{className:"row w-100"},r.a.createElement("label",{htmlFor:"username"},"Username: \xa0",r.a.createElement("input",{minLength:3,maxLength:50,type:"text",name:"username",value:n,onChange:t})),r.a.createElement("br",null)),r.a.createElement("div",{className:"row w-100"},r.a.createElement("label",{htmlFor:"username"},"Password: \xa0",r.a.createElement("input",{minLength:8,maxLength:20,type:"password",name:"password",value:s,onChange:a})),r.a.createElement("br",null)),r.a.createElement("div",{className:"row"},r.a.createElement("input",{type:"submit",value:"Signup",onClick:d}))),r.a.createElement("div",{style:{marginTop:"20px"},className:"row"},r.a.createElement("p",null,"Username must be between 3 and 50 characters, contains only alphanumerics or special characters (@._)."),r.a.createElement("p",null,"Password must be between 8 and 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&_)."))),r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("h4",null,"Already have an account?"),r.a.createElement(k.b,{to:"/"},"Click here")))}))},E=a(3),S=function(e){var t=e.isSignedIn,a=e.type;return"guest"===a&&t?r.a.createElement(E.a,{to:"/game"}):"private"!==a||t?r.a.createElement(E.b,e):r.a.createElement(E.a,{to:"/"})},C=a(15),M=a(1),j=a.n(M),O=function(){var e={cardSize:{width:69,height:94,padding:18},animationSpeed:100,table:"body",cardback:"red",acesHigh:!1,cardsUrl:"img/cards.png",blackJoker:!1,redJoker:!1,type:0,loop:1},t=1,a=[],n=1,r=n+12;function s(e){var t=j()(this).data("card");if(t.container){var a=t.container._click;a&&a.func.call(a.context||window,t,e)}}function i(e,t,a){this.init(e,t,a)}function d(){}function c(e){this.init(e)}function o(e){this.init(e)}function l(e){this.init(e)}return i.prototype={init:function(t,a,n){this.shortName=t+a,this.suit=t,this.rank=a,this.name=t.toUpperCase()+a,this.faceUp=!1,this.el=j()("<div/>").css({width:e.cardSize.width,height:e.cardSize.height,"background-image":"url("+e.cardsUrl+")",position:"absolute",cursor:"pointer"}).addClass("card").data("card",this).appendTo(j()(n)),this.showCard(),this.moveToFront()},resize:function(t){switch(t){case"small":j()(this.el).css({width:20,height:47});break;case"default":j()(this.el).css({width:e.cardSize.width,height:e.cardSize.height})}},toString:function(){return this.name},moveTo:function(t,a,n,r){var s={top:a-e.cardSize.height/2,left:t-e.cardSize.width/2};j()(this.el).animate(s,n||e.animationSpeed,r)},rotate:function(e){j()(this.el).css("-webkit-transform","rotate("+e+"deg)").css("-moz-transform","rotate("+e+"deg)").css("-ms-transform","rotate("+e+"deg)").css("transform","rotate("+e+"deg)").css("-o-transform","rotate("+e+"deg)")},showCard:function(){var t,a,n=this.rank;14==n&&(n=1),t=-n*e.cardSize.width,a=-{c:0,d:1,h:2,s:3,rj:2,bj:3}[this.suit]*e.cardSize.height,this.rotate(0),j()(this.el).css("background-position",t+"px "+a+"px")},hideCard:function(t){var a="red"==e.cardback?0*e.cardSize.height:-1*e.cardSize.height;j()(this.el).css("background-position","0px "+a+"px"),this.rotate(0)},moveToFront:function(){j()(this.el).css("z-index",t++)}},d.prototype=new Array,d.prototype.extend=function(e){for(var t in e)this[t]=e[t]},d.prototype.extend({addCard:function(e){this.addCards([e])},addCards:function(e){for(var t=0;t<e.length;t++){var a=e[t];a.container&&a.container.removeCard(a),this.push(a),a.container=this}},removeCard:function(e){for(var t=0;t<this.length;t++)if(this[t]==e)return this.splice(t,1),!0;return!1},init:function(t){t=t||{},this.x=t.x||j()(e.table).width()/2,this.y=t.y||j()(e.table).height()/2,this.faceUp=t.faceUp},click:function(e,t){this._click={func:e,context:t}},mousedown:function(e,t){this._mousedown={func:e,context:t}},mouseup:function(e,t){this._mouseup={func:e,context:t}},render:function(a){var n=(a=a||{}).speed||e.animationSpeed;this.calcPosition(a);for(var r=0;r<this.length;r++){var s=this[r];t++,s.moveToFront();var i=parseInt(j()(s.el).css("top")),d=parseInt(j()(s.el).css("left"));if(i!=s.targetTop||d!=s.targetLeft){var c={top:s.targetTop,left:s.targetLeft,queue:!1};a.immediate?j()(s.el).css(c):j()(s.el).animate(c,n)}}var o=this,l=function(){for(var e=0;e<o.length;e++)o.faceUp?o[e].showCard():o[e].hideCard()};a.immediate?l():setTimeout(l,n/2),a.callback&&setTimeout(a.callback,n)},topCard:function(){return this[this.length-1]},toString:function(){return"Container"}}),c.prototype=new d,c.prototype.extend({calcPosition:function(t){t=t||{};for(var a=Math.round(this.x-e.cardSize.width/2,0),n=Math.round(this.y-e.cardSize.height/2,0),r=0;r<this.length;r++)r>0&&r%6==0&&(n-=1,a-=1),this[r].targetTop=n,this[r].targetLeft=a},toString:function(){return"Deck"},deal:function(e,t,a,n){var r=this,s=0,i=e*t.length;!function e(){0!=r.length&&s!=i?(t[s%t.length].addCard(r.topCard()),t[s%t.length].render({callback:e,speed:a}),s++):n&&n()}()}}),o.prototype=new d,o.prototype.extend({calcPosition:function(t){t=t||{};for(var a=e.cardSize.width+(this.length-1)*e.cardSize.padding,n=Math.round(this.x-a/2),r=Math.round(this.y-e.cardSize.height/2,0),s=0;s<this.length;s++)this[s].targetTop=r,this[s].targetLeft=n+s*e.cardSize.padding},resize:function(e){switch(e){case"small":this.forEach((function(e,t){e.resize("small")}));break;case"default":this.forEach((function(e,t){e.resize("default")}))}},sort:function(){for(var e=0;e<this.length-1;e++)for(var t=0;t<this.length-e-1;t++)if(this[t].suit<this[t+1].suit||this[t].suit==this[t+1].suit&&this[t].rank>this[t+1].rank){var a=this[t];this[t]=this[t+1],this[t+1]=a}},toString:function(){return"Hand"}}),l.prototype=new d,l.prototype.extend({calcPosition:function(e){e=e||{}},toString:function(){return"Pile"},deal:function(e,t){this.dealCounter||(this.dealCounter=e*t.length)}}),{init:function(t){if(t)for(var d in t)e.hasOwnProperty(d)&&(e[d]=t[d]);e.acesHigh=!1,n=e.acesHigh?2:1,r=n+12,e.table=j()(e.table)[0],"static"==j()(e.table).css("position")&&j()(e.table).css("position","relative");for(var c=0;c<e.loop;c++)for(d=n;d<=r;d++)a.push(new i("c",d,e.table)),a.push(new i("d",d,e.table)),a.push(new i("h",d,e.table)),a.push(new i("s",d,e.table));e.blackJoker&&a.push(new i("bj",0,e.table)),e.redJoker&&a.push(new i("rj",0,e.table)),j()(".card").on("click",s)},all:a,getFakeCards:function(){return new i("bj",0,e.table)},options:e,SIZE:e.cardSize,Card:i,Container:d,Deck:c,Hand:o,Pile:l}};function T(e,t){return x.apply(this,arguments)}function x(){return(x=Object(o.a)(c.a.mark((function e(t,a){var n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://localhost:3000/join/"+encodeURIComponent(t),{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+a}});case 3:return n=e.sent,e.next=6,n.json();case 6:if(r=e.sent,200===n.status){e.next=9;break}throw r.message;case 9:return e.abrupt("return",r);case 12:throw e.prev=12,e.t0=e.catch(0),e.t0;case 15:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}var P=function(e){var t=JSON.parse(e.data);"cards"===t.cmd?this.dealing(t):"draw"==t.cmd?this.draw(t):"discard"==t.cmd?this.discard(t):"newmeld"==t.cmd?this.moveMeldToPile(t):"addmeld"==t.cmd?this.moveCardToMeld(t):"win"==t.cmd||"loss"==t.cmd||"gamedraw"==t.cmd?this.declareWinner(t):"exit"==t.cmd?this.props.setErrorMessage("Lobby is full or not available. Please choose another lobby code."):"error"==t.cmd&&this.props.setErrorMessage(t.message),t.history&&this.setState({history:t.history})},D=function(e){var t=0;switch(e.rank){case 11:t="J";break;case 12:t="Q";break;case 13:t="K";break;default:t=e.rank}return""+t+e.suit.toUpperCase()},U=function(e){return e.map((function(e,t){return"draw"==e.cmd?r.a.createElement("div",{key:t},"Player ",e.player," draws ",D(e.card)," from ",e.from," ",r.a.createElement("br",null)):"discard"==e.cmd?r.a.createElement("div",{key:t},"Player ",e.player," discards ",D(e.card),r.a.createElement("br",null)):"newmeld"==e.cmd?r.a.createElement("div",{key:t},"Player ",e.player," melds ",e.meld.map((function(e){return D(e)+" "})),r.a.createElement("br",null)):"addmeld"==e.cmd?r.a.createElement("div",{key:t},"Player ",e.player," adds ",D(e.card)," to make meld ",e.meld.map((function(e){return D(e)+" "})),r.a.createElement("br",null)):"win"==e.cmd||"loss"==e.cmd?r.a.createElement("div",{key:t},"Player ",e.player," won with ",e.score," points",r.a.createElement("br",null)):"gamedraw"==e.cmd?r.a.createElement("div",{key:t},"The game ended in a draw.",r.a.createElement("br",null)):void 0}))},I=function(e){Object(f.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={isMelding:!1,isAddingToMeld:!1,isWaiting:!1,isDrawing:!1,isDiscarding:!1,hasDrawn:!1,hasDiscarded:!1,cards:null,tableName:null,deck:null,myhand:null,ophand:null,discardPile:null,meldPile:null,currentMeld:null,currentSelectedCardHand:null,currentSelectedCardDeck:null,currentSelectedCardDiscard:null,currentSelectedMeld:null,code:"",token:"",hint:"",hasGameEnded:!1,winner:!1,gamedraw:!1,score:0,lobbycode:"",history:[]},n.handRef=r.a.createRef(),n.startGame=n.startGame.bind(Object(m.a)(n)),n.handleMeld=n.handleMeld.bind(Object(m.a)(n)),n.handleAddToMeld=n.handleAddToMeld.bind(Object(m.a)(n)),n.cancelMeldOrAddToMeld=n.cancelMeldOrAddToMeld.bind(Object(m.a)(n)),n.dealing=n.dealing.bind(Object(m.a)(n)),n.sortHand=n.sortHand.bind(Object(m.a)(n)),n.draw=n.draw.bind(Object(m.a)(n)),n.discard=n.discard.bind(Object(m.a)(n)),n.setGameState=n.setGameState.bind(Object(m.a)(n)),n.joinGameWithCode=n.joinGameWithCode.bind(Object(m.a)(n)),n.sendWSData=n.sendWSData.bind(Object(m.a)(n)),n.gameHandler=P.bind(Object(m.a)(n)),n.moveMeldToPile=n.moveMeldToPile.bind(Object(m.a)(n)),n.setHint=n.setHint.bind(Object(m.a)(n)),n.declareWinner=n.declareWinner.bind(Object(m.a)(n)),n.handleLobbyCode=n.handleLobbyCode.bind(Object(m.a)(n)),n}return Object(h.a)(a,[{key:"handleLobbyCode",value:function(e){this.setState({lobbycode:e.target.value})}},{key:"declareWinner",value:function(e){this.setState({hasGameEnded:!0,winner:"win"==e.cmd,gamedraw:"gamedraw"==e.cmd,score:e.score}),this.state.cards.all.forEach((function(e){return j()(e.el).hide()})),this.state.ophand.forEach((function(e){return j()(e.el).hide()})),this.state.myhand.forEach((function(e){return j()(e.el).hide()})),this.state.discardPile.forEach((function(e){return j()(e.el).hide()})),this.state.meldPile.forEach((function(e){e.forEach((function(e){return j()(e.el).hide()}))}))}},{key:"setHint",value:function(e){this.setState({hint:e})}},{key:"componentDidMount",value:function(){var e=this,t=this.props.websocket;t.onopen=function(e){};var a=O();a.init({table:"#card-table"}),this.setState({cards:a,tableName:"#card-table"}),t.onmessage=function(t){e.gameHandler(t)},window.addEventListener("beforeunload",(function(){t&&t.close()}))}},{key:"sendWSData",value:function(e){var t=this.props,a=t.websocket,n=t.userToken,r=this.state,s=r.code,i=r.token;e.lobby=s,e.token=i,e.userToken=n,a.send(JSON.stringify(e))}},{key:"joinGameWithCode",value:function(){var e=Object(o.a)(c.a.mark((function e(t,a){var n,r,s;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,T(t,a);case 3:n=e.sent,r=n.token,this.setState({code:t,token:r}),s=this.props.user.id,this.sendWSData({cmd:"join",userId:s}),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),this.props.setErrorMessage("An error occurs when trying to join "+e.t0),this.setState({hasGameStarted:!1});case 14:case"end":return e.stop()}}),e,this,[[0,10]])})));return function(t,a){return e.apply(this,arguments)}}()},{key:"discard",value:function(e){var t=this.state,a=t.myhand,n=t.discardPile,r=t.ophand,s=t.deck,i=e.card;"me"==e.player?(n.addCard(a.find((function(e){return e.suit==i.suit&&e.rank==i.rank}))),a.removeCard(a.find((function(e){return e.suit==i.suit&&e.rank==i.rank}))),this.setGameState("isWaiting",{hasDiscarded:!0,currentSelectedCardHand:null})):(j()(r.topCard().el).hide(),r.removeCard(r.topCard()),r.addCard(s.find((function(e){return e.suit==i.suit&&e.rank==i.rank}))),r.render({immediate:!0}),s.render({immediate:!0}),n.addCard(r.topCard()),this.setGameState("isDrawing",{hasDiscarded:!1,hasDrawn:!1})),r.sort(),a.render(),r.render(),n.render(),s.render()}},{key:"setGameState",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a="";switch(e){case"isMelding":a="Please choose 3 cards that have the same rank but different suit, or same suit but in sequence.";break;case"isAddingToMeld":a="Please choose a card, then click on a preexisiting meld that you want to lay off to.";break;case"isWaiting":a="Waiting for other player move.";break;case"isDrawing":a="Please draw a card from the deck or the discard pile.";break;case"isDiscarding":a="Please choose a card from your hand to discard or you can create a meld."}this.setState(Object(l.a)({isMelding:"isMelding"==e,isAddingToMeld:"isAddingToMeld"==e,isWaiting:"isWaiting"==e,isDrawing:"isDrawing"==e,isDiscarding:"isDiscarding"==e,hint:a},t))}},{key:"draw",value:function(e){var t=this.state,a=t.deck,n=t.discardPile,r=t.myhand,s=t.ophand,i=t.cards;if("me"==e.player){var d=e.card;"deck"==e.from?(r.addCard(a.find((function(e){return e.suit==d.suit&&e.rank==d.rank}))),this.setGameState("isDiscarding",{currentSelectedCardDeck:null,currentSelectedCardDiscard:null,hasDrawn:!0})):(r.addCard(n.topCard()),this.setGameState("isDiscarding",{currentSelectedCardDeck:null,currentSelectedCardDiscard:null,hasDrawn:!0})),a.render(),r.render(),s.render(),n.render()}else"deck"==e.from?(a.addCard(i.getFakeCards()),a.render({immediate:!0}),s.addCard(a.topCard()),a.render(),r.render(),s.render(),n.render()):(s.addCard(n.topCard()),s.render(),n.render(),a.addCard(s.topCard()),s.addCard(i.getFakeCards()),s.render({immediate:!0}),a.render({immediate:!0}))}},{key:"cancelMeldOrAddToMeld",value:function(){var e=this.state,t=e.currentMeld,a=e.myhand,n=e.isMelding,r=e.isAddingToMeld;if(n||r){for(var s=t.length,i=0;i<s;i++){var d=t.pop();a.addCard(d),t.removeCard(d),a.render(),t.render()}this.setGameState("isDiscarding",{currentSelectedCardHand:null})}}},{key:"sortHand",value:function(){var e=this.state.myhand;e.sort(),e.render()}},{key:"startGame",value:function(e){e&&(e.stopPropagation(),e.preventDefault());var t=this.state,a=t.cards,n=t.lobbycode;this.props.setErrorMessage("");if(""!=n&&/^[a-zA-Z0-9]{5,12}$/.test(n)){this.props.startingGame();var r=new a.Deck;r.x-=50,r.addCards(a.all),r.render({immediate:!0});var s=new a.Hand({faceUp:!0,y:340}),i=new a.Hand({faceUp:!1,y:60}),d=new a.Deck({faceUp:!0});d.x+=50;var c=new a.Hand({faceUp:!0,x:r.x+20,y:r.y+20}),o=this;s.click((function(e){o.state.isMelding&&o.setState({currentSelectedCardHand:e},(function(){return o.handleMeld()})),o.state.isDiscarding&&o.setState({currentSelectedCardHand:e},(function(){o.sendWSData({cmd:"discard",suit:e.suit,rank:e.rank})})),o.state.isAddingToMeld&&o.setState({currentSelectedCardHand:e},(function(){return o.handleAddToMeld()}))})),r.click((function(e){o.state.isDrawing&&o.setState({currentSelectedCardDeck:e},(function(){o.sendWSData({cmd:"draw",from:"deck"})}))})),d.click((function(e){o.state.isDrawing&&o.setState({currentSelectedCardDiscard:e},(function(){o.sendWSData({cmd:"draw",from:"discardPile",rank:e.rank,suit:e.suit})}))})),this.setState({cards:a,deck:r,myhand:s,ophand:i,discardPile:d,meldPile:[],currentMeld:c}),this.joinGameWithCode(n,this.props.userToken)}else this.props.setErrorMessage("Room code must contain between 5 and 12 alphanumeric characters.")}},{key:"dealing",value:function(e){var t,a=this,n=this.state,r=n.cards,s=n.discardPile,i=n.deck,d=n.myhand,c=n.ophand,o=n.meldPile,l=Object(C.a)(e.cards);try{var u=function(){var e=t.value,a=r.all.find((function(t,a){return t.suit==e.suit&&t.rank==e.rank}));d.addCard(a)};for(l.s();!(t=l.n()).done;)u()}catch(k){l.e(k)}finally{l.f()}var h,m=Object(C.a)(e.discardPile);try{var p=function(){var e=h.value;s.addCard(r.all.find((function(t,a){return t.suit==e.suit&&t.rank==e.rank})))};for(m.s();!(h=m.n()).done;)p()}catch(k){m.e(k)}finally{m.f()}for(var f=0;f<e.opcards;f++)c.addCard(r.getFakeCards());var g,v=Object(C.a)(e.melds);try{var b=function(){var e,t=g.value,n=[],s=Object(C.a)(t);try{var i=function(){var t=e.value,a=r.all.find((function(e,a){return e.suit==t.suit&&e.rank==t.rank}));n.push(a)};for(s.s();!(e=s.n()).done;)i()}catch(k){s.e(k)}finally{s.f()}for(var d=new r.Hand({faceUp:!0,y:1}),c=n.length,l=0;l<c;l++){var u=n.pop();d.addCard(u)}d.sort(),d.x=d.x-230,d.y=d.y+250*(o.length+1)/5;var h=a;d.click((function(e){h.state.isAddingToMeld&&h.setState({currentSelectedMeld:d},(function(){return h.handleAddToMeld()}))})),o.push(d),d.resize("small"),d.render()};for(v.s();!(g=v.n()).done;)b()}catch(k){v.e(k)}finally{v.f()}i.render(),s.render(),d.render(),c.render(),e.myturn?e.drawPhase?this.setGameState("isDrawing"):this.setGameState("isDiscarding",{hasDrawn:!0}):this.setGameState("isWaiting")}},{key:"moveCardToMeld",value:function(e){var t=this,a=e.card,n=this.state,r=n.currentMeld,s=n.myhand,i=n.ophand,d=n.deck,c=n.meldPile;if("me"==e.player){var o=this.state.currentSelectedMeld;if(a.rank==r[0].rank&&a.suit==r[0].suit)o.addCard(r.topCard());else{this.cancelMeldOrAddToMeld();var l=s.find((function(e){return e.rank==a.rank&&e.suit==a.suit}));o.addCard(l)}this.setState({currentSelectedCardHand:null,currentSelectedMeld:null},(function(){return setTimeout((function(){return t.setGameState("isDiscarding")}),500)})),o.sort(),o.resize("small"),o.render(),r.render(),i.render(),s.render()}else{var u=d.find((function(e){return e.suit==a.suit&&e.rank==a.rank}));j()(i.topCard().el).hide(),i.removeCard(i.topCard()),i.addCard(u),i.render({immediate:!0}),d.render({immediate:!0});var h=c[e.meldId];h.addCard(i.topCard()),h.sort(),h.resize("small"),h.render(),i.render()}}},{key:"handleAddToMeld",value:function(){var e=this.state,t=e.isAddingToMeld,a=e.currentMeld,n=e.myhand,r=e.currentSelectedCardHand,s=e.currentSelectedMeld;if(t)if(0===a.length)a.addCard(r),n.removeCard(r),a.sort(),n.render(),a.render();else if(1===a.length&&null!=s){var i=a[0];s[0].suit===i.suit&&s[0].rank-1===i.rank||s[s.length-1].suit===i.suit&&s[s.length-1].rank+1===i.rank||s[0].suit!=i.suit&&s[0].rank==i.rank&&s[1].rank==i.rank&&s[2].rank==i.rank?this.sendWSData({cmd:"addmeld",card:{suit:i.suit,rank:i.rank},meldId:s.id}):this.setHint("Cannot add this card into this meld")}}},{key:"handleMeld",value:function(){var e=!1,t=this.state,a=t.myhand,n=t.currentMeld,r=this.state.currentSelectedCardHand;n.length<2?(n.addCard(r),a.removeCard(r),n.sort(),a.render(),n.render()):2==n.length&&(n.addCard(r),a.removeCard(r),n.sort(),n[0].suit==n[1].suit&&n[1].suit==n[2].suit?1==Math.abs(n[0].rank-n[1].rank)&&1==Math.abs(n[1].rank-n[2].rank)&&(e=!0):n[0].rank==n[1].rank&&n[1].rank==n[2].rank&&(e=!0),e?this.sendWSData({cmd:"newmeld",player:"me",meld:n.map((function(e){return{suit:e.suit,rank:e.rank}}))}):this.setHint("Meld not valid"),a.render(),n.render())}},{key:"moveMeldToPile",value:function(e){var t=this,a=this.state,n=a.cards,r=a.meldPile,s=a.currentMeld,i=a.myhand,d=a.ophand,c=a.deck,o=e.meld,l=new n.Hand({faceUp:!0,y:1});if("me"==e.player){var u=!0;if(o.length===s.length)for(var h=function(e){if(!s.some((function(t){return t.rank==o[e].rank&&t.suit==o[e].suit})))return u=!1,"break"},m=0;m<o.length;m++){if("break"===h(m))break}else u=!1;if(u)for(var p=o.length,f=0;f<p;f++){var g=s.pop();l.addCard(g),s.removeCard(g)}else{this.cancelMeldOrAddToMeld();for(var v=o.length,b=0;b<v;b++){var k=i.pop();l.addCard(k),s.removeCard(k)}}this.setState({currentSelectedCardHand:null},(function(){return setTimeout((function(){return t.setGameState("isDiscarding")}),500)}))}else if("op"==e.player){for(var w=0;w<o.length;w++)j()(d.topCard().el).hide(),d.removeCard(d.topCard()),d.render({immediate:!0});for(var y=function(e){d.addCard(c.find((function(t){return t.suit==o[e].suit&&t.rank==o[e].rank})))},E=0;E<o.length;E++)y(E);d.render({immediate:!0}),c.render({immediate:!0});for(var S=0;S<o.length;S++)l.addCard(d.topCard())}l.sort(),l.render({immediate:!0}),l.x=l.x-230,l.y=l.y+250*(r.length+1)/5;var C=this;l.id=e.meldId,l.click((function(e){C.state.isAddingToMeld&&C.setState({currentSelectedMeld:l},(function(){return C.handleAddToMeld()}))})),r.push(l),l.resize("small"),l.render(),s.render()}},{key:"render",value:function(){var e=this,t=this.props.hasGameStarted,a=this.state,n=a.isMelding,s=a.hasDiscarded,i=a.hasDrawn,d=a.isWaiting,c=a.isAddingToMeld,o=a.hint,l=a.winner,u=a.gamedraw,h=a.score,m=a.hasGameEnded,p=a.lobbycode,f=a.history,g=function(){return!!d||(!(!n&&!c)||!(i&&!s))};return r.a.createElement("div",null,r.a.createElement("div",{id:"history_list"},U(f)),r.a.createElement("p",null,"Welcome to the game"),r.a.createElement("p",null,r.a.createElement(k.b,{to:"/stats"},"View your stats")," "),r.a.createElement("div",{id:"hint"},t&&!m?o:null),r.a.createElement("div",{id:"lobbycode"},r.a.createElement("label",{style:{display:t?"none":"inline"}},"Enter a room code (must contains between 5 and 12 alphanumeric characters): \xa0\xa0",r.a.createElement("input",{style:{display:t?"none":"inline"},value:p,onChange:this.handleLobbyCode,type:"text",placeholder:"Room code"}))),r.a.createElement("button",{id:"start-btn",style:{display:t?"none":"block"},onClick:this.startGame},"Start the game"),m?r.a.createElement("div",{id:"game-winner"},u?r.a.createElement("h1",null,"The deck is out of cards. The game is a draw."):r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,l?"You have won":"You have lost"),r.a.createElement("h2",null,l?"Your score: ":"Your opponent score: "," ",h)),r.a.createElement("button",{id:"replay",onClick:function(){return window.location.reload()}},"Play another game")):r.a.createElement("div",{id:"card-table"},r.a.createElement("button",{disabled:g(),style:{display:t?"block":"none"},id:"meld",onClick:function(){return e.setGameState("isMelding")}},"Meld"),r.a.createElement("button",{disabled:g(),style:{display:t?"block":"none"},id:"addtomeld",onClick:function(){return e.setGameState("isAddingToMeld")}},"Add to meld"),r.a.createElement("button",{style:{display:t&&(n||c)?"block":"none"},id:"cancel-meld",onClick:this.cancelMeldOrAddToMeld},"Cancel"),r.a.createElement("button",{style:{display:t?"block":"none"},id:"sort-hand",onClick:this.sortHand},"Sort hand")))}}]),a}(n.Component),W=function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",null,r.a.createElement("h1",null,"404 not found"),r.a.createElement(k.b,{to:"/"},"Back to main page")))},G="https://localhost:3000",A="/user/signin",H="/user/signup",N="/user/checkJWTToken";function z(e,t){return L.apply(this,arguments)}function L(){return(L=Object(o.a)(c.a.mark((function e(t,a){var n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(G+A,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({username:t,password:a})});case 3:return n=e.sent,e.next=6,n.json();case 6:if(r=e.sent,200===n.status||!1!==n.ok){e.next=11;break}throw new Error(r.err.message);case 11:return e.abrupt("return",r);case 12:e.next=17;break;case 14:throw e.prev=14,e.t0=e.catch(0),e.t0;case 17:case"end":return e.stop()}}),e,null,[[0,14]])})))).apply(this,arguments)}function _(e,t){return J.apply(this,arguments)}function J(){return(J=Object(o.a)(c.a.mark((function e(t,a){var n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(G+H,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({username:t,password:a})});case 3:return n=e.sent,e.next=6,n.json();case 6:if(r=e.sent,200==n.status||0!=n.ok){e.next=11;break}throw new Error(r.err.message);case 11:return e.abrupt("return",r);case 12:e.next=17;break;case 14:throw e.prev=14,e.t0=e.catch(0),e.t0;case 17:case"end":return e.stop()}}),e,null,[[0,14]])})))).apply(this,arguments)}function F(e){return R.apply(this,arguments)}function R(){return(R=Object(o.a)(c.a.mark((function e(t){var a,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(G+N,{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Bearer "+t}});case 3:return a=e.sent,e.next=6,a.json();case 6:if(0!=(n=e.sent).success||"JWT invalid"!=n.status){e.next=11;break}return e.abrupt("return",null);case 11:return e.abrupt("return",n.user);case 12:e.next=17;break;case 14:throw e.prev=14,e.t0=e.catch(0),e.t0;case 17:case"end":return e.stop()}}),e,null,[[0,14]])})))).apply(this,arguments)}var Y=function(e){Object(f.a)(a,e);var t=Object(p.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"componentDidMount",value:function(){var e=Object(o.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F(this.props.userToken);case 2:t=e.sent,this.props.updateUserInfo(t);case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){for(var e=this.props.user,t=[],a=0;a<e.gameHistory.length;a++)t.push(JSON.parse(e.gameHistory[a]));return r.a.createElement(b,null,(function(a){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",null,r.a.createElement("h2",null,"Hello ",e.username),r.a.createElement("h6",null,"You have played ",e.gamePlayed," games"),r.a.createElement("h6",null,"You have won ",e.gameWon," games"),r.a.createElement("h6",null,"You have lost ",e.gameLost," games"),r.a.createElement("h6",null,e.gameDraw," games ended in a draw"),r.a.createElement("br",null))),r.a.createElement("div",{className:"row"},r.a.createElement(k.b,{to:"/game"},"Back to game")),r.a.createElement("br",null),r.a.createElement("h4",null,"Your previous game histories"),r.a.createElement("div",{className:"row"},t.map((function(e,t){return r.a.createElement("div",{key:t,className:"col"},U(e),";")}))))}))}}]),a}(n.Component),$=function(e){Object(f.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={message:"Hello from context store",errorMsg:"",username:"",password:"",user:null,userToken:"",hasGameStarted:!1,websocket:null,isFinishedLoading:!1},n.toggleLoading=n.toggleLoading.bind(Object(m.a)(n)),n.signin=n.signin.bind(Object(m.a)(n)),n.signup=n.signup.bind(Object(m.a)(n)),n.handleInputUsername=n.handleInputUsername.bind(Object(m.a)(n)),n.handleInputPassword=n.handleInputPassword.bind(Object(m.a)(n)),n.setErrorMessage=n.setErrorMessage.bind(Object(m.a)(n)),n.startingGame=n.startingGame.bind(Object(m.a)(n)),n.validateUsernamePassword=n.validateUsernamePassword.bind(Object(m.a)(n)),n.updateUserInfo=n.updateUserInfo.bind(Object(m.a)(n)),n}return Object(h.a)(a,[{key:"updateUserInfo",value:function(e){this.setState({user:Object(l.a)({},this.state.user,{gameWon:e.gameWon,gameLost:e.gameLost,gamePlayed:e.gamePlayed,gameHistory:e.gameHistory,gameDraw:e.gameDraw})})}},{key:"componentDidMount",value:function(){var e=Object(o.a)(c.a.mark((function e(){var t,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).WSS||"wss://localhost:3000",e.prev=1,!(a=JSON.parse(localStorage.getItem("appState")))){e.next=8;break}return e.next=6,F(a.userToken);case 6:null!=e.sent?this.setState({user:a.user,username:a.username,userToken:a.userToken}):localStorage.clear();case 8:this.setState({isFinishedLoading:!0,websocket:new WebSocket(t)}),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),this.setState({isFinishedLoading:!0,errorMsg:"Cannot check user's token. Please signin again."});case 14:case"end":return e.stop()}}),e,this,[[1,11]])})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){this.state.websocket&&this.state.websocket.close()}},{key:"startingGame",value:function(){this.setState({hasGameStarted:!0})}},{key:"handleInputUsername",value:function(e){this.setState({username:e.target.value})}},{key:"handleInputPassword",value:function(e){this.setState({password:e.target.value})}},{key:"setErrorMessage",value:function(e){this.setState({errorMsg:e})}},{key:"validateUsernamePassword",value:function(){var e=this.state,t=e.username,a=e.password;return!(!/^[A-Za-z\d@._]{3,50}$/.test(t)||!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,20}$/.test(a))}},{key:"signin",value:function(){var e=Object(o.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.setState({isLoading:!0,errorMsg:""}),!this.validateUsernamePassword()){e.next=18;break}return e.prev=2,e.next=5,z(this.state.username,this.state.password);case 5:t=e.sent,this.setState({userToken:t.token,user:t.user}),localStorage.setItem("appState",JSON.stringify({username:this.state.username,user:this.state.user,userToken:this.state.userToken})),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),this.setErrorMessage(e.t0.message);case 13:return e.prev=13,this.setState({isLoading:!1}),e.finish(13);case 16:e.next=19;break;case 18:this.setErrorMessage("Username or password is invalid. Please try again.");case 19:case"end":return e.stop()}}),e,this,[[2,10,13,16]])})));return function(){return e.apply(this,arguments)}}()},{key:"signup",value:function(){var e=Object(o.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.setState({isLoading:!0,errorMsg:""}),!this.validateUsernamePassword()){e.next=18;break}return e.prev=2,e.next=5,_(this.state.username,this.state.password);case 5:t=e.sent,this.setState({userToken:t.token,user:t.user}),localStorage.setItem("appState",JSON.stringify({username:this.state.username,user:this.state.user,userToken:this.state.userToken})),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),this.setErrorMessage(e.t0.message);case 13:return e.prev=13,this.setState({isLoading:!1}),e.finish(13);case 16:e.next=19;break;case 18:this.setErrorMessage("Username or password is invalid. Please try again.");case 19:case"end":return e.stop()}}),e,this,[[2,10,13,16]])})));return function(){return e.apply(this,arguments)}}()},{key:"toggleLoading",value:function(){}},{key:"render",value:function(){var e=this.state,t=e.errorMsg,a=e.username,n=e.password,s=e.user,i=e.userToken,d=e.hasGameStarted,c=e.websocket,o=e.isFinishedLoading,l=null!==s&&""!==i;return r.a.createElement(k.a,null,r.a.createElement(v,{value:this.state},r.a.createElement("div",{className:"App"},o?r.a.createElement("div",null,r.a.createElement("div",{className:"error-message"},t||null),r.a.createElement(E.d,null,r.a.createElement(S,{isSignedIn:l,type:"guest",path:"/signup"},r.a.createElement(y,{signup:this.signup,handleInputUsername:this.handleInputUsername,handleInputPassword:this.handleInputPassword,username:a,password:n})),null!=c?r.a.createElement(S,{isSignedIn:l,type:"private",path:"/game"},r.a.createElement(I,{hasGameStarted:d,startingGame:this.startingGame,setErrorMessage:this.setErrorMessage,websocket:c,userToken:i,user:s})):null,null!=s?r.a.createElement(S,{isSignedIn:l,type:"private",path:"/stats"},r.a.createElement(Y,{user:s,userToken:i,updateUserInfo:this.updateUserInfo})):null,r.a.createElement(S,{isSignedIn:l,type:"guest",path:"/",exact:!0},r.a.createElement(w,{signin:this.signin,handleInputUsername:this.handleInputUsername,handleInputPassword:this.handleInputPassword,username:a,password:n})),r.a.createElement(W,null))):r.a.createElement("p",null,"Is Loading"))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement($,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[24,1,2]]]);
//# sourceMappingURL=main.33fa8d7d.chunk.js.map