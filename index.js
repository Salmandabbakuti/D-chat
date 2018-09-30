let myName = ''

function start() {
    initMyProfile()
    initMessages()
}

function initMyProfile() {
    let profileContent = ''
    if(localStorage.myProfile === undefined) {
        initDummyProfile()
    } else {
        let myProfile = JSON.parse(localStorage.myProfile)
        myName = myProfile.name
        profileContent += `
            Name: <span id="my-name">${myProfile.name}</span> <br/>
            Bio: <span id="my-bio">${myProfile.bio}</span> <br/>
            <button id="set-profile-button" class="align-center" onclick="setProfile()">Set Profile</button>`
        document.querySelector('#profile-content').innerHTML = profileContent
    }
}

function setProfile() {
    let profileContent = `Name: <input type="text" id="set-profile-name" placeholder="Type your name..."/> <br/><br/>
        Bio: <input type="text" id="set-profile-bio" placeholder="Type your bio..."/> <br/><br/>
        <button onclick="saveSetProfile(
            document.querySelector('#set-profile-name').value,
            document.querySelector('#set-profile-bio').value
        )">Save Changes</button>
        <button onclick="cancelSetProfile()">Cancel Changes</button>`

    document.querySelector('#profile-content').innerHTML = profileContent
}

function saveSetProfile(name, bio) {
    localStorage.myProfile = JSON.stringify({
        name: name,
        bio: bio
    })
    initMyProfile()
}

function cancelSetProfile() {
    start()
}

function sendMessage(message) {
    let messages = JSON.parse(localStorage.messages)
    messages.push({
        from: myName,
        content: message
    })
    localStorage.messages = JSON.stringify(messages)
    initMessages()
}

function initMessages() {
    if(localStorage.messages === undefined) initDummyMessages()

    let messages = JSON.parse(localStorage.messages)
    let sectionContent = ''
    for(let i = 0; i < messages.length; i++) {
        sectionContent += `<div class="message-box">
            <div>${messages[i].from} says:</div>
            <div>${messages[i].content}</div>
        </div>`
    }
    document.querySelector('#messages').innerHTML = sectionContent

}

function initDummyMessages() {
    let messages = [
        {
            content: "The most important thing is to enjoy your life - to be happy - it's all that matters",
            from: "Jessica"
        }, {
            content: " Life is really simple, but we insist on making it complicated",
            from: "Ramesh"
        }, {
            content: "I realized that if my thoughts immediately affect my body, I should be careful about what I think. Now if I get angry, I ask myself why I feel that way. If I can find the source of my anger, I can turn that negative energy into something positive",
            from: "Sashi"
        }, {
            content: "Sometimes I am happy and sometimes not. I am, after all, a human being, you know. And I am glad that we are sometimes happy and sometimes not. You get your wisdom working by having different emotions",
            from: "Jessica"
        }, {
            content: "Experiencing sadness and anger can make you feel more creative, and by being creative, you can get beyond your pain or negativity.",
            from: "John"
        }
    ]
    localStorage.messages = JSON.stringify(messages)
}

function initDummyProfile() {
    localStorage.myProfile = JSON.stringify({
        name: "Anonymous",
        occupation: "Beep",
        bio: "I'm just a bot"
    })
    initMyProfile()
}

start()
if(typeof web3 != 'undefined'){
         console.log("web3 detected from Metamask")
         provider = web3.currentProvider
         this.web3 = new Web3(provider)
      }else{
         console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
         provider = new Web3.providers.HttpProvider("http://localhost:8545")
         this.web3 = new Web3(provider)
      }


      web3.eth.defaultAccount = web3.eth.accounts[0];
      var contractAbi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "messages",
		"outputs": [
			{
				"name": "content",
				"type": "string"
			},
			{
				"name": "from",
				"type": "address"
			},
			{
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "userInfo",
		"outputs": [
			{
				"name": "name",
				"type": "bytes32"
			},
			{
				"name": "bio",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userMessages",
		"outputs": [
			{
				"name": "content",
				"type": "string"
			},
			{
				"name": "from",
				"type": "address"
			},
			{
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_content",
				"type": "string"
			}
		],
		"name": "writeMessage",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "bytes32"
			},
			{
				"name": "_bio",
				"type": "string"
			}
		],
		"name": "setProfile",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
      var contractAddress = '0x18ee17694cd16afdf420990b973ec4a54e63419f';

      var contract = web3.eth.contract(contractAbi).at(contractAddress);
