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

function findDom() {
    getAllListItem();
    findAllHtmlSpanInOneSection('news-top');
    findListItem('news-top', 'CSS');
    getActiveLinkContent('news-top')
}

function getAllListItem() {
    // 返回页面中所有li标签
    let allLiElement = document.querySelectorAll('li');

}

function findAllHtmlSpanInOneSection(sectionId) {
    // 返回某个section下所有span中内容为HTML的span标签
    let sectionEl = document.getElementById(sectionId).getElementsByTagName('span');
    // let sectionElChildNodes = sectionEl.childNodes; 搜了span 就已经是一个数组了 没有childNodes
    // let spanList = sectionElChildNodes.getElementsByTagName('span'); 错误用法

    // 要找的node可能不在section的第一层子元素里诶
    for (let i = 0; i < sectionEl.length; i++) {
        let currentChild = sectionEl[i];
        if (currentChild.innerHTML == "HTML") {
            console.log(currentChild);
        }
    }

}

function findListItem(sectionId, spanCont) {
    // 返回某个section下，所有所包含span内容为spanCont的LI标签
    let sectionEl = document.getElementById(sectionId).getElementsByTagName('span');
    for (let i = 0; i < sectionEl.length; i++) {
        let currentChild = sectionEl[i];
        if (currentChild.innerHTML == spanCont && currentChild.parentNode.tagName == "LI" ) {
            console.log(currentChild.parentNode);
        }
    }

}

function getActiveLinkContent(sectionId) {
    // 返回某个section下，class为active的链接中包含的文字内容
    let arr = [];
    let sectionEl = document.getElementById(sectionId).getElementsByTagName('a');
    //let sectionElChildNodes = sectionEl.childNodes;
    for (let i = 0; i < sectionEl.length; i++) {
        let currentChild = sectionEl[i];
        if (currentChild.className == "active") {
            console.log(currentChild);
        }
    }
}


