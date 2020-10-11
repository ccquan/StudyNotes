# PHP进阶

## 面向对象

### 语法

```php
<?php

class 类名
{
    private $id;
    private $name;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }
}
```



### 权限修饰符

public：范围：类外、本类、子类

private：范围：本类

protected：范围：本类、子类



### 实例化

```php
$变量名 = new 类名();
```

- 设置属性

```php
$变量名->setId(2);
```

- 获取属性

```php
echo $变量名->getId();
```



### 属性

- 添加属性，动态语言可以使用 `实例->属性名` 给自己添加属性

```php
$hello->age = 3;
```

- 删除属性

```php
unset($hello->age);
```



### 方法

- `.` 号拼凑字符串

```php
class tools {
    public function com($name, $age) {
        return $name . '的岁数是：' . $age;
    }
}
```

- 模板字符串

```php
class tools {
    public function com($name, $age) {
        return "{$name}的岁数是：{$age}";
    }
}
```



### 类常量

- const 局部常量

  - 建议全大写
  - const定义的常量必须要赋值
  - 常量的值，一定是一个定值
  - 常量没有权限修饰符

- 访问

  `类名::常量名`

```php
class tools {
    const MYCONST = '一叫一回肠一断，三春三月忆三巴。';
}

echo "myConst:" . tools::MYCONST;
```



### 构造函数

```php
class tools {
    public function __construct($text) {
        echo $text;
    }

}

$tools = new tools('一叫一回肠一断，三春三月忆三巴。');
```



### 析构方法

对象销毁前自动调用的方法

- 析构方法不带任何参数
- 作用：垃圾回收工作，例如端口MySQL的连接

```php
class tools {
    public function __destruct() {
        echo "销毁了/(ㄒoㄒ)/~~";
    }
}

$tools = new tools('一叫一回肠一断，三春三月忆三巴。');
```



### 对象销毁

- 网页加载完成时
- 使用unset函数时



### 静态

- 静态属性

定义：`public static $变量名 = 值`

访问：`类名::$变量名`

```php
class MyStatic {
    public static $PV = 0;
}
MyStatic::$PV += 1;
echo MyStatic::$PV;
```

- 静态方法

```php
class MyStatic {
    public static function getSum($v1, $v2) {
        return $v1 + $v2;
    }
}
echo MyStatic::getSum(2, 5);
```



### self

- $this 是当前对象的指针，self是当前类的指针
- $this 用来调用对象的属性、方法
- self 用来调用类的常量、静态属性、静态方法
- $this 只能在成员方法中使用
- self 可以在成员方法、静态方法中使用

```php
class MyStatic {
    public static $PV = 0;

    public static function selfTest($addVal) {
        return self::$PV + $addVal;
    }
}

echo MyStatic::selfTest(3);
```



### var_dump

var_dump打印对象是，只打印出了成员属性，因为成员属性在栈内存区，而

- 静态代码 、常量 在静态空间区
- 方法 在代码空间区



### 值传递和引用传递

值传递：变量、数组

引用传递：对象、资源

地址符 `&` ，意思跟C语言一样 



### 类的封装性

类的三大特性：封装性、继承性、多态性

封装性：权限修饰，属性基本是私有，通过公共的方法赋值和读取属性



### 案例：连接数据库

```php
<?php

class DbConnect {
    private $db_host;
    private $db_user;
    private $db_pwd;
    private $db_name;  // 数据库名
    private $db_charset;
    private $link;  // 连接对象

    public function __construct($config = array()) {
        $this->db_host = $config['db_host'];
        $this->db_user = $config['db_user'];
        $this->db_pwd = $config['db_pwd'];
        $this->db_name = $config['db_name'];
        $this->db_charset = $config['db_charset'];
        $this->connectDb();
        $this->selectDb();
        $this->setCharset();

    }

    public function connectDb() {
        if (!$this->link = mysqli_connect($this->db_host, $this->db_user, $this->db_pwd)) {
            echo "连接失败";
            die();
        }
    }

    public function selectDb() {
        if (!mysqli_select_db($this->link, $this->db_name)) {
            echo "选择数据库失败";
            die();
        }
    }

    public function setCharset() {
        if (!mysqli_set_charset($this->link, $this->db_charset)) {
            echo "设置字符集失败";
            die();
        }
    }

    public function __destruct() {
        mysqli_close($this->link);
    }
}
//实例
$arr = array(
    'db_host' => '127.0.0.1',
    'db_user' => 'root',
    'db_pwd' => 'root',
    'db_name' => 'runoob',
    'db_charset' => 'utf8'
);
$dbConnect = new DbConnect($arr);
var_dump($dbConnect);
```



### 类的继承性

`extends` 关键字表继承

```php
<?php

class Human {
    protected $name;
    protected $age;
}

class Chinese extends Human{

}
```



### parent 关键字

之前的`self` 表当前类，而现在`parent ` 表父类

可以调用：类常量、静态属性、静态方法、成员方法

```php
<?php

class human {
    const commonness = ['吃饭', '睡觉'];
    public function repeater($text) {
        echo $text . '我是个无情的复读机';
    }
}

class chen extends human{
    public function test() {
        var_dump(parent::commonness);
        parent::repeater('咕咕咕咕');
    }
}

$chen = new chen();
$chen->test();
```



### 类的多态

多条主要值：方法重载、方法重写

- 方法重载：同一个类，多个同名不同参数的方法，PHP不支持方法重载
- 方法重写：子类继承父类，然后子类重写方法



#### 方法重写的要求

- 权限要比父类高（夫public子public，夫protected子protected、public，夫private子不能）
- 参数要同父类一样
- 方法类型要同父类一样
- 父类静态的也要一样静态

**重写构造方法，没有限制参数的要求**



### final

- final修饰类就是最终类，该类只能实例化但不能被继承
- final修饰方法就是最终方法，该方法可以被继承但不能重写

**最终类和最终方法不能同时在一起**

```php
final class EndTime {
 // 代码体   
}
```



### 抽象类和抽象方法

- abstract 修饰的类就是抽象类
- abstract 修饰的方法就是抽象方法

```php
<?php

abstract class Human {
    abstract public function print();
}

class quan extends Human {
    public function print()
    {
        echo "I'm Quan";
    }
}

$quan = new quan();
$quan->print();
```



### 接口

- 接口权限必须是public
- 默认是抽象的
- 可以是成员方法，也可以是静态方法
- 可以定义常量，但常量不能重写
- 类可以实现多个接口
- 接口可以继承接口

```php
<?php

interface myInterface {
    public function getName();
    public function setName();
}

class myClass implements myInterface {

    public function getName()
    {
        // TODO: Implement getName() method.
    }

    public function setName()
    {
        // TODO: Implement setName() method.
    }
}
```



### 类的命名规范

- 类要以`.class.php` 结尾
- 类文件名要于类名一致



### 类的自动加载

PHP7.0以下：`__autoload($className)`

PHP7.0以上：`spl_autoload_register($className)`

- 第一种 用public目录的

public

|--xxx.class.php

```php
<?php

spl_autoload_register("fun1");
function fun1($className) {
    $fileName = "./public/$className.class.php";
    echo $fileName;
    if (file_exists($fileName)) require_once ($fileName);
}

$hello = new Hello();
$hello->setId(2);
echo $hello->getId();

var_dump($hello);
```

- 第二种 用lib目录的

lib

|--xxx.cla.php

```php
<?php

spl_autoload_register("fun2");
function fun2($className) {
    $fileName = "./lib/$className.cla.php";
    if (file_exists($fileName)) require_once ($fileName);
}
$libHello = new libHello();
$libHello->setId(2);

var_dump($libHello);
```



### 克隆对象

`clone` 关键字

```php
<?php
include "Tools.php";
$tools1 = new Tools();
$tools2 = clone $tools1;

var_dump($tools1);
var_dump($tools2);
```



### 遍历对象

```php
foreach (数组或对象 as 下标或属性 => 值) {}
```

```php
class ForTest {
    public $id = 3;
    public $name = 'Tom';
}

$ForTest = new ForTest();
foreach ($ForTest as $ind => $val) {
    echo $ind . '==' . $val;
}
```



### 魔术方法

魔术方法都是以`__` 开头

#### __toString

- `__toString` 将对象转成字符串



#### __invoke

- `__invoke` 将对象当成函数调用

```php
class forTest {
    public function __invoke()
    {
        echo '调用调用';
    }
}

$forTest = new forTest();
$forTest();  // 调用
```



#### __get

- 访问不可访问的属性时，`__get()` 魔术方法会自动调用

```php
class Student {
    private $name = 'tom';  // 私有属性
    public function __get($n) {
        return $this->$n;
    }
}
$obj = new Student;
echo $obj->name;
```



#### __set

- 给不可访问的属性赋值时，`__set()` 魔术方法自动调用

```php
class Student {
    private $name = 'tom';  // 私有属性
    public function __set($n, $v) {
        $this->$n = $v;
    }
}
$obj = new Student;
$obj->name = 'Tim';
```



#### __isset

- 当对不可访问属性调用 isset() 或 empty() 时，__isset() 会被调用

```php
class Student {
    private $name = 'tom';  // 私有属性
    public function __isset($n) {
        return isset($this->$n);
    }
}
$obj = new Student;
// 判断私有属性存不存在
if (isset($obj->name)) {
    echo '存在';
} else {
    echo '不存在';
}
```



#### __call

- 当访问不存在或不可访问的方法时，魔术方法`__call` 自动调用

```php
class Student {
    public function __call($func, $args) {
        
    }
}
$obj = new Student;
$obj -> showinfo('Tom', 24);
```



#### __callStatic

- 访问不存在或不可访问的静态方法

```php
<?php

class CallStatic {
    public static function __callStatic($func, $args) {
        echo '方法名：' . $func;
        var_dump($args);
    }
}

CallStatic::bucunzai('参数1', '参数2');
```



## 面向对象的设计模式

> ​    设计模式（Design pattern）是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了可重用代码、让代码更容易被他人理解、保证代码可靠性。

- 单例设计模式：一个类只能创建一个实例对象，不管用什么办法都无法创建第2个对象；

- 工厂设计模式：生产不同类对象的工厂；

- 策略设计模式：定义一组算法，将每个算法都封装起来，并且使它们之间可以互换。
- 观察者设计模式：定义对象间一种一对多的依赖关系，使得每当一个对象改变状态，则所有依赖于它的对象都会得到通知并被自动更新。



### 单例设计模式（三私一公）

- 一个类永远只能创建一个对象，不管任何方法都无法创建第2个对象。该对象大家共享
- 一私：私有的静态的保存对象的属性
- 一私：私有的构造方法，阻止类外new对象
- 一私：私有的克隆方法，阻止类外clone对象
- 一公：公共的静态的创建对象的方法

```php
<?php
class singleton {
    private $id;
    private static $obj = null;

    private function __construct() { }
    private function __clone() { }

    public static function init() {
        if (!self::$obj instanceof self) {
            self::$obj = new self();
        }
        return self::$obj;
    }
}

$singleton = singleton::init();
$singleton2 = singleton::init();
if ($singleton === $singleton2) {
    echo '相等';
}
```



### 工厂设计模式

- 根据传递不同的类名参数，返回不同类的对象
- 工厂模式，就是生产各种的不同类的对象
- 工厂模式，改变了在类外使用new关键字创建对象的方式，改成了在工厂中创建类的对象
- 在类的外部我们无法控制类的行为，但在类内部自己可以控制类的行为

libs/xxx.class.php

```php
<?php
class animation {
    public function favor() {
        echo "我爱xxx";
    }
}
```

libs/facotry.class.php

```php
<?php

class factory {
    public static function init($className)
    {
        switch ($className) {
            case 'animation': {
                return new animation();
            }
            case 'comic': {
                return new comic();
            }
            case 'game': {
                return new game();
            }
            default: {
                return null;
            }
        }
    }
}
```

app.php

```php
<?php

spl_autoload_register(function ($className) {
    if (!file_exists($className)) {
        require_once("./libs/$className.class.php");
    }
});
//创建漫画类
$comic = factory::init('comic');
$comic->favor();
//创建游戏类
$game = factory::init('game');
$game->favor();
```



## 序列化

```php
string serialize(mixed $value);
```

### 变量序列化

- 序列化是将变量转换为可保存或传输的字符串的过程
- 反序列化就是在适当的时候把这个字符串再转化成原来的变量使用
- 这两个过程结合起来，可以轻松地存储和传输数据，使程序更具维护性
- 序列化有利于存储或传递PHP的值，同时不丢失其类型和结构

- 例：数组变量序列化

```php
<?php

$dbArr = array(
    'db_host' => 'localhost',
    'db_user' => 'root',
    'db_pwd' => 'root',
    'db_name' => 'runoob'
);

$serialize = serialize($dbArr);
echo $serialize;
```

- 例：对象序列化

```php
class TestSerialize {
    private $db_host;
    private $db_user;
    private $db_pwd;
    private $db_name;
}

$testSerialize = new TestSerialize();
$serialize1 = serialize($testSerialize);
echo $serialize1;
```

**任何类型都可以序列化，除了资源**



### 反序列化

- 描述：从已存储的表示中创建PHP的值
- 语法：`mixed unserialize(string $str)`

- 说明：对单一的已序列化的变量进行操作，将其转换回PHP的值

```php
<?php

class TestSerialize {
    private $db_host;
    private $db_user;
    private $db_pwd;
    private $db_name;

    public function getDbHost()
    {
        return $this->db_host;
    }

    public function setDbHost($db_host): void
    {
        $this->db_host = $db_host;
    }
}
// 序列化
$testSerialize = new TestSerialize();
$serialize1 = serialize($testSerialize);
echo $serialize1;
// 反序列化
$MyUnSerialize = unserialize($serialize1);
$MyUnSerialize->setDbHost('localhost');
var_dump($MyUnSerialize);
```



### __sleep

`__sleep` 是再序列化时自动调用的函数，参数是返回一个数组，内容是选择需要的属性

```php
<?php

class TestSerialize {
    private $db_host;
    private $db_user;
    private $db_pwd;
    private $db_name;

    public function getDbHost()
    {
        return $this->db_host;
    }

    public function setDbHost($db_host): void
    {
        $this->db_host = $db_host;
    }

    public function __sleep()
    {
        return array('db_host', 'db_name');
    }
}

$testSerialize = new TestSerialize();
$serialize1 = serialize($testSerialize);
echo $serialize1;
```

可以看到只打印出里db_host属性和db_name属性



### __wakeup

`__wakeup` 是反序列化时自动调用的函数

```php
<?php

class TestSerialize {
    private $db_host;
    private $db_user;
    private $db_pwd;
    private $db_name;

    public function getDbHost()
    {
        return $this->db_host;
    }

    public function setDbHost($db_host): void
    {
        $this->db_host = $db_host;
    }

    public function __wakeup()
    {
        $this->setDbHost('127.0.0.1');
    }
}
$testSerialize = new TestSerialize();
$serialize1 = serialize($testSerialize);

$MyUnSerialize = unserialize($serialize1);
var_dump($MyUnSerialize);
```

可以看到，`db_host`属性的值已经变成`127.0.0.1`



### 静态延时绑定

> 自PHP5.3.0起，PHP增加了一个叫做后期静态绑定的功能，用于在继承范围内引用静态调用的类。“后期绑定”的意思是说，static：不再被解析为定义当前方法所在的类，而是在实际运行时计算的。也可以称之为“静态绑定”，因为它可以用于（但不限于）静态方法的调用。
> 我们需要一个在调用执行时才确定当前类的一个特征，就是说将static关键字对某个类的绑定推迟到调用执行时，就叫静态延迟绑定！

语法：static:：静态属性，静态方法，成员方法，类常量



- 只有一个类的时候，都表示当前类

```php
<?php

class staticTest {
    const name = '黎明';
    public function showInfo() {
        echo self::name;
        echo static::name;
    }
}

$staticTest = new staticTest();
$staticTest->showInfo();
```

- 继承类的时候，`self` 表示代码当前类，`static` 表示最终执行的类

```php
<?php

class staticTest {
    const name = '黎明';
    public function showInfo() {
        echo self::name;
        echo static::name;
    }
}

class Son extends staticTest {
    const name = '黄昏';
}

$Son = new Son();
$Son->showInfo();
```



### 命名空间

有两个**相同文件名**的文件时要怎么解决？把它们放到不同的目录下，命名空间也是如此

功能：

- 解决同名
- 分类管理

语法：

```php
namespace 命名空间名
```

**命名空间必须是第一条语句**

```php
<?php
namespace myname;

//1. 定义一个类
class Student {
    private $id;
    private $name;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id): void
    {
        $this->id = $id;
    }
}

//2. 定义一个方法
function echoName($name) {
    echo $name;
}

//3. 定义一个常量
const myConst = '对的，我是一个常量';

//4. 定义一个变量
$myVar = '对的，我是一个变量';
```

使用：

```php
<?php
include_once "myname.php";

$student = new myname\Student();

myname\echoName('小明');

echo myname\myConst;

echo $myVar;
```



### 子命名空间

- 用`\` 来分割子命名空间，例如：`$obj = new Home\Controller\Student()`

```php
<?php

namespace Home\Controller;

class Student {
//    code body
}
```

使用：

```php
<?php
include_once "sonMyName.php";

$student = new Home\Controller\Student();
var_dump($student);
```



### 导入命名空间元素后取别名

```php
use Home\Controller\Student as HoStudent;
```



## PDO

PHP data object

- pdo 是一个第三方的类，默认已经集成到PHP中了
- pdo跟jdbc类似，可以解决不同数据库的问题，比如 `myqli_*`的函数、`oci_*` 和 `mssql_*`的函数



### 开启PDO

​    打开`php.ini` 然后把`;extension=pdo_mysql` 的`;`号注释去掉，当然，其它数据库的话就去掉对应的`pdo_xxx` ，PHP默认是去掉MySQL的`;`号了的



### 创建PDO对象

语法:

```php
PDO::__construct(string $dsn[, string $username, $string $password])
```

$dsn:

```php
$dsn = 'mysql:host=127.0.0.1;post=3306;dbname=itcast;charset=utf8';
```

- 例如

```php
$dsn = 'mysql:host=localhost;port=3306;dbname=runoob;charset=utf8';
$PDO = new PDO($dsn, 'root', 'root');

var_dump($PDO);
```



### 常用方法

#### exec方法

- 执行一条SQL语句，并返回受影响的行数

```php
<?php

$dsn = 'mysql:host=localhost;port=3306;dbname=runoob;charset=utf8';
$PDO = new PDO($dsn, 'root', 'root');

$exec = $PDO->exec("insert into user values(default, 'TTT', 'TTT888.', null)");
echo $exec;
```



#### query方法

- 执行一条SQL语句，并返回结果集

```php
<?php

$dsn = 'mysql:host=localhost;port=3306;dbname=runoob;charset=utf8';
$PDO = new PDO($dsn, 'root', 'root');
$PDOStatement = $PDO->query("select * from user");
foreach ($PDOStatement as $row) {
    print $row['id'] ;
    print $row['username'] ;
    print $row['password'] ;
    print $row['birthday'] . "\t";
}
```



#### lastInsertId方法

- 获取最后插入成功的记录的id

```php
<?php

$dsn = 'mysql:host=localhost;port=3306;dbname=runoob;charset=utf8';
$PDO = new PDO($dsn, 'root', 'root');

$exec = $PDO->exec("insert into user values(default, 'TTT', 'TTT888.', null)");
$lastInsertId = $PDO->lastInsertId();
echo $lastInsertId;
```



#### setAttribute方法

- 该方法可以设置一些数据库对象配置
- 例：设置返回对象为下标

```php
<?php

$dsn = 'mysql:host=localhost;port=3306;dbname=runoob;charset=utf8';
$PDO = new PDO($dsn, 'root', 'root');
$PDO->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_NUM);

$PDOStatement = $PDO->query("select * from user");
foreach ($PDOStatement as $row) {
    var_dump($row);
}
```

输出：

```php
1array(4) {
  [0]=>
  string(1) "1"
  [1]=>
  string(4) "lucy"
  [2]=>
  string(3) "123"
  [3]=>
  string(10) "2018-12-12"
}
```

默认(PDO::FETCH_BOTH)：

```php
1array(8) {
  ["id"]=>
  string(1) "1"
  [0]=>
  string(1) "1"
  ["username"]=>
  string(4) "lucy"
  [1]=>
  string(4) "lucy"
  ["password"]=>
  string(3) "123"
  [2]=>
  string(3) "123"
  ["birthday"]=>
  string(10) "2018-12-12"
  [3]=>
  string(10) "2018-12-12"
}
```



#### Statement::fetch方法

- 例如：一个一个获取

```php
<?php

$dsn = 'mysql:host=localhost;port=3306;dbname=runoob;charset=utf8';
$PDO = new PDO($dsn, 'root', 'root');

$PDOStatement = $PDO->query("select * from user");

print_r($PDOStatement->fetch());
print_r($PDOStatement->fetch(PDO::FETCH_NUM));
```

- 例如：循环获取

```php
while ($PDOStatement->fetch()) {
    print_r($PDOStatement->fetch());
}
```



#### rowCount方法

- 获取总行数

```php
<?php

$dsn = 'mysql:host=localhost;port=3306;dbname=runoob;charset=utf8';
$PDO = new PDO($dsn, 'root', 'root');

echo "<br><br> <h2>当前表有{$PDOStatement->rowCount()}条记录</h2>";
```



### PDO 错误处理

- 静默模式：错误发生后，不会主动报错
- 警告模式：错误发生后，通过PHP标准来报告错误
- 异常模式：错误发生后，抛出异常，需要扑捉和处理

语法：

```php
PDO::setAtrribute()
```

