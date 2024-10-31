function welcomeUser() {
    const name = prompt("What is your full name?");
    if (name) {
        alert(`Welcome ${name} to the ice cream shop!`);
    } else {
        alert("Welcome to the ice cream shop!");
    }
}
class IceCream {
    constructor(name, ingredients, basePrice) {
        this.name = name;
        this.ingredients = ingredients;
        this.basePrice = basePrice;
    }  
}        
class IceCreamShop {
    playBackgroundMusic() {
        const backgroundMusic = document.getElementById('background-music');
        backgroundMusic.play();
    }
    constructor() {
        this.storage = {
            Chocolate: 10,
            Sprinkles: 5,
            Cones: 6,
            Vanilla: 8,
        };
        this.money = 100;
        this.day = 1;
        this.dailySalesLimit = 3;
        this.iceCreams = [
            new IceCream("Chocolate Delight", { Chocolate: 2, Cones: 1 }, 20),
            new IceCream("Sprinkle Surprise", { Sprinkles: 2, Cones: 1, Chocolate: 1, Vanilla: 1 }, 25),
            new IceCream("Vanilla Dream", { Vanilla: 2, Cones: 1, Sprinkles: 1 }, 15)
        ];
        
        this.presidents = [
            "Barack Obama", "Donald Trump", "Abraham Lincoln",
            "George Washington", "Vladimir Putin", 
            "Angela Merkel", "Emmanuel Macron", 
            "Queen Elizabeth II", "Nelson Mandela"
        ];
        this.dialogues = [
            "Obama walks in and says: 'Is this the Hope and Change flavor?'",
            "Trump demands: 'This better be the biggest, most beautiful ice cream ever. Believe me!'",
            "Lincoln exclaims: 'Four scoops and seven sprinkles ago...'",
            "Washington says proudly: 'I cannot tell a lie... I want chocolate!'",
            "Putin, in his usual calm voice: 'In Russia, we don't ask for ice cream, ice cream asks for us.'",
            "Merkel nods approvingly: 'This ice cream will bring unity to Europe!'",
            "Macron asks, 'Do you have something as sophisticated as French ice cream?'",
            "Queen Elizabeth II declares: 'One must enjoy ice cream with dignity.'",
            "Mandela smiles and says: 'After all those years, this ice cream is the sweetest freedom.'"
        ];
        this.outcomeDialogues = [
            [
                "Obama smiles: 'Yes, that’s the spirit of hope and change!'",
                "Obama frowns: 'Well, not every deal goes as planned.'",
                "Obama shrugs: 'Let’s call it bipartisan, shall we?'",
                "Obama nods: 'Solid choice, thanks for the quick deal.'"
            ],
            [
                "Trump laughs: 'This is a great deal. Tremendous!'",
                "Trump scowls: 'That was a disaster.'",
                "Trump says: 'I call this deal…neutral.'",
                "Trump grins: 'Smart move, quick and beautiful.'"
            ],
            [
                "Lincoln smiles: 'A bargain worthy of the people.'",
                "Lincoln sighs: 'Even Honest Abe has rough days.'",
                "Lincoln says: 'Sometimes, middle ground is best.'",
                "Lincoln nods: 'Honesty is always the best policy.'"
            ],
            [
                "Washington exclaims: 'An excellent deal for freedom!'",
                "Washington frowns: 'The father of the nation knows loss.'",
                "Washington says: 'A fair compromise, indeed.'",
                "Washington nods: 'Straightforward, just as it should be.'"
            ],
            [
                "Putin nods: 'In Russia, we call this success.'",
                "Putin scowls: 'This will be remembered…'",
                "Putin says: 'A good result for all involved.'",
                "Putin nods: 'A good choice; efficiency matters.'"
            ],
            [
                "Merkel smiles: 'A win for unity!'",
                "Merkel sighs: 'Some negotiations are difficult.'",
                "Merkel says: 'Let’s consider this neutral ground.'",
                "Merkel nods: 'Quick and efficient, like Germany.'"
            ],
            [
                "Macron exclaims: 'A triumph for diplomacy!'",
                "Macron frowns: 'Not every deal is magnifique.'",
                "Macron shrugs: 'A balanced approach.'",
                "Macron nods: 'You know efficiency, just like France!'"
            ],
            [
                "The Queen smiles: 'Splendid decision, well done.'",
                "The Queen raises an eyebrow: 'Unfortunate indeed.'",
                "The Queen says: 'A dignified compromise.'",
                "The Queen nods: 'A refined choice, thank you.'"
            ],
            [
                "Mandela beams: 'A victory for freedom and justice!'",
                "Mandela sighs: 'Even in freedom, there are setbacks.'",
                "Mandela says: 'Balance and fairness in all things.'",
                "Mandela smiles: 'Quick, just like the taste of freedom.'"
            ]
        ];
        
        
        document.getElementById('start-button').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('buy-button').addEventListener('click', () => {
            this.purchaseSupplies();
        });
        
        document.getElementById('cancel-button').addEventListener('click', () => {
            this.cancelRestock();
        });
    }

    startGame() {
        this.playBackgroundMusic();
        document.getElementById('intro-container').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        this.updateDayInfo();
        this.manageShop();
        
    }

    updateDayInfo() {
        document.getElementById('day-info').innerText = `--- Day ${this.day} --- You can sell 3 ice creams today.`;
        this.renderShopOptions();
    }

    renderShopOptions() {
        const shopOptions = document.getElementById('shop-options');
        shopOptions.innerHTML = `
            <button onclick="iceCreamShop.displayStorage()">Display Ingredients</button>
            <button onclick="iceCreamShop.takeCustomerOrder()">Take Order</button>
            <button onclick="iceCreamShop.showRestockForm()">Restock Ingredients</button>
            <button onclick="iceCreamShop.displayMoney()">Display Money</button>
            <button onclick="iceCreamShop.displayRecipeBook()">Recipe Book</button>
            <button onclick="iceCreamShop.nextDay()">End Day</button>
            <button onclick="iceCreamShop.endGame()">Exit Game</button>
        `;
    }

    showRestockForm() {
        document.getElementById('restock-form').style.display = 'block';
        document.getElementById('shop-options').style.display = 'none';
    }

    cancelRestock() {
        document.getElementById('restock-form').style.display = 'none';
        document.getElementById('shop-options').style.display = 'block';
    }

    purchaseSupplies() {
        const itemSelect = document.getElementById('item-select');
        const selectedIndex = itemSelect.selectedIndex;
        const quantity = parseInt(document.getElementById('quantity-input').value);

        let cost;
        switch (selectedIndex) {
            case 0:
                cost = quantity * 5;
                if (this.money >= cost) {
                    this.storage.Chocolate += quantity;
                    this.money -= cost;
                    alert(`You bought ${quantity} Chocolate.`);
                } else {
                    alert("Not enough money.");
                }
                break;
            case 1:
                cost = quantity * 10;
                if (this.money >= cost) {
                    this.storage.Sprinkles += quantity;
                    this.money -= cost;
                    alert(`You bought ${quantity} Sprinkles.`);
                } else {
                    alert("Not enough money.");
                }
                break;
            case 2:
                cost = quantity * 2;
                if (this.money >= cost) {
                    this.storage.Cones += quantity;
                    this.money -= cost;
                    alert(`You bought ${quantity} Cones.`);
                } else {
                    alert("Not enough money.");
                }
                break;
            case 3:
                cost = quantity * 4;
                if (this.money >= cost) {
                    this.storage.Vanilla += quantity;
                    this.money -= cost;
                    alert(`You bought ${quantity} Vanilla.`);
                } else {
                    alert("Not enough money.");
                }
                break;
            default:
                alert("Invalid selection.");
        }
        this.cancelRestock();
        this.renderShopOptions();
    }

    displayStorage() {
        const container = document.getElementById('shop-options');
        let storageDisplay = '<h2>Inventory</h2><ul class="storage-list">';
        for (const item in this.storage) {
            storageDisplay += `<li>${item}: ${this.storage[item]}</li>`;
        }
        storageDisplay += '</ul>';
        container.innerHTML = storageDisplay;
        this.addBackButton();
    }

    displayMoney() {
        const container = document.getElementById('shop-options');
        container.innerHTML = `<p><strong style="font-size: 24px;">Money: ${this.money}</strong></p>`;
        this.addBackButton();
    }

    displayRecipeBook() {
        const container = document.getElementById('shop-options');
        let recipeDisplay = '<h2>Ice Cream Recipe Book</h2><ul class="recipe-list">';
        this.iceCreams.forEach((iceCream, index) => {
            recipeDisplay += `<li>${index + 1}. ${iceCream.name} (Base Price: ${iceCream.basePrice} money)</li>`;
            recipeDisplay += '<ul>';
            for (const ingredient in iceCream.ingredients) {
                recipeDisplay += `<li>${ingredient}: ${iceCream.ingredients[ingredient]}</li>`;
            }
            recipeDisplay += '</ul>';
        });
        recipeDisplay += '</ul>';
        container.innerHTML = recipeDisplay;
        this.addBackButton();
    }
    

    addBackButton() {
        const container = document.getElementById('shop-options');
        container.innerHTML += `<button class="back-button" onclick="iceCreamShop.renderShopOptions()">Back</button>`;
    }

    takeCustomerOrder() {
        if (this.dailySalesLimit <= 0) {
            alert("All famous leaders have visited! No more customers for today.");
            return;
        }

        const presidentIndex = Math.floor(Math.random() * this.presidents.length);
        const president = this.presidents[presidentIndex];
        const dialogue = this.dialogues[presidentIndex];
        
        const customerOrder = this.iceCreams[Math.floor(Math.random() * this.iceCreams.length)];
        document.getElementById('order-ingredients').innerHTML = '';
        
        document.getElementById('customer-name').innerText = `Today's customer is: ${president}`;
        document.getElementById('customer-dialogue').innerText = dialogue;
        document.getElementById('order-ingredients').innerHTML = `<strong>Order: ${customerOrder.name}</strong>`;
        

       
        for (const ingredient in customerOrder.ingredients) {
            document.getElementById('order-ingredients').innerHTML += `
                <label>${ingredient} :</label>
                <input type="number" id="${ingredient}-input" min="0" value="0">
                <br>
            `;
        }

       
        document.getElementById('order-form').style.display = 'block';
        document.getElementById('shop-options').style.display = 'none';

       
        document.getElementById('submit-order-button').onclick = () => {
            this.processOrder(customerOrder);
        };

        
        document.getElementById('cancel-order-button').onclick = () => {
            this.cancelOrder();
        };
    }

    processOrder(customerOrder) {
        const playerSelection = {};
        for (const ingredient in customerOrder.ingredients) {
            playerSelection[ingredient] = parseInt(document.getElementById(`${ingredient}-input`).value) || 0;
        }
    
        if (!this.checkIngredients(customerOrder, playerSelection)) {
            alert("There are not enough ingredients to fulfill this order.");
            this.dailySalesLimit--; 
            this.cancelOrder();
            return;
        }
    
        if (this.verifyCrafting(customerOrder, playerSelection)) {
            for (const ingredient in playerSelection) {
                this.storage[ingredient] -= playerSelection[ingredient];
            }
            this.haggleIceCreamSale(customerOrder);
            this.dailySalesLimit--;
            alert(`Successfully served ${customerOrder.name} to the customer!`);
        } else {
            this.dailySalesLimit--;
            alert("Oops! It looks like you used the wrong ingredients!\nJoe chuckles and says: 'Don't worry, folks! Mistakes happen! Give it another try!");
        }
    
        this.cancelOrder();
    }
    
   
    checkIngredients(iceCream, playerSelection) {
        for (const ingredient in iceCream.ingredients) {
            if (playerSelection[ingredient] > this.storage[ingredient]) {
                return false; 
            }
        }
        return true; 
    }
    

    cancelOrder() {
        document.getElementById('order-form').style.display = 'none';
        document.getElementById('shop-options').style.display = 'block';
    }


    verifyCrafting(iceCream, playerSelection) {
        for (const ingredient in iceCream.ingredients) {
            if (playerSelection[ingredient] !== iceCream.ingredients[ingredient]) {
                return false;
            }
        }
        return true;
    }

    haggleIceCreamSale(iceCream) {
        const choice = parseInt(prompt("Would you like to negotiate for a better price? (1 = Yes, 2 = No):"));
        const currentPresidentIndex = this.presidents.indexOf(document.getElementById('customer-name').innerText.split(': ')[1]);
    
        if (choice === 1) {
            const rng = Math.random() * 100;
            let newPrice;
    
            if (rng <= 50) {
                newPrice = iceCream.basePrice * 1.3;
                this.money += newPrice;
                alert(`Negotiation successful! You sold ${iceCream.name} for ${newPrice} money.\n${this.outcomeDialogues[currentPresidentIndex][0]}`);
            } else if (rng <= 80) {
                newPrice = iceCream.basePrice * 0.8;
                this.money += newPrice;
                alert(`Negotiation unsuccessful! You sold ${iceCream.name} for only ${newPrice} money.\n${this.outcomeDialogues[currentPresidentIndex][1]}`);
            } else {
                this.money += iceCream.basePrice;
                alert(`Neutral outcome, sold at base price: ${iceCream.basePrice} money.\n${this.outcomeDialogues[currentPresidentIndex][2]}`);
            }
        } else {
            this.money += iceCream.basePrice;
            alert(`You sold it for ${iceCream.basePrice} money.\n${this.outcomeDialogues[currentPresidentIndex][3]}`);
        }
    }
    
    
    nextDay() {
        const confirmEndDay = confirm("Are you sure you want to end the day?");
        if (!confirmEndDay) return;
    
        if (this.day < 3) {
            this.day++;
            this.dailySalesLimit = 3;
            alert(`\nDay ${this.day} has started. You can sell 3 ice creams today.`);
            this.updateDayInfo();
        } else {
            this.endGame();
        }
    }
    

   endGame() {
    const confirmEndGame = confirm("Are you sure you want to exit the game?");
    if (!confirmEndGame) return;
    this.displayEnding();
    
    }
    resetGame() {
        document.getElementById('game-container').style.display = 'none';
        document.getElementById('intro-container').style.display = 'block';
        const backgroundMusic = document.getElementById('background-music');
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;     
        this.money = 100;
        this.day = 1;
        this.dailySalesLimit = 3;  
        this.storage = {
            Chocolate: 10,
            Sprinkles: 5,
            Cones: 6,
            Vanilla: 8,
        };
        this.updateDayInfo();
    }
    displayEnding() {
        const endingMessageDiv = document.getElementById('ending-message');
        const endingTextDiv = document.querySelector('.ending-text');
        const endingImage = document.querySelector('.ending-image');
        const restartButton = document.getElementById('restart-button');
    
        endingMessageDiv.style.display = 'flex';
    
        let endingMessages;
    
        if (this.money >= 200) {
            endingMessages = {
                message: `Congratulations! You have saved ${this.money} money and kept Joe Biden's ice cream shop open!`,
                image: "GoodEnding.png"
            };
        } else if (this.money >= 150) {
            endingMessages = {
                message: `Not bad! You earned ${this.money} money. Joe's shop survives, but it will be tough.`,
                image: "NormalEnding.png"
            };
        } else {
            endingMessages = {
                message: `Oh no! You only saved ${this.money} money, which is far from the requirement to keep the shop open.`,
                image: "BadEnding.png"
            };
        }
    
        endingTextDiv.innerHTML = endingMessages.message;
        endingImage.src = endingMessages.image;
        endingImage.alt = "Joe Biden";
    
        restartButton.style.display = 'block';
    
        restartButton.onclick = () => {
            endingMessageDiv.style.display = 'none';
            this.resetGame();
        };
    }
        
}

const iceCreamShop = new IceCreamShop();
