# 1 CSS中postion属性

CSS中postion属性是用于元素定位的属性，即指定某元素的在页面中的位置。

属性的常用取值：

- absolute：绝对定位
- fixed：固定定位
- relative：相对定位

这几种是平常用到的最多的定位方式，当然还有其他属性值，一般比较少用（或者说我很少使用)，下面一一介绍这三种定位方式。

## 1.1 固定定位：fixed

固定定位的参照物是浏览器窗口，即相对浏览器窗口的位置，把元素固定在浏览器窗口的某一位置。被固定的元素不占文档空间，其他元素可以占该元素正常布局时的位置。被固定的元素可以通过top、bottom、left、right改变元素相对浏览器窗口的位置。

固定定位一般用在侧边导航栏或底部导航栏。

举一个简单的固定定位的例子：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>postion</title>

    <style>
        /* 初始化一下文档 */
        * {
            margin: 0;
            padding: 0;
        }
        
        .test1 {
            /* 设置块级元素的大小和颜色 */
            width: 100px;
            height: 100px;
            background-color: aqua;
            /* 采用固定定位固定元素位置 */
            position: fixed;
            /* 设置该div与浏览器窗口的位置 */
            /* 左边间隔30px */
            left: 30px;
            /* 上边间隔50px */
            top: 50px;
        }
    </style>
</head>

<body>
    <!-- 定义一个用来测试的div -->
    <div class="test1"></div>
</body>
</html>
```

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/1.png)

一般情况下，固定定位常用于固定底部导航栏。下面是一个底部导航栏的案例。

```java
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>postion</title>
    
    <!-- CSS代码 -->
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        
        .footer {
            height: 60px;
            position: fixed;
            bottom: 0;
            right: 0;
            left: 0;
        }
        
        .footer ul {
            overflow: hidden;
        }
        
        .footer ul li {
            float: left;
            list-style: none;
            width: 33.3%;
            background-color: rgb(116, 113, 113);
        }
        
        .footer ul li a {
            text-decoration: none;
        }
        
        .footer li img {
            display: block;
            margin: 7px auto 7px;
            width: 23px;
            height: 23px;
        }
        
        .footer li a span {
            display: block;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: normal;
            margin-bottom: 7px;
        }
    </style>
</head>

<body>
    <div class="footer">
        <ul>
            <li>
                <a href="">
                    <img src="../img/index1.png" alt="">
                    <span>首页</span>
                </a>
            </li>
            <li>
                <a href="">
                    <img src="../img/category.png" alt="">
                    <span>分类</span>
                </a>
            </li>
            <li>
                <a href="">
                    <img src="../img/me.png" alt="">
                    <span>我的</span>
                </a>
            </li>
        </ul>
    </div>
</body>

</html>
```

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/2.png)

固定之后，导航栏不会随着屏幕的滑动而滑动。

## 1.2 绝对定位：absolute

绝对定位的参照物是当前元素的上一级元素（可以是body），即相对该元素的父元素的位置。用了相对定位之后该元素在其父元素内不占空间，该父元素中的其他元素可以叠加到该元素之上。

被定位的元素在其父元素中通过left、right、bottom、top来调整相对位置。

下面是一个使用绝对定位的小例子。

```java
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>postion</title>

    <!-- CSS代码 -->
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        
        .box {
            /* 设置一个父元素,设置宽度与高度 */
            width: 400px;
            height: 500px;
            background-color: purple;
            position: relative;
        }
        
        .item {
            /* 使用绝对定位的元素 */
            width: 200px;
            height: 300px;
            background-color: powderblue;
            /* 使用绝对定位 */
            position: absolute;
            /* 距离顶部40px */
            top: 40px;
            /* 距离左边90px */
            left: 90px;
        }
    </style>
</head>

<body>
    <div class="box">
        <div class="item">
        </div>
    </div>
</body>
</html>
```

<img src="https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/3.png" style="zoom: 67%;" />

## 1.3 相对定位：relative

相对定位指相对该元素原来位置，它的参照物是该元素最初的位置。相对定位也是通过left、right、top、bottom来调整位置。

```java
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>postion</title>

    <!-- CSS代码 -->
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        
        .box {
            width: 400px;
            height: 500px;
            margin-left: 100px;
            margin-top: 50px;
            padding: 20px 20px;
            border: 2px solid blue;
        }
        
        .item1 {
            display: block;
            width: 150px;
            background-color: gray;
            margin-top: 10px;
            color: white;
        }
        
        .item2 {
            display: block;
            width: 250px;
            margin-top: 10px;
            color: white;
            background-color: rgb(223, 138, 138);
            position: relative;
            left: 20px;
        }
        
        .item3 {
            display: block;
            width: 250px;
            margin-top: 10px;
            color: white;
            background-color: rgb(141, 223, 138);
            position: relative;
            right: 10px;
        }
        
        .item4 {
            display: block;
            width: 250px;
            margin-top: 10px;
            color: white;
            background-color: rgb(24, 145, 175);
            position: relative;
            top: -110px;
        }
    </style>
</head>

<body>
    <div class="box">
        <span class="item1">
            这是最初的位置
        </span>
        <span class="item2">
            这是相对最初位置向右20px的位置
        </span>
        <span class="item3">
            这是相对最初位置向左10px的位置
        </span>
        <span class="item4">
            移动相对定位元素，它原本所占的空间不会改变
        </span>
    </div>
</body>
</html>
```

<img src="https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/4.png" style="zoom: 67%;" />

相对定位只是造成视觉显现出现移动的偏差，但其最初所占的空间不会改变。

即某个元素设置了相对定位，看起来它向左或向右移动了一段距离，但这只是视觉上造成的偏差。而实际上该元素最初所占的空间不会移动，还在原来的位置，该元素下面那些没有设置定位的元素不会移动上来。

> **一般相对定位与绝对定位的使用时按照子绝父相的原则。**

