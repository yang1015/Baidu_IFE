To wrap it up,

### [click to see preview demo]( http://htmlpreview.github.io/?https://github.com/yang1015/Baidu_IFE/blob/master/CourseTasks/Academy1/LayoutMission.html)

### **难点**
1- <br/>竟然一直没想到怎么把nav的第一个Home的border-bottom给弄没。<br/>其实直接单独给first child加active class, 并且border-bottom #fff就ok了。这样后面toggle的时候也好操作。

2- <br/>flex items里，每一个item都要有至少80px的padding.<br/>
之前一直在flex item里面有没有属性for this purpose，但是最后才想到其实首先设置每个div padding: 80px; 然后后面再考flex无单位grow来拉伸更大的空间即可。

3- <br/>选择器的问题<br/>
习惯于用div:nth-of-type(n)来获取每个要被调用的值了，all的时候全都列出来真的麻烦。使用子元素选择器.row > div即可。