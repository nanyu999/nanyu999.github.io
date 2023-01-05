## Centos7安装

点击创建新的虚拟机

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_07-54-36.png)



选择自定义，然后点击下一步

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_07-55-08.png)



直接点击下一步。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_07-55-22.png)



选择稍后安装操作系统。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_07-55-56.png)



选择Linux系统，版本为CentOS7 64位

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_07-56-15.png)



修改虚拟机位置。

![](D:\Appinstall\Typora\所有内容\hadoop学习笔记\centos.assets\QQ截图20210219131230.png)



处理器根据自己电脑配置及自己需求配置即可。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_07-56-52.png)



根据自己电脑配置及需求设置内存大小。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_07-57-05.png)

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_07-57-46.png)



选择NAT模式。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_07-57-59.png)

默认即可。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_07-58-13.png)



默认即可。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_07-58-27.png)



选择创建新的虚拟磁盘。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_07-58-40.png)



根据自己需求设置磁盘大小。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_07-59-27.png)



可做修改也可不修改。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_07-59-49.png)



自定义硬件。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_08-00-04.png)



选择新CD/DVD，使用ISO镜像文件，点击浏览选择下载好的ISO镜像文件。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_08-00-54.png)

最后点击关闭即可。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_08-02-02.png)



点击完成。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_08-02-13.png)



开启虚拟机

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/Snipaste_2020-09-19_08-02-39.png)



鼠标点入黑框，使用上方向键选择Install CentOS7。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20200919080431.png)



选择中文简体

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20200919080632.png)



选择安装位置

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20200919080704.png)



直接点击完成。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20200919080748.png)



## 网络配置

点击网络和主机名。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20200919080813.png)



![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20200919080904.png)



接下来选择常规。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20200919080943.png)

选择IPV6，选择忽略。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20200919081421.png)

选择IPV4设置，将自动改为手动，然后先不要关闭，下面还要设置IP。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20200919081405.png)

点击VM虚拟机的左上角**编辑-虚拟网络编辑器，选择NAT模式-NAT设置**

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20210219150426.png)



点击IPV4中的Add，把虚拟网络编辑器中的配置一一对应填进去，具体步骤如下图。（地址栏对应子网ip，最后一位0可随意换成100-255之间的数字，子网掩码填24，网关对应网关IP）

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20210219151505.png)



配置好的网络状况如下，无误后点击完成。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20210219151916.png)



点击开始安装。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20210219152134.png)



设置Root账户密码。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20210219152358.png)



设置密码之后点击完成。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20210219152429.png)



等待安装完成即可，时间可能较久。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20210219152558.png)



安装完成之后，点击重启。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20210219152748.png)



输入账户：root，密码：（输入之后看不见，输完之后直接回车）。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20210219153102.png)



ping百度网址，测试网络是否通顺。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20210219153241.png)



新节点安装成功。

