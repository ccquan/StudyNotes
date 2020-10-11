# Java基础

## lambda

> Lambda 表达式，也可称为闭包，它是推动 Java 8 发布的最重要新特性。
>
> Lambda 允许把函数作为一个方法的参数（函数作为参数传递进方法中）。
>
> 使用 Lambda 表达式可以使代码变的更加简洁紧凑。

### 语法

```
([数据类型1 参数名1, 数据类型2 参数名2]) ->  {表达式主体}
```



### 案例

- 例子：简单lambda表达式与匿名类

```java
interface Animal {
    void show();
}
public class lambda表达式1 {
    public static void main(String[] args) {
//        匿名类
        myShow(new Animal() {
            @Override
            public void show() {
                System.out.println("你好，我是匿名类");
            }
        });
//        lambda表达式
        myShow(() -> {
            System.out.println("你好，我是lambda表达式");
        });
    }

    public static void myShow(Animal animal) {
        animal.show();
    }
}
```

- 带参数的lambda表达式

如果只有一行那么可以不用大括号和return关键字

```java
interface MyFunction {
    int sum(int x, int y);
}
public class lambda表达式2 {
    public static void main(String[] args) {
        test(2, 5, (int x, int y) -> x + y);
        test(2, 5, (int x, int y) -> {
            return x + y;
        });
    }

    public static void test(int x, int y, MyFunction myFunction) {
        System.out.println(myFunction.sum(x, y));
    }
}
```



### 方法引用和构造器引用

- 引用类静态方法  `类::方法`

```java
import java.lang.Integer;

interface MyFunction {
    int sum(int x, int y);
}
public class lambda表达式2 {
    public static void main(String[] args) {
//        lambda原方法的方式
        test(2, 5, (int x, int y) -> {
            return Integer.sum(x, y);
        });
//        使用方法引用的方式
        test(2, 5, Integer::sum);
    }

    public static void test(int x, int y, MyFunction myFunction) {
        System.out.println(myFunction.sum(x, y));
    }
}
```

- 引用对象名引用方法 `对象名::方法`

```java
interface MyFunction3 {
    String up(String str);
}
class StringUtil {
    public String toUpperCase(String str) {
        return str.toUpperCase();
    }
}
public class lambda表达式3 {
    public static void main(String[] args) {
        StringUtil util = new StringUtil();
//        lambda原方法的方式
        test("Hello", (String str) -> {
            return util.toUpperCase(str);
        });
//        使用方法引用的方式
        test("hello", util::toUpperCase);
    }

    public static void test(String str, MyFunction3 myFunction3) {
        System.out.println(myFunction3.up(str));
    }
}
```

- 构造器引用方法  `类::new`

```java
interface MyFunction4 {
    public Person buildPerson(String name);
}
class Person {
    private String name;
    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
public class lambda表达式4 {
    public static void main(String[] args) {
//        lambda原方法的方式
        test("李明", (String name) -> {
            return new Person(name);
        });
//        使用方法引用的方式
        test("李明", Person::new);
    }

    public static void test(String str, MyFunction4 myFunction4) {
        Person person = myFunction4.buildPerson(str);
        System.out.println(person.getName());
    }
}
```



## 常用类

### String

- 创建String字符串

```java
public class Example01 {
	public static void main(String[] args) {
//		第一种创建字符串
		String str1 = new String();
		System.out.println(str1 + "aa");
		
//		第二种创建字符串
		String str2 = new String("abcd");
		System.out.println(str2);
		
//		第三种创建字符串
		char[] charArray = new char[] {'A', 'B', 'C', 'D'};
		String str3 = new String(charArray);
		System.out.println(str3);
	}
}
```

- 常用方法

| 函数                                   | 说明                       |
| -------------------------------------- | -------------------------- |
| indexOf(char ch)                       | 查找ch第一次出现的下标     |
| lastIndexOf(char ch)                   | 查找ch最后一次出现的下标   |
| char charAt(int pos)                   | 查找下标pos的字符          |
| boolean contains(String subString)     | 查看是否包含子串           |
| String replace(String old, String new) | 将old的子串替换成new的子串 |
| String[] split(String reg)             | 分割字符串(reg可以是正则)  |
| String trim()                          | 去除首尾的空格             |



### StringBuffer

> StringBuffer 是可以改变的，String类是final类型的，当添加或者删除时会生成一个新的对象，而StringBuffer可以解决这个问题

StringBuffer拥有String类的方法

- 常用方法

| 函数                                                 | 说明                        |
| ---------------------------------------------------- | --------------------------- |
| StringBuffer append(char ch)                         | 添加ch到末尾                |
| StringBuffer insert(int offset, String str)          | 在offset位置插入str子串     |
| StringBuffer delete(int start, int end)              | 删除start到end的字符        |
| StringBuffer reverse()                               | 反转字符串                  |
| StringBuffer replace(int start, int end, String srt) | 将start到end的字符替换成str |

StringBuilder于StringBuffer功能相似，但StringBuilder是非线程安全的，所有效率较高。



### System

- 常用方法

| 函数                                  | 说明                                        |
| ------------------------------------- | ------------------------------------------- |
| static void exit(int status)          | 结束程序，status标识结束状态码，非0表示异常 |
| static void gc()                      | 运行垃圾回收器，并对垃圾进行回收            |
| static long currentTimeMillis()       | 返回以毫秒为单位的当前时间                  |
| static Porperties getProperties()     | 返回当前系统属性                            |
| static String getProperty(String key) | 返回指定键的系统属性                        |

- currentTimeMillis() 练习

```java
long start = System.currentTimeMillis();
long a = 1;
for (int i = 0; i < 10000000; i++) {
    a += i;
}
long end = System.currentTimeMillis();
System.out.println(start - end);
```

- 获取系统属性

```java
 Properties properties = System.getProperties();
// 遍历系统属性的值
for (String key : properties.stringPropertyNames()) {
    System.out.println(key + "====" + System.getProperty(key));
}

// 获取指定属性
String osName = System.getProperty("os.name");
System.out.println(osName);
```

- arraycopy方法

语法：

```
arraycopy(Object src, int srcPos, Object dest, int destPos, int length)
```

- src：源数组
- srcPos：源数组拷贝元素的起始位置

- dest：目标数组
- destPos：目标数组拷贝元素的起始位置
- length：拷贝的个数



- 例：将src的3, 4, 5替换到dest去

```java
int[] src = {1, 2, 3, 4, 5, 6};
int[] dest = {10, 20, 30, 40, 50, 60};

System.arraycopy(src, 2, dest, 2, 3);
for (int i = 0; i < dest.length; i++) {
    System.out.println(dest[i]);
}
```



### Runtime

- 例：获取当前计算机系统信息

```java
Runtime runtime = Runtime.getRuntime();
System.out.println("处理器的个数：" + runtime.availableProcessors());
System.out.println("空闲内存大小：" + runtime.freeMemory() / 1024 / 1024 + "M");
System.out.println("最大可用内存大小：" + runtime.maxMemory() / 1024 / 1024 + "M");
```

- exec() 方法：该方法用于执行一个dos命令

```java
Runtime runtime = Runtime.getRuntime();
Process cmd = runtime.exec("net user");
InputStream is = cmd.getInputStream();
InputStreamReader isr = new InputStreamReader(is);
//用缓冲器读行    
BufferedReader br=new BufferedReader(isr);
String line=null;
//直到读完为止    
while((line=br.readLine())!=null)
{
    System.out.println(line);
}
```

- 例：用dos命令打开记事本，3秒后自动关闭

```java
Runtime runtime = Runtime.getRuntime();
Process notepad = runtime.exec("notepad.exe");
Thread.sleep(3000);  // 暂停3秒
notepad.destroy();
```

