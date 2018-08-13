let tableWrapperDom = document.getElementById('table-wrapper');
let tableHeaderRow = document.getElementById('table-header');
let tableData = document.getElementById('data-table');

let regionCheckboxDom = document.getElementsByClassName('region-checkbox')[0];
let productCheckboxDom = document.getElementsByClassName('product-checkbox')[0];

let regionSelected = [];
let regionAllChecked = false;
let productAllChecked = false;
let productSelected = [];

function handleClick(category, value) {
    if (category == "region") {
        if (value != '全选') checkIfExisted(category, value);
        else {
            regionAllChecked = !regionAllChecked;
            checkAllOrEmptyAll(category, regionAllChecked); // 置反
        }
    } else if (category == "product") {
        if (value != '全选') checkIfExisted(category, value);
        else {
            productAllChecked = !productAllChecked;
            checkAllOrEmptyAll(category, productAllChecked); // 置反
        }
    }

    getChosenData(regionSelected, productSelected);
}

function checkIfExisted(type, value) {
    if (type == "region") {
        if (regionSelected.length == 0) {
            regionSelected.push(value);
        } else {
            for (let i = 0; i < regionSelected.length; i++) {
                if (regionSelected[i] == value) { // 已经存在 再点是为了remove
                    regionSelected.splice(i, 1); // i为起始位置 1为删除个数
                    return;
                }
            }
            regionSelected.push(value);
        }

    } else if (type == 'product') {
        console.log(value);
        if (productSelected.length == 0) {
            productSelected.push(value);
        } else {
            for (let i = 0; i < productSelected.length; i++) {
                console.log(productSelected[i]);
                if (productSelected[i] == value) { // 已经存在 再点是为了remove
                    productSelected.splice(i, 1); // i为起始位置 1为删除个数
                    return; // 一定要return 不然无论如何下面都会再加一遍
                }
            }
            // for loop了 没有 要添加
            // for loop了 有 已经添加了
            productSelected.push(value);
        }
    }
}

function checkAllOrEmptyAll(category, AllChecked) {
    let len = category == "region" ? regionCheckboxDom.childNodes.length : productCheckboxDom.childNodes.length;
    for (let i = 0; i < len; i++) {
        let inputDom = category == "region" ? regionCheckboxDom.childNodes[i] : productCheckboxDom.childNodes[i];
        inputDom.checked = AllChecked ? true : false;
        if (category == "region") {
            if (AllChecked) regionSelected = ['华北', "华南", "华东"];
            else regionSelected = []
        } else {
            if (AllChecked) productSelected = ['手机', "智能音箱", "笔记本"];
            else productSelected = []
        }
    }

}

function getChosenData(regionSelected, productSelected) {
    console.log(regionSelected)
    console.log(productSelected);
    let renderData = [];
    for (let i = 0; i < sourceData.length; i++) {
        let currentItem = sourceData[i];
        let region = currentItem.region;
        let product = currentItem.product;

        if (regionSelected.length == 0 && productSelected.length == 0) {
            console.log("nothing selected");
        } else if (regionSelected.length == 0) {
            for (let i = 0; i < productSelected.length; i++) {
                if (productSelected[i] == product) {
                    renderData.push(currentItem);
                }
            }
        } else {
            for (let r = 0; r < regionSelected.length; r++) {
                let currentRegion = regionSelected[r];
                if (currentRegion == region) {
                    if (productSelected.length == 0) {
                        renderData.push(currentItem);
                    } else {
                        for (let p = 0; p < productSelected.length; p++) {
                            let currentProduct = productSelected[p];
                            if (currentProduct == product) {
                                renderData.push(currentItem);
                            }
                        }
                    }


                }
            }
        }

    }
    formatNewHTML(renderData);
}

function formatNewHTML(renderData) {
    // 表头 商品 地区 12个月
    // formatTableHeader();

    emptyDataTable();
    formatDataContent(renderData);
    // 内容
    // html内容赋给table wrapper
}

function formatTableHeader() {
    let tableHeader = document.createElement('tr');
    let headerContent1 = document.createElement('th');
    let headerContent2 = document.createElement('th');

    let textNode1 = document.createTextNode("商品"),
        textNode2 = document.createTextNode("地区");
    headerContent1.appendChild(textNode1);
    headerContent2.appendChild(textNode2);
    tableHeader.appendChild(headerContent1);
    tableHeader.appendChild(headerContent2);

    for (let i = 1; i <= 12; i++) {
        let div = document.createElement('th');
        let textNode = document.createTextNode(i + "月");
        div.appendChild(textNode);
        tableHeader.appendChild(div);
    }

    tableHeaderRow.appendChild(tableHeader);
    tableWrapperDom.appendChild(tableHeaderRow)

}

function formatDataContent(renderData) {
    /*
    {
        product: "手机", region: "华南",
        sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
    }
    */

    for (let i = 0; i < renderData.length; i++) {
        let currentItem = renderData[i];
        let dataRow = document.createElement('tr');

        let product = document.createElement('td');
        let product_text = document.createTextNode(currentItem.product);
        product.appendChild(product_text);
        // product.style.width = "100px";

        let region = document.createElement('td');
        let region_text = document.createTextNode(currentItem.region);
        region.appendChild(region_text);
        // region.style.width = "100px";

        dataRow.appendChild(product);
        dataRow.appendChild(region);

        let monthData = currentItem.sale;
        for (let s = 0; s < monthData.length; s++) {
            let sales = document.createElement('td');
            let sales_text = document.createTextNode(monthData[s]);
            sales.appendChild(sales_text);
            dataRow.appendChild(sales);
        }

        tableData.appendChild(dataRow);
    }

    tableWrapperDom.appendChild(tableData);

}

function emptyDataTable() {
    // tableData.childNodes = []; 这样是无效的需要循环删除
    let len = tableData.childNodes.length;
    for (let i = 0; i < len; i++) {
        tableData.removeChild(tableData.childNodes[0]);
    }
}