let tableWrapperDom = document.getElementById('table-wrapper');
let tableHeaderRow = document.getElementById('table-header');
let tableData = document.getElementById('data-table');

let regionSelected = "华东";
let productSelected = "手机";

function handleRegionChange(regionChosen) {
    emptyDataTable();
    regionSelected = regionChosen;
    getChosenData(regionSelected, productSelected);
}

function handleProductChange(productChosen) {
    emptyDataTable();
    productSelected = productChosen;
    getChosenData(regionSelected, productSelected);
}

function getChosenData(regionChosen, productChosen) {
    let renderData = [];
    for (let i = 0; i < sourceData.length; i++) {
        if (sourceData[i].region == regionChosen && sourceData[i].product == productChosen) {
            renderData.push(sourceData[i]);
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
    let tableHeader = document.createElement('div');
    let headerContent1 = document.createElement('div');
    let headerContent2 = document.createElement('div');
    let headerContent3 = document.createElement('div');

    let textNode1 = document.createTextNode("商品"),
        textNode2 = document.createTextNode("地区");
    headerContent1.appendChild(textNode1);
    headerContent2.appendChild(textNode2);

    for (let i = 1; i <= 12; i++) {
        let div = document.createElement('div');
        let textNode = document.createTextNode(i + "月");
        div.appendChild(textNode);
        div.style.width = "45px";
        div.style.textAlign = "left";
        headerContent3.appendChild(div);
    }

    tableHeader.appendChild(headerContent1);
    tableHeader.appendChild(headerContent2);
    tableHeader.appendChild(headerContent3);

    tableHeader.style.display = "flex";
    headerContent1.style.width = "100px";
    headerContent2.style.width = "100px";
    headerContent3.style.display = "flex";


    tableHeaderRow.appendChild(tableHeader);
    tableWrapperDom.appendChild(tableHeaderRow)

}

function formatDataContent(renderData) {
    let dataTable = document.createElement('div');
    /*
    {
        product: "手机", region: "华南",
        sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
    }
    */

    for (let i = 0; i < renderData.length; i++) {
        let currentItem = renderData[i];
        let dataRow = document.createElement('div');
        dataRow.style.display = "flex";
        dataRow.style.alignItems = "baseline";

        let product = document.createElement('div');
        let product_text = document.createTextNode(currentItem.product);
        product.appendChild(product_text);
        product.style.width = "100px";

        let region = document.createElement('div');
        let region_text = document.createTextNode(currentItem.region);
        region.appendChild(region_text);
        region.style.width = "100px";

        let monthData = currentItem.sale;
        let monthSales = document.createElement('div');
        monthSales.style.display = "flex";
        monthSales.style.alignItems = "baseline";
        for (let s = 0; s < monthData.length; s++) {
            let sales = document.createElement('p');
            let sales_text = document.createTextNode(monthData[i]);
            sales.appendChild(sales_text);
            sales.style.width = "45px";
            sales.style.textAlign = "left";
            monthSales.appendChild(sales);
        }

        dataRow.appendChild(product);
        dataRow.appendChild(region);
        dataRow.appendChild(monthSales);

        dataTable.appendChild(dataRow);
    }

    tableData.appendChild(dataTable)
    tableWrapperDom.appendChild(tableData);

}

function emptyDataTable() {
    // tableData.childNodes = []; 这样是无效的需要循环删除
    let len = tableData.childNodes.length;
    for (let i = 0; i < len; i++) {
        tableData.removeChild(tableData.childNodes[0]);
    }
}