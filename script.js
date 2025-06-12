window.alert = function (message, timeout = null) {
    const alert = document.createElement('div');
    const alertButton = document.createElement('button');
    alertButton.innerText = 'OK';
    alert.classList.add('alert');
    if (window.innerWidth >= 1030) {
        alert.setAttribute('style', `
            position : fixed;
            top:17%;
            width:260px;
            left:70%;
            padding:10px;
            background:#F5ECE0;
            // background:white;
            border-radius:10px;
            box-shadow: 2px 5px 5px 0 #00000084;
            display:flex;
            border:1px solid #333;
            font-weight:bold;
            transform:translateX(-50%);
}
            `);
    }
    else if (window.innerWidth <= 784 && window.innerWidth > 400) {
        alert.setAttribute('style', `
            position : fixed;
            top:17%;
            width:260px;
            left:45%;
            padding:10px;
            background:#F5ECE0;
            // background:white;
            border-radius:10px;
            box-shadow: 2px 5px 5px 0 #00000084;
            display:flex;
            justify:between;
            border:1px solid #333;
            font-weight:bold;
            transform:translateX(-50%);
}
            `);
    }
    else if (window.innerWidth <= 1030 && window.innerWidth > 784) {
        alert.setAttribute('style', `
            position : fixed;
            top:17%;
            width:260px;
            left:45%;
            padding:10px;
            background:#F5ECE0;
            // background:white;
            border-radius:10px;
            box-shadow: 2px 5px 5px 0 #00000084;
            display:flex;
            justify:between;
            border:1px solid #333;
            font-weight:bold;
            transform:translateX(-50%);
}
            `);
    }
    else {
        alert.setAttribute('style', `
            position : fixed;
            top:17%;
            width:260px;
            left:50%;
            padding:10px;
            background:#F5ECE0;
            // background:white;
            border-radius:10px;
            box-shadow: 2px 5px 5px 0 #00000084;
            display:flex;
            justify:between;
            border:1px solid #333;
            font-weight:bold;
            transform:translateX(-50%);
}
            `);
    }
    alertButton.setAttribute('style', `
        border:1px solid #333;
        border-radius:15px;
        background:white;
        padding:0px 15px;
        cursor:pointer;
        font-weight:normal;
        `);
    alert.innerHTML = `<span style="padding:10px">${message}</span>`;
    alert.appendChild(alertButton);
    alertButton.addEventListener('click', (e) => {
        alert.remove();
    });
    if (timeout != null) {
        setTimeout(() => {
            if (alert) {
                alert.remove();
            }
        }, Number(timeout));
    }
    document.body.appendChild(alert);
}
