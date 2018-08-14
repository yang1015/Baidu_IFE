let tableWrapperDom = document.querySelector('#table-wrapper');
let table = document.querySelector('#table');

let regionCheckboxDom = document.querySelector('.region-checkbox');
let productCheckboxDom = document.querySelector('.product-checkbox');

let regionSelected = [];
let productSelected = [];
let regionAllChecked = false;
let productAllChecked = false;

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
       // console.log(value);
        if (productSelected.length == 0) {
            productSelected.push(value);
        } else {
            for (let i = 0; i < productSelected.length; i++) {
               // console.log(productSelected[i]);
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
    // console.log(regionSelected)
    // console.log(productSelected);
    let renderData = [];
    for (let i = 0; i < sourceData.length; i++) {
        let currentItem = sourceData[i];
        let region = currentItem.region;
        let product = currentItem.product;

        if (regionSelected.length == 0 && productSelected.length == 0) {
          //  console.log("nothing selected");
        } else if (regionSelected.length == 0) {
            for (let i = 0; i < productSelected.length; i++) {
                if (productSelected[i] == product) {
                    renderData.push(currentItem);
                }
            }
        } else if (productSelected.length == 0) {
            for (let i = 0; i < regionSelected.length; i++) {
                if (regionSelected[i] == region) {
                    renderData.push(currentItem);
                }
            }
        } else {
            for (let r = 0; r < regionSelected.length; r++) {
                let currentRegion = regionSelected[r];
                if (currentRegion == region) {
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
    formatNewHTML(renderData);
}

function formatNewHTML(renderData) {
    // 表头 商品 地区 12个月
    // formatTableHeader();

    emptyDataTable();
    formatTable(renderData);

    // 内容
    // html内容赋给table wrapper
}

function formatTable(renderData){
    formatTableHeader();
    formatDataContent(renderData);
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

    table.appendChild(tableHeader);
    tableWrapperDom.appendChild(table);

}

function formatDataContent(renderData) {
    /*
    {
        product: "手机", region: "华南",
        sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
    }
    */

   //console.log(renderData)
    for (let i = 0; i < renderData.length; i++) {
        let currentItem = renderData[i];
        let dataRow = document.createElement('tr');

        let product = document.createElement('td');
        let product_text = document.createTextNode(currentItem.product);
        product.appendChild(product_text);


        let region = document.createElement('td');
        let region_text = document.createTextNode(currentItem.region);
        region.appendChild(region_text);

        dataRow.appendChild(product);
        dataRow.appendChild(region);

        let monthData = currentItem.sale;
        for (let s = 0; s < monthData.length; s++) {
            let sales = document.createElement('td');
            let sales_text = document.createTextNode(monthData[s]);
            sales.appendChild(sales_text);
            dataRow.appendChild(sales);
        }

        table.appendChild(dataRow);
    }

    tableWrapperDom.appendChild(table);
    changeTd();

}

function emptyDataTable() {
    // tableData.childNodes = []; 这样是无效的需要循环删除
    //let len = tableData.childNodes.length;

    if (document.querySelector('#table')) { // 初始化的时候是没有childNodes的 当没有任何后代的时候，连childNodes这个属性都没有的
        let len = document.querySelector('#table').childNodes.length;
        let parentNode = document.querySelector('#table');
        let childNodes = parentNode.childNodes;
        for (let i = 0; i < len; i++) { //从1开始 不删除header
            parentNode.removeChild(childNodes[0]);
        }
    }
}

function changeTd() {
    //let regionChecked = document.querySelector('.region-checkbox').querySelectorAll("input[type=checkbox]:checked");
    //let productChecked = document.querySelector('.product-checkbox').querySelectorAll("input[type=checkbox]:checked");
    let tab = document.querySelector("#table");

    // 本来默认商品在前显示 地区在后显示
    // 所以只考虑相反的情况
    if (regionSelected.length === 1 && productSelected.length !== 1) { // 当只选择了一个region，多个products时(或者未选择product时)
        for (let i = 0; i < tab.rows.length; i++) {
            /* 交换所有数据的前两列的内容显示位置 */
            let temp = tab.rows[i].cells[0].innerHTML; // 记录每一行第0列的内容
            tab.rows[i].cells[0].innerHTML = tab.rows[i].cells[1].innerHTML; // 让每一行第0列的文字 = 原本属于第1列的文字
            tab.rows[i].cells[1].innerHTML = temp; // 第1列的文字 = 第0列
        }
    }

    mergeCell(1, 0); // 将上一步处理完的内容，查询相似的上下行，如果一致，合并单元格
}
/******合并单元格******/
function mergeCell(startrow, col) {
    let tab = document.querySelector("#table");
    for (let i = startrow; i < tab.rows.length - 1; i++) {
        // 如果第i行和第i+1行内容相同则隐藏第i+1行，同时第i行的rowSpan+1
        if (tab.rows[startrow].cells[col].innerHTML === tab.rows[i + 1].cells[col].innerHTML) {
            // 上面i<len-1，下面使用i+1 就不需要考虑出界问题了
            tab.rows[i + 1].cells[col].style.display = "none";
            tab.rows[startrow].cells[col].rowSpan += 1;
        }
        // 不相等的时候从第i+1行再次执行次函数
        else {
            mergeCell(i + 1, 0)
        }
    }
}

getChosenData([], []);