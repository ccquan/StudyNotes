# Java进阶-XML

## 概念

Extensible Markup Language 可扩展标记语言

- 可扩展：标签都是自定义，例：`<users>` 、`<自定义>`
- 功能：存储数据
  + 配置文件
  + 在网络中传输
- xml与html的区别
  + xml标签都是自定义，html标签是预定义
  + xml语法严格，html语法松散
  + xml是存储数据的，html是展示数据的



## 代码文件夹

IdeaProjects/XML_Practice



## 快速开始

### 基本语法

- 后缀 .xml
- xml第一行必须定义为文档声明，例 `<?xml version='1.0' encoding='utf-8' ?>`
- 有且只有一个根标签，例下面的根标签是 `users`
- 属性组必须用引号，例下面 `id='1'`
- 标签必须正确关闭
- 标签区分大小写

```xml
<?xml version='1.0' encoding='utf-8' ?>

<users>
	<user id='1'>
	  <name>Tom</name>
	  <age>23</age>
	  <gender>male</gender>
	</user>

	<user id='2'>
	  <name>July</name>
	  <age>2</age>
	  <gender>female</gender>
	</user>
</users>
```



## 组成部分

### 文档声明

- version  版本说明
- encoding  编码格式
- standalone  是否独立【不常用】
  + 值：yes/no

### 指令

结合CSS达到渲染视图效果

- 例：CSS 将 name 标签字体颜色设为 红色

指令.xml

```xml
<?xml version='1.0' encoding='utf-8' ?>
<!-- 引用CSS外部文件 -->
<?xml-stylesheet type='text/css' href='a.css' ?>
<users>
	<user id='1'>
	  <name>Tom</name>
	  <age>23</age>
	  <gender>male</gender>
	</user>

	<user id='2'>
	  <name>July</name>
	  <age>2</age>
	  <gender>female</gender>
	</user>
</users>
```

a.css

```css
name {
  color: red;
}
```

效果

<span style="color:red">Tom</span> 23 male <span style="color:red">July</span>  2 female



### 标签

标签名称规则

- 字母、数字、及其它字符
- 不能以数字或标点符号开始
- 不能以字母xml、XML、Xml 等开始
- 不能包含空格



### 属性

id属性值唯一



### 文本

- CDATA：格式化，该区域里的数据会被原样展示

  ```xml
  <![CDATA[ 数据 ]]>
  ```




## 约束

概念：规定XML文档的书写规则

- 框架的使用者（程序员）

  + 能够在XML中引入约束文档

  + 能够简单的读懂约束文档

### 分类

  + DTD
  + Schema



### DTD

- 引入本地DTD语法：

```
<!DOCTYPE 根标签名 SYSTEM "文件路径">
```

- 引入网络DTD语法：

```
<!DOCTYPE 根标签名 PUBLIC "文件名称" "文件URL">
```

student.dtd

```dtd
<!-- 约束能有多个子student -->
<!ELEMENT students (student*)>
<!-- 约束student里包含的成员且顺序不能改变 -->
<!ELEMENT student (name, age, sex)>
<!-- 约束成员的类型 -->
<!ELEMENT name (#PCDATA)>
<!ELEMENT age (#PCDATA)>
<!ELEMENT sex (#PCDATA)>
<!-- 约束ID是唯一值 -->
<!ATTLIST student number ID #REQUIRED>
```

依照约束规则的XML

```xml
<?xml version='1.0' encoding='utf-8' ?>
<!DOCTYPE students SYSTEM "students.dtd">

<students>
  <student number="s001">
    <name>汤姆</name>
    <age>25</age>
    <sex>男</sex>
  </student>
  <student number="s002">
    <name>约翰</name>
    <age>15</age>
    <sex>男</sex>
  </student>
</students>
```



### Schema

后缀 `.xsd`

引入语法

```xml
<students xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns="http://www.itcast.cn/xml"
          xsi:schemaLocation="http://www.itcast.cn.xml student.xsd">
```



## 解析XML

### 解析方法

- DOM 
  + 优点：可读可写，支持增删改，操作方便
  + 缺点：占内存
- SAX
  + 有点：不占内存
  + 缺点：只能读取，不能增删改



### jsoup解析器

概述：可以解析html和XML的一个工具类，返回Document

下载地址：https://jsoup.org/download

#### 快速开始

语法跟 JS 类似

- 例：解析students.xml ，读取name值

```java
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import java.io.File;
import java.util.Objects;

public class jsoupDemo1 {
    public static void main(String[] args) throws Exception {
//       1. 获取students.xml路径
        String filePath = Objects.requireNonNull(jsoupDemo1.class.getClassLoader().getResource("students.xml")).getPath();
//       2. Jsoup解析文件，返回一个document文档对象
        Document doc = Jsoup.parse(new File(filePath), "utf-8");
//        3. 根据标签名获取节点，返回的是一个 继承arraylist集合 对象
        Elements element = doc.getElementsByTag("name");
        System.out.println(element.size());  // 打印长度可以看到有两个name节点
//        text() 返回获取节点文本
        System.out.println(element.get(0).text());  // 第一个name
        System.out.println(element.get(1).text());  // 第二个name
    }
}
```



#### parse方法

- parse(File in, String charsetName)：解析XML或html本地文件
- parse(String html)：解析XML或html的字符串
- parse(URL url, in timeoutMillis)：通过网络路径解析XML或html文档



#### Document对象

- 获取元素对象
  + getElementById(String id)：根据ID属性值获取元素
  + getElementsByTag(String tagName)：根据标签名获取元素
  + getElementsByAttribute(String key)：根据属性名称获取元素
  + getElementsByattributeValue(String key, String value)：根据对应的属性名和属性值获取元素
  + select(String cssQuery)：CSS选择器(快速选择器)

> 除了ById 返回的是单个 Elements，其它都是返回 元素集合Elements



#### Elements对象

- 获取属性值
  + String attr(String key)：根据属性名获取属性值
- 获取文本内容
  + String text()：获取纯文本，不包含标签
  + String html()：获取子标签和文本
- Nodes 节点对象



### JsoupXpath解析器

JsoupXpath 是一款纯Java开发的使用xpath解析提取html或XML数据的解析器

新版Jar包下载地址：https://search.maven.org/search?q=g:cn.wanghaomiao%20AND%20a:JsoupXpath

官网：http://jsoupxpath.wanghaomiao.cn/

**新版本包已弃用JsoupXpath-0.3.2的对象和方法了**



#### 快速开始

环境：JsoupXpath-0.3.2.jar

1. jsoup的document不支持Xpath所有要创建一个jsoupXpath的document对象
   语法：`JXDocument jxDocument = new JXDocument(jsoup的document)`
2. `jxDocument.selN("xpath语法")`

```java
import cn.wanghaomiao.xpath.exception.XpathSyntaxErrorException;
import cn.wanghaomiao.xpath.model.JXNode;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.Test;
import cn.wanghaomiao.xpath.model.JXDocument;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Objects;

public class xpathDemo1 {
    String filePath = Objects.requireNonNull(xpathDemo1.class.getClassLoader().getResource("students.xml")).getPath();
    Document doc = Jsoup.parse(new File(filePath), "utf-8");

    @Test
    public void test1() throws XpathSyntaxErrorException {
        JXDocument jxDocument = new JXDocument(doc);  // 转化对象

        List<JXNode> jxNode = jxDocument.selN("//student");  // 获取student元素集合
        // getElement()转为jsoup节点，然后就可以调用jsoup的方法和属性了
        System.out.println(jxNode.get(0).getElement().text());
        System.out.println(jxNode.get(1).getElement().text());
    }
}
```

- 例：获取student元素number属性值为s002的元素

```java
@Test
public void test2() throws XpathSyntaxErrorException {
    JXDocument jxDocument = new JXDocument(doc);

    List<JXNode> jxnode = jxDocument.selN("//student[@number='s002']");
    System.out.println(jxnode.get(0).getElement().text());
}
```



#### Xpath语法

https://www.runoob.com/xpath/xpath-tutorial.html