const limit = document.getElementById('limit');
const saveLimit = document.getElementById('saveLimit');
const resetTotal = document.getElementById('resetTotal');

chrome.storage.sync.get('limit', (budget) => {
    limit.innerText=budget.limit ? budget.limit : 0;
});

saveLimit.addEventListener('click', () => {
    let limitVal = parseInt(limit.value);
    console.log(limitVal);
    console.log(limit.innerHTML);
    if(limitVal) {
        chrome.storage.sync.set({'limit': limitVal});
    }
});

resetTotal.addEventListener('click', () => {
    chrome.storage.sync.set({'total': 0}, () => {
        let notifOptions = {
            type: "basic",
            iconUrl: "icon48.png",
            title: "Resetting Total",
            message: "Total has been reset to 0"
        };

        chrome. notifications.create('resetNotif', notifOptions);
    });
});