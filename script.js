let money = 0;  // Starting money is now 0
let income = 1;
let upgradeCost = 50;
let incomeIncrement = 5;
let totalClicks = 0;
let bonusClicks = 0;  // Bonus clicks tracker
let bonusMultiplier = 1;  // Initial multiplier
let multiplierUpgradeCost = 100;  // Initial cost to upgrade the multiplier
let multiplierUpgradeAmount = 2;  // The current value of the multiplier

// Regular Stocks and their initial prices
let stocks = {
    stockA: { price: 10, shares: 0 },
    stockB: { price: 15, shares: 0 },
    stockC: { price: 8, shares: 0 }
};

// Wall Street Stocks and their initial prices
let wallStreetStocks = {
    stockX: { price: 1000, shares: 0 },
    stockY: { price: 2000, shares: 0 },
    stockZ: { price: 3000, shares: 0 }
};

// Save game state to localStorage
function saveGameState() {
    localStorage.setItem('money', money);
    localStorage.setItem('income', income);
    localStorage.setItem('upgradeCost', upgradeCost);
    localStorage.setItem('totalClicks', totalClicks);
    localStorage.setItem('bonusClicks', bonusClicks);
    localStorage.setItem('bonusMultiplier', bonusMultiplier);
    localStorage.setItem('multiplierUpgradeCost', multiplierUpgradeCost);
    localStorage.setItem('stocks', JSON.stringify(stocks));
    localStorage.setItem('wallStreetStocks', JSON.stringify(wallStreetStocks));  // Save Wall Street stocks
}

// Load game state from localStorage
function loadGameState() {
    money = parseFloat(localStorage.getItem('money')) || 0;  // Set to 0
    income = parseFloat(localStorage.getItem('income')) || 1;
    upgradeCost = parseFloat(localStorage.getItem('upgradeCost')) || 50;
    totalClicks = parseFloat(localStorage.getItem('totalClicks')) || 0;
    bonusClicks = parseFloat(localStorage.getItem('bonusClicks')) || 0;
    bonusMultiplier = parseFloat(localStorage.getItem('bonusMultiplier')) || 1;
    multiplierUpgradeCost = parseFloat(localStorage.getItem('multiplierUpgradeCost')) || 100;
    stocks = JSON.parse(localStorage.getItem('stocks')) || {
        stockA: { price: 10, shares: 0 },
        stockB: { price: 15, shares: 0 },
        stockC: { price: 8, shares: 0 }
    };
    wallStreetStocks = JSON.parse(localStorage.getItem('wallStreetStocks')) || {
        stockX: { price: 1000, shares: 0 },
        stockY: { price: 2000, shares: 0 },
        stockZ: { price: 3000, shares: 0 }
    };
}

// Update Regular stock prices
function updateStockPrices() {
    if (document.getElementById('stockA-price')) {
        stocks.stockA.price = Math.max(1, stocks.stockA.price + Math.floor(Math.random() * 5) - 2);
        stocks.stockB.price = Math.max(1, stocks.stockB.price + Math.floor(Math.random() * 5) - 2);
        stocks.stockC.price = Math.max(1, stocks.stockC.price + Math.floor(Math.random() * 5) - 2);

        document.getElementById('stockA-price').textContent = `$${stocks.stockA.price}`;
        document.getElementById('stockB-price').textContent = `$${stocks.stockB.price}`;
        document.getElementById('stockC-price').textContent = `$${stocks.stockC.price}`;
    }
}

// Update Wall Street stock prices
function updateWallStreetStockPrices() {
    if (document.getElementById('stockX-price')) {
        wallStreetStocks.stockX.price = Math.max(500, wallStreetStocks.stockX.price + Math.floor(Math.random() * 500) - 250);
        wallStreetStocks.stockY.price = Math.max(1000, wallStreetStocks.stockY.price + Math.floor(Math.random() * 500) - 250);
        wallStreetStocks.stockZ.price = Math.max(1500, wallStreetStocks.stockZ.price + Math.floor(Math.random() * 500) - 250);

        document.getElementById('stockX-price').textContent = `$${wallStreetStocks.stockX.price}`;
        document.getElementById('stockY-price').textContent = `$${wallStreetStocks.stockY.price}`;
        document.getElementById('stockZ-price').textContent = `$${wallStreetStocks.stockZ.price}`;
    }
}

// Buy regular stock
function buyStock(stock) {
    if (money >= stocks[stock].price) {
        money -= stocks[stock].price;
        stocks[stock].shares++;
        updateUI();
    }
}

// Buy Wall Street stock
function buyWallStreetStock(stock) {
    if (money >= wallStreetStocks[stock].price) {
        money -= wallStreetStocks[stock].price;
        wallStreetStocks[stock].shares++;
        updateUI();
    }
}

// Sell regular stock
function sellStock(stock) {
    if (stocks[stock].shares > 0) {
        money += stocks[stock].price;
        stocks[stock].shares--;
        updateUI();
    }
}

// Sell Wall Street stock
function sellWallStreetStock(stock) {
    if (wallStreetStocks[stock].shares > 0) {
        money += wallStreetStocks[stock].price;
        wallStreetStocks[stock].shares--;
        updateUI();
    }
}

// Update the UI with the current game state (regular + Wall Street)
function updateUI() {
    if (document.getElementById('money')) {
        document.getElementById('money').textContent = `$${money.toFixed(2)}`;
    }

    // Regular stocks
    if (document.getElementById('stockA-shares')) {
        document.getElementById('stockA-shares').textContent = stocks.stockA.shares;
    }
    if (document.getElementById('stockB-shares')) {
        document.getElementById('stockB-shares').textContent = stocks.stockB.shares;
    }
    if (document.getElementById('stockC-shares')) {
        document.getElementById('stockC-shares').textContent = stocks.stockC.shares;
    }

    // Wall Street stocks
    if (document.getElementById('stockX-shares')) {
        document.getElementById('stockX-shares').textContent = wallStreetStocks.stockX.shares;
    }
    if (document.getElementById('stockY-shares')) {
        document.getElementById('stockY-shares').textContent = wallStreetStocks.stockY.shares;
    }
    if (document.getElementById('stockZ-shares')) {
        document.getElementById('stockZ-shares').textContent = wallStreetStocks.stockZ.shares;
    }

    // Update Upgrades
    const upgradeBtn = document.getElementById('upgradeBtn');
    if (upgradeBtn) {
        upgradeBtn.textContent = `Buy Upgrade (+$${incomeIncrement} Income) - $${upgradeCost}`;
        if (money >= upgradeCost) {
            upgradeBtn.classList.add('green');
            upgradeBtn.classList.remove('red');
        } else {
            upgradeBtn.classList.remove('green');
            upgradeBtn.classList.add('red');
        }
    }

    const multiplierUpgradeBtn = document.getElementById('multiplierUpgradeBtn');
    if (multiplierUpgradeBtn) {
        multiplierUpgradeBtn.textContent = `Upgrade Multiplier to x${multiplierUpgradeAmount} - $${multiplierUpgradeCost}`;
        if (money >= multiplierUpgradeCost) {
            multiplierUpgradeBtn.classList.add('green');
            multiplierUpgradeBtn.classList.remove('red');
        } else {
            multiplierUpgradeBtn.classList.remove('green');
            multiplierUpgradeBtn.classList.add('red');
        }
    }

    saveGameState();
}

// Earn money and increase bonus clicks
function earnMoney() {
    money += income * bonusMultiplier;
    totalClicks++;
    bonusClicks += 0.1;  // Each click adds 0.1 to bonus clicks
    updateUI();
}

// Use bonus clicks and add them to total money
function useBonusClicks() {
    if (bonusClicks > 0) {
        money += bonusClicks;
        bonusClicks = 0;
        document.getElementById('slotStatus').textContent = `Bonus clicks added to money!`;
    } else {
        document.getElementById('slotStatus').textContent = "No bonus clicks available!";
    }
    updateUI();
}

// Buy upgrade
function buyUpgrade() {
    if (money >= upgradeCost) {
        money -= upgradeCost;
        income += incomeIncrement;
        upgradeCost *= 2;  // Double the cost of the next upgrade
        updateUI();
    }
}

// Upgrade multiplier in the upgrade area
function upgradeMultiplier() {
    if (money >= multiplierUpgradeCost) {
        money -= multiplierUpgradeCost;
        bonusMultiplier = multiplierUpgradeAmount;
        multiplierUpgradeCost *= 2;  // Increase the cost for the next multiplier upgrade
        multiplierUpgradeAmount += 1;  // Increase the multiplier by 1 each upgrade
        updateUI();
    }
}

// Slot Machine Functionality with Animations
function spinSlotMachine() {
    const betAmount = parseFloat(document.getElementById('betAmount').value);

    if (betAmount > money) {
        document.getElementById('slotStatus').textContent = "Not enough money!";
        return;
    }

    money -= betAmount;

    let slot1 = Math.floor(Math.random() * 10);
    let slot2 = Math.floor(Math.random() * 10);
    let slot3 = Math.floor(Math.random() * 10);
    let reward = 0;

    // Add slot machine animation
    const slotElements = ['slot1', 'slot2', 'slot3'];
    slotElements.forEach((slot, index) => {
        const element = document.getElementById(slot);
        element.classList.add('spinning');
        setTimeout(() => {
            element.classList.remove('spinning');
            if (index === 0) element.textContent = slot1;
            if (index === 1) element.textContent = slot2;
            if (index === 2) element.textContent = slot3;
        }, 1000 + (index * 200));  // Animation delay for each slot
    });

    setTimeout(() => {
        if (slot1 === 7 && slot2 === 7 && slot3 === 7) {
            reward = betAmount * 20;
        } else if (slot1 === slot2 && slot2 === slot3) {
            reward = betAmount * 10;
        } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
            reward = betAmount * 2;
        }

        if (reward > 0) {
            money += reward;
            document.getElementById('slotStatus').textContent = `You won $${reward.toFixed(2)}!`;
        } else {
            document.getElementById('slotStatus').textContent = "No luck, try again!";
        }

        updateUI();
    }, 2000);  // Wait until after animation completes
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    loadGameState();
    updateUI();
    updateStockPrices();
    updateWallStreetStockPrices();

    setInterval(updateStockPrices, 5000);  // Update regular stock prices every 5 seconds
    setInterval(updateWallStreetStockPrices, 5000);  // Update Wall Street stock prices every 5 seconds

    // Event listeners for earning money and using bonus clicks
    if (document.getElementById('earnBtn')) {
        document.getElementById('earnBtn').addEventListener('click', earnMoney);
    }
    if (document.getElementById('useBonusClicksBtn')) {
        document.getElementById('useBonusClicksBtn').addEventListener('click', useBonusClicks);
    }

    // Event listeners for upgrades
    if (document.getElementById('upgradeBtn')) {
        document.getElementById('upgradeBtn').addEventListener('click', buyUpgrade);
    }
    if (document.getElementById('multiplierUpgradeBtn')) {
        document.getElementById('multiplierUpgradeBtn').addEventListener('click', upgradeMultiplier);
    }

    // Event listener for the slot machine
    if (document.getElementById('gambleBtn')) {
        document.getElementById('gambleBtn').addEventListener('click', spinSlotMachine);
    }

    // Event listeners for regular stocks
    if (document.getElementById('buyStockA')) {
        document.getElementById('buyStockA').addEventListener('click', function() { buyStock('stockA'); });
        document.getElementById('sellStockA').addEventListener('click', function() { sellStock('stockA'); });
    }
    if (document.getElementById('buyStockB')) {
        document.getElementById('buyStockB').addEventListener('click', function() { buyStock('stockB'); });
        document.getElementById('sellStockB').addEventListener('click', function() { sellStock('stockB'); });
    }
    if (document.getElementById('buyStockC')) {
        document.getElementById('buyStockC').addEventListener('click', function() { buyStock('stockC'); });
        document.getElementById('sellStockC').addEventListener('click', function() { sellStock('stockC'); });
    }

    // Event listeners for Wall Street stocks
    if (document.getElementById('buyStockX')) {
        document.getElementById('buyStockX').addEventListener('click', function() { buyWallStreetStock('stockX'); });
        document.getElementById('sellStockX').addEventListener('click', function() { sellWallStreetStock('stockX'); });
    }
    if (document.getElementById('buyStockY')) {
        document.getElementById('buyStockY').addEventListener('click', function() { buyWallStreetStock('stockY'); });
        document.getElementById('sellStockY').addEventListener('click', function() { sellWallStreetStock('stockY'); });
    }
    if (document.getElementById('buyStockZ')) {
        document.getElementById('buyStockZ').addEventListener('click', function() { buyWallStreetStock('stockZ'); });
        document.getElementById('sellStockZ').addEventListener('click', function() { sellWallStreetStock('stockZ'); });
    }
});