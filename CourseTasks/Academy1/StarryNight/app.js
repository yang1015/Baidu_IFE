let divDom = document.querySelector('div');
//let divDom = document.getElementsByClassName('half-of-window')[0];
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;

function initializeDiv() {

    divDom.style.width = innerWidth / 2 + 'px';
    divDom.style.height = innerHeight / 2 + 'px';

    let p1 = document.createElement('p');
    let textNode1 = document.createTextNode("屏幕 长: " + innerWidth + "px" + " 宽: " + innerHeight + "px");
    p1.appendChild(textNode1);

    let p2 = document.createElement('p');
    let textNode2 = document.createTextNode("div 长: " + innerWidth / 2 + "px" + " 宽: " + innerHeight / 2 + "px")
    p2.appendChild(textNode2);

    divDom.appendChild(p1);
    divDom.appendChild(p2);
}

function changeDivSize() {

    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;

    divDom.style.width = innerWidth / 2 + 'px';
    divDom.style.height = innerHeight / 2 + 'px';

    document.getElementsByTagName('p')[0].textContent = "屏幕 长: " + innerWidth + "px" + " 宽: " + innerHeight + "px"
    document.getElementsByTagName('p')[1].textContent = "div 长: " + innerWidth / 2 + "px" + " 宽: " + innerHeight / 2 + "px"
}

