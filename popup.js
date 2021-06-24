const spendAmount = document.getElementById("spendAmount");

chrome.storage.sync.get(['total', 'limit'], (budget) => {
    document.getElementById('total').innerText = budget.total;
    document.getElementById('limit').innerText = budget.limit;
});

spendAmount.addEventListener('click', () => {
    chrome.storage.sync.get(['total', 'limit'], (budget) => {
        let newTotal = 0;
        if(budget.total) {
            newTotal += parseInt(budget.total);
        }
        let amount = parseInt(document.getElementById('amount').value);
        if(amount) {
            newTotal += amount;
        }

        chrome.storage.sync.set({'total': newTotal}, () => {
            if(amount && newTotal >= budget.limit) {
                let notifOptions = {
                    type: "basic",
                    iconUrl: "icon48.png",
                    title: "Limit reached!",
                    message: "You've reached your alloted limit."
                }
                chrome.notifications.create('limitNotif', notifOptions);
            }
        });

        amount.value = '';

        document.getElementById('total').innerText = newTotal;
    });

});