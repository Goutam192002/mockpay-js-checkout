function MockPay({ amount, keyId, onSuccess, onFailure, customer }) {
    this.amount = amount;
    this.keyId = keyId;
    this.onSuccess = onSuccess;
    this.onFailure = onFailure;
    this.customer = customer || {};
}

MockPay.prototype.open = function () {
    const body = document.getElementsByTagName('body')[0];

    const styleSheetExists = !!document.getElementById('mockpay_checkout_stylesheet');
    if (!styleSheetExists) {
        const head = document.getElementsByTagName('head')[0];
        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = '../checkout.css';
        stylesheet.id = 'mockpay_checkout_stylesheet';
        head.appendChild(stylesheet);
    }

    const overlayExists = !!document.getElementById('mockpay_root');
    if (!overlayExists) {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.id = 'mockpay_root';

        const paymentCardWrapper = document.createElement('div');
        paymentCardWrapper.className = 'payment-card-wrapper';
        const paymentCard = document.createElement('div');
        paymentCard.className = 'payment-card';
        paymentCard.style.backgroundColor = this.themeColor;

        const infoDiv = document.createElement('div');
        infoDiv.className = 'payment-card-header';

        const paymentInfo = document.createElement('p');
        paymentInfo.className = 'payment-info-text';
        paymentInfo.innerText = `Paying ${this.currency} ${this.amount}`;

        const closeButton = document.createElement('a');
        closeButton.innerText = 'X';
        closeButton.onclick = () => {
            overlay.style.display = 'none';
        }

        const cardNumberInput = document.createElement("input");
        cardNumberInput.placeholder = '1234 5678 9101 1213';
        cardNumberInput.autocompletetype = 'cc-number';
        cardNumberInput.onkeydown = ev => {
            const shouldEscape = ev.key.length === 1 && /[^0-9]/.test(ev.key);
            const isNumber = ev.key.length === 1 && /\d/.test(ev.key)
            const isDelete = ['backspace', 'delete'].includes(ev.key.toLowerCase());

            if (isDelete) {
                const lastSpaceIndex = cardNumberInput.value.lastIndexOf(' ');
                let factor = 0;
                if (cardNumberInput.value.length - 2 === lastSpaceIndex) {
                    factor = 1
                }
                cardNumberInput.value = cardNumberInput.value.slice(0, cardNumberInput.value.length - factor);
            } else if (shouldEscape) {
                ev.preventDefault();
                return;
            } else if (isNumber) {
                ev.preventDefault();
                cardNumberInput.value = cardNumberInput.value.length <= 18 ? cardNumberInput.value.concat(ev.key) : cardNumberInput.value;
                const nextSpaceIndex = cardNumberInput.value.lastIndexOf(' ') + 5;
                if (cardNumberInput.value.length === nextSpaceIndex && nextSpaceIndex < 19) {
                    cardNumberInput.value = cardNumberInput.value.concat(' ');
                }
                if (cardNumberInput.value.length === 19) {
                    expiryInput.focus();
                }
            }
        }

        const expiryCvvContainer = document.createElement("div");
        expiryCvvContainer.className = "flex justify-between";
        const expiryInput = document.createElement("input");
        expiryInput.placeholder = '02/19';
        expiryInput.className = 'flex-shrink'
        expiryInput.onkeydown = ev => {
            const shouldEscape = ev.key.length === 1 && /[^0-9]/.test(ev.key);
            const isNumber = ev.key.length === 1 && /\d/.test(ev.key)
            const isDelete = ['backspace', 'delete'].includes(ev.key.toLowerCase());

            if (isDelete) {
                let factor = 0;
                if (expiryInput.value.length === 4) {
                    factor = 1
                }
                expiryInput.value = expiryInput.value.slice(0, expiryInput.value.length - factor);
            } else if (shouldEscape) {
                ev.preventDefault();
                return;
            } else if (isNumber) {
                ev.preventDefault();
                expiryInput.value = expiryInput.value.length <= 4 ? expiryInput.value.concat(ev.key) : expiryInput.value;
                if (expiryInput.value.length === 2) {
                    expiryInput.value = expiryInput.value.concat('/');
                }
                if (expiryInput.value.length === 5) {
                    cvvInput.focus();
                }
            }
        }

        const cvvInput = document.createElement("input");
        cvvInput.placeholder = '000';
        cvvInput.className = 'flex-shrink'
        cvvInput.onkeydown = ev => {
            const shouldEscape = ev.key.length === 1 && /[^0-9]/.test(ev.key);
            const isNumber = ev.key.length === 1 && /\d/.test(ev.key)
            const isDelete = ['backspace', 'delete'].includes(ev.key.toLowerCase());

            if (isDelete) {
                cvvInput.value = cvvInput.value.slice(0, cvvInput.value.length);
            } else if (shouldEscape) {
                ev.preventDefault();
                return;
            } else if (isNumber) {
                ev.preventDefault();
                cvvInput.value = cvvInput.value.length <= 2 ? cvvInput.value.concat(ev.key) : cvvInput.value;
                if (cvvInput.value.length === 3) {
                    nameInput.focus();
                }
            }
        };

        expiryCvvContainer.appendChild(expiryInput);
        expiryCvvContainer.appendChild(cvvInput);

        const nameInput = document.createElement("input");
        nameInput.placeholder = 'Name on card';
        const payButton = document.createElement("button")
        payButton.innerText = 'Pay Now';
        payButton.className = 'pay-button';
        payButton.onclick = async () => {
            loadingOverlay.classList.remove('hide');
            const txn = await request('http://localhost:8000/transactions/initiate/', "POST", {
                "amount": this.amount,
                "api_key": this.keyId,
                "customer": this.customer
            });
            window.open(txn.authorization_url, '_blank');
            const data = await pollTransactionStatus(txn["txn_id"], this.keyId);
            loadingOverlay.classList.add('hide');
            document.getElementById('mockpay_root').remove();
            if (data["status"] === "success") {
                this.onSuccess(data);
            } else {
                this.onFailure(data);
            }
        }

        const gapDiv = document.createElement("div");
        gapDiv.className = "flex-1";

        infoDiv.appendChild(paymentInfo);
        infoDiv.appendChild(closeButton);

        paymentCard.appendChild(infoDiv);
        paymentCard.appendChild(cardNumberInput);
        paymentCard.appendChild(expiryCvvContainer);
        paymentCard.appendChild(nameInput);
        paymentCard.appendChild(gapDiv);
        paymentCard.appendChild(payButton);

        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading hide';
        const loadingGif = document.createElement('img');
        loadingGif.src = "../loading_animation.gif";
        loadingGif.className = "loading-animation";
        const loadingText = document.createElement('p');
        loadingText.style.color = 'black';
        loadingText.innerText = 'Processing Transaction';
        loadingOverlay.appendChild(loadingGif);
        loadingOverlay.appendChild(loadingText);

        paymentCardWrapper.appendChild(paymentCard);
        paymentCardWrapper.appendChild(loadingOverlay);
        overlay.appendChild(paymentCardWrapper);
        body.appendChild(overlay);

        cardNumberInput.autofocus = true;
    }
}

function request(url, method, data) {
    return new Promise((resolve, reject) => {
        const xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                resolve(JSON.parse(this.responseText))
            } else if ([400, 403, 500].includes(this.status) && this.readyState === 4) {
                reject(JSON.parse(this.responseText))
            }
        }
        xmlHttpRequest.open(method, url);
        xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
        if (method === "POST") {
            xmlHttpRequest.send(JSON.stringify(data));
        } else {
            xmlHttpRequest.send();
        }
    })
}

function pollTransactionStatus(txnId, apiKey) {
    return new Promise(resolve => {
        const poll = setInterval(() => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    if (["success", "failed"].includes(data["status"])) {
                        clearInterval(poll);
                        resolve(data);
                    }
                }
            }
            xhr.open("POST", `http://localhost:8000/transactions/${txnId}/status/`);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(
                JSON.stringify({
                    "api_key": apiKey
                })
            );
        }, 1000);
    })
}