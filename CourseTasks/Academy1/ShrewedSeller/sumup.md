## ==1- 置换表格的列==

取table 循环rows

(不应该去取renderData 而是直接调用table的数据 这样好调用rows和cells，因为是直接在table上做修改，而不是修改数据)

先根据用户选择的select来判断 哪一个分类在前

默认商品在cells[0] 地区在cells[1] 后面是1-12月

(1) 当只选择了一个地区，但是多个商品的时候，置换renderData里的每一row的cells[0]和cells[1]

(2) 当只选择了一个地区，但是未选择商品，也将地区显示在前

## ==2- 合并单元格==

取table 循环rows

mergeCells(1,  0); row =  1,  cell =  0;  cell始终为0，因为只考虑第0列的合并

从i =  1开始，跳过tableHeader的数据
len <  rows.length - 1;


**IF**  这个rows[i].cells[0]的innerHTML == rows[i  +  1].cells[0]的innerHTML

(1)  将rows[i+1].cells[0].style.display  =  "none";

(2)  rows[i].cells[0].rowSpan++;

**ELSE**  mergeCell(i +  1,  0);

