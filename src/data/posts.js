export const posts = [
  
  {
    id: 6,
    title: 'Java System 类详解',
    date: '2023-10-25',
    summary: '详细介绍Java标准库中的System类及其主要功能。',
    content: `<h2>概述</h2>
<p><code>System</code> 类是 Java 标准库中的一个核心类，位于 <code>java.lang</code> 包中。它提供了与系统相关的各种方法和属性，例如标准输入输出流、系统属性、环境变量、垃圾回收等功能。</p>

<h2>主要功能</h2>
<ol>
  <li><strong>标准输入输出流</strong>：
    <ul>
      <li><code>System.out</code>：标准输出流，通常用于打印信息到控制台。</li>
      <li><code>System.in</code>：标准输入流，用于从控制台读取输入。</li>
      <li><code>System.err</code>：标准错误输出流，用于输出错误信息。</li>
    </ul>
  </li>
  <li><strong>系统属性</strong>：
    <ul>
      <li><code>System.getProperty(String key)</code>：获取指定的系统属性值。</li>
      <li><code>System.setProperty(String key, String value)</code>：设置系统属性。</li>
    </ul>
  </li>
  <li><strong>环境变量</strong>：
    <ul>
      <li><code>System.getenv(String name)</code>：获取指定的环境变量值。</li>
      <li><code>System.getenv()</code>：获取所有环境变量的映射。</li>
    </ul>
  </li>
  <li><strong>垃圾回收</strong>：
    <ul>
      <li><code>System.gc()</code>：建议 JVM 进行垃圾回收，但不保证立即执行。</li>
    </ul>
  </li>
  <li><strong>系统时间</strong>：
    <ul>
      <li><code>System.currentTimeMillis()</code>：返回当前时间的毫秒数。</li>
      <li><code>System.nanoTime()</code>：返回当前时间的高精度纳秒数。</li>
    </ul>
  </li>
  <li><strong>程序退出</strong>：
    <ul>
      <li><code>System.exit(int status)</code>：终止当前运行的 Java 虚拟机，status 为退出状态码。</li>
    </ul>
  </li>
</ol>

<h2>代码示例</h2>
<pre><code>public class SystemExample {
  public static void main(String[] args) {
    // 获取当前时间
    long currentTime = System.currentTimeMillis();
    System.out.println("当前时间（毫秒）：" + currentTime);

    // 获取系统属性
    String javaVersion = System.getProperty("java.version");
    System.out.println("Java 版本：" + javaVersion);

    // 获取环境变量
    String path = System.getenv("PATH");
    System.out.println("PATH 环境变量：" + path);

    // 建议垃圾回收
    System.gc();

    // 程序退出
    // System.exit(0); // 正常退出
  }
}</code></pre>

<h2>注意事项</h2>
<ul>
  <li><code>System</code> 类是 final 的，不能被继承。</li>
  <li>它的构造方法是私有的，不能被实例化。</li>
  <li>使用 <code>System.exit()</code> 时要谨慎，因为它会立即终止程序，可能会导致资源未被正确释放。</li>
</ul>

<h2>源码位置</h2>
<p>在 JDK 源码中，<code>System</code> 类的定义位于 <code>java.base/java/lang/System.java</code> 文件中。如果您想深入了解其实现细节，可以查看该文件。</p>

<h2>Native 方法</h2>
<p><code>System</code> 类中包含了一些 <code>native</code> 方法，这些方法是用 C 或 C++ 等本地语言实现的，直接与底层操作系统交互。以下是一些重要的 <code>native</code> 方法：</p>
<ul>
  <li><code>currentTimeMillis()</code>：返回当前时间的毫秒数，是一个 <code>native</code> 方法，直接调用系统函数获取时间。</li>
  <li><code>nanoTime()</code>：返回当前时间的高精度纳秒数，也是一个 <code>native</code> 方法，用于性能测量。</li>
  <li><code>arraycopy(Object src, int srcPos, Object dest, int destPos, int length)</code>：用于高效地复制数组内容，是一个 <code>native</code> 方法，性能比 Java 循环复制要高。</li>
</ul>
<p>这些 <code>native</code> 方法使得 <code>System</code> 类能够直接访问底层系统资源，提供高效的操作，但也意味着它们的实现依赖于具体的操作系统和 JVM 实现。</p>`,
    category: '技术',
    tags: ['Java', '系统编程', '核心技术']
  },
  {
    id: 7,
    title: 'String 类说明',
    date: '2023-10-29',
    summary: '详细介绍Java标准库中的String类及其主要功能。',
    content: `<h2>概述</h2>
<p><code>String</code> 类是 Java 标准库中的一个核心类，位于 <code>java.lang</code> 包中。它用于表示字符串，即一组字符序列。<code>String</code> 类在 Java 中是最常用和基础的类之一，几乎所有的 Java 程序都会涉及到字符串操作。<code>String</code> 类具有不可变性（immutability），这意味着一旦创建了一个 <code>String</code> 对象，其内容就不能被修改。</p>

<h2>主要特性</h2>
<ol>
  <li><strong>不可变性</strong>：
    <ul>
      <li><code>String</code> 对象的内容在创建后不能被更改。任何对字符串的修改操作（如拼接、替换）都会创建一个新的 <code>String</code> 对象，而不是修改原来的对象。</li>
      <li>这种设计有助于提高字符串的安全性和线程安全性，同时也便于字符串池的使用。</li>
    </ul>
  </li>
  <li><strong>字符串池（String Pool）</strong>：
    <ul>
      <li>Java 维护一个字符串池，用于存储常用的字符串对象，以节省内存。当使用字面量创建字符串时（如 <code>String s = "hello";</code>），JVM 会检查字符串池中是否已存在相同内容的字符串，如果存在，则返回该对象的引用；如果不存在，则在池中创建新对象。</li>
      <li>使用 <code>new String("hello")</code> 创建字符串时，会在堆内存中创建一个新的对象，即使字符串池中已存在相同内容的字符串。</li>
      <li>可以通过 <code>intern()</code> 方法将字符串对象添加到字符串池中。</li>
    </ul>
  </li>
  <li><strong>实现接口</strong>：
    <ul>
      <li><code>String</code> 类实现了 <code>Serializable</code>、<code>Comparable&lt;String&gt;</code> 和 <code>CharSequence</code> 接口，支持序列化、比较和字符序列操作。</li>
    </ul>
  </li>
</ol>

<h2>构造方法</h2>
<p><code>String</code> 类提供了多种构造方法来创建字符串对象，以下是常用的几种：</p>
<ul>
  <li><code>String()</code>：创建一个空字符串。</li>
  <li><code>String(String original)</code>：通过另一个字符串创建新字符串。</li>
  <li><code>String(char[] value)</code>：通过字符数组创建字符串。</li>
  <li><code>String(byte[] bytes)</code>：通过字节数组创建字符串，使用平台默认字符集。</li>
  <li><code>String(byte[] bytes, String charsetName)</code>：通过字节数组和指定的字符集创建字符串。</li>
</ul>

<h2>常用方法</h2>
<p><code>String</code> 类提供了大量的方法用于字符串操作，以下是一些常用的方法：</p>
<ol>
  <li><strong>获取信息</strong>：
    <ul>
      <li><code>int length()</code>：返回字符串的长度。</li>
      <li><code>boolean isEmpty()</code>：检查字符串是否为空。</li>
      <li><code>char charAt(int index)</code>：获取指定索引处的字符。</li>
    </ul>
  </li>
  <li><strong>比较和搜索</strong>：
    <ul>
      <li><code>boolean equals(Object anObject)</code>：比较字符串内容是否相等。</li>
      <li><code>boolean equalsIgnoreCase(String anotherString)</code>：忽略大小写比较字符串内容。</li>
      <li><code>int compareTo(String anotherString)</code>：按字典顺序比较两个字符串。</li>
      <li><code>int indexOf(int ch)</code>：查找字符第一次出现的索引。</li>
      <li><code>int lastIndexOf(int ch)</code>：查找字符最后一次出现的索引。</li>
      <li><code>boolean contains(CharSequence s)</code>：检查字符串是否包含指定的子序列。</li>
      <li><code>boolean startsWith(String prefix)</code>：检查字符串是否以指定前缀开始。</li>
      <li><code>boolean endsWith(String suffix)</code>：检查字符串是否以指定后缀结束。</li>
    </ul>
  </li>
  <li><strong>修改和操作</strong>：
    <ul>
      <li><code>String substring(int beginIndex)</code>：从指定索引开始提取子字符串。</li>
      <li><code>String substring(int beginIndex, int endIndex)</code>：提取指定范围的子字符串。</li>
      <li><code>String replace(char oldChar, char newChar)</code>：替换字符串中出现的所有某个字符。</li>
      <li><code>String replaceAll(String regex, String replacement)</code>：使用正则表达式替换字符串中的匹配内容。</li>
      <li><code>String trim()</code>：去除字符串两端的空白字符。</li>
      <li><code>String toLowerCase()</code>：将字符串转换为小写。</li>
      <li><code>String toUpperCase()</code>：将字符串转换为大写。</li>
    </ul>
  </li>
  <li><strong>转换和分割</strong>：
    <ul>
      <li><code>char[] toCharArray()</code>：将字符串转换为字符数组。</li>
      <li><code>byte[] getBytes()</code>：将字符串转换为字节数组，使用平台默认字符集。</li>
      <li><code>String[] split(String regex)</code>：使用正则表达式分割字符串。</li>
    </ul>
  </li>
  <li><strong>其他</strong>：
    <ul>
      <li><code>String intern()</code>：将字符串添加到字符串池中，并返回池中的引用。</li>
      <li><code>String valueOf(Object obj)</code>：将对象转换为字符串表示。</li>
    </ul>
  </li>
</ol>

<h2>代码示例</h2>
<pre><code>public class StringExample {
    public static void main(String[] args) {
        // 创建字符串
        String str1 = "Hello, World!"; // 使用字符串字面量，进入字符串池
        String str2 = new String("Hello, World!"); // 在堆内存中创建新对象
        String str3 = str2.intern(); // 将 str2 添加到字符串池并返回池中引用

        // 检查字符串池效果
        System.out.println("str1 == str2: " + (str1 == str2)); // false，因为 str2 是堆中的新对象
        System.out.println("str1 == str3: " + (str1 == str3)); // true，因为 str3 是池中的引用
        System.out.println("str1.equals(str2): " + str1.equals(str2)); // true，内容相等

        // 常用方法示例
        System.out.println("长度: " + str1.length()); // 获取长度
        System.out.println("是否为空: " + str1.isEmpty()); // 检查是否为空
        System.out.println("索引 7 处的字符: " + str1.charAt(7)); // 获取指定字符
        System.out.println("子字符串: " + str1.substring(7)); // 提取子字符串
        System.out.println("是否包含 'World': " + str1.contains("World")); // 检查是否包含
        System.out.println("替换 'World' 为 'Java': " + str1.replace("World", "Java")); // 替换
        System.out.println("分割字符串: " + String.join(", ", str1.split(", "))); // 分割并重新连接

        // 不可变性示例
        String original = "Hello";
        String modified = original.concat(", World!"); // 拼接字符串，创建新对象
        System.out.println("原始字符串: " + original); // 原始字符串未变
        System.out.println("修改后字符串: " + modified); // 新字符串包含拼接结果
    }
}</code></pre>

<h2>注意事项</h2>
<ul>
  <li><strong>不可变性的影响</strong>：由于 <code>String</code> 是不可变的，频繁的字符串拼接操作（如使用 <code>+</code> 运算符或 <code>concat()</code> 方法）会创建多个中间对象，影响性能。在这种情况下，建议使用 <code>StringBuilder</code> 或 <code>StringBuffer</code> 类来构建字符串。</li>
  <li><strong>字符串池的使用</strong>：使用字符串字面量创建字符串可以利用字符串池节省内存，而使用 <code>new String()</code> 则会在堆内存中创建新对象，通常不推荐直接使用 <code>new String()</code>。</li>
  <li><strong>比较字符串</strong>：使用 <code>equals()</code> 方法比较字符串内容，而不是使用 <code>==</code> 运算符，因为 <code>==</code> 比较的是对象的引用地址。</li>
  <li><strong>编码问题</strong>：在将字符串转换为字节数组或从字节数组创建字符串时，注意字符编码问题，避免使用平台默认编码，建议显式指定编码（如 <code>UTF-8</code>）。</li>
</ul>

<h2>源码位置</h2>
<p>在 JDK 源码中，<code>String</code> 类的定义位于 <code>java.base/java/lang/String.java</code> 文件中。如果您想深入了解其实现细节（如字符串池的实现、内部字符数组存储等），可以查看该文件。</p>

<p>以上是对 <code>String</code> 类的详细介绍和使用示例，希望对您有所帮助！如果您有其他问题或需要进一步的解释，请随时告诉我。</p>`,
    category: '技术',
    tags: ['Java', '字符串', '核心技术']
  },
  {
    id: 8,
    title: 'String 类实现细节',
    date: '2023-10-30',
    summary: '深入探讨Java中String类的内部实现细节，包括字符数组存储和字符串池机制。',
    content: `<h2>概述</h2>
<p><code>String</code> 类是 Java 标准库中的核心类，位于 <code>java.lang</code> 包中。它的实现细节涉及到字符串的存储方式、不可变性机制以及字符串池的运作方式。深入了解这些实现细节有助于更好地理解 <code>String</code> 类的行为和性能特性。本文将重点讨论 <code>String</code> 类的内部字符数组存储和字符串池的实现。</p>

<h2>内部字符数组存储</h2>
<p>在 Java 中，<code>String</code> 类的内部实现主要依赖于一个字符数组来存储字符串的内容。以下是其内部存储的主要特点和实现细节：</p>
<ol>
  <li><strong>字符数组作为核心存储结构</strong>：
    <ul>
      <li><code>String</code> 类内部使用一个 <code>char[]</code> 数组来存储字符串的字符序列。在 JDK 8 及之前的版本中，这个数组被命名为 <code>value</code>，并且是 <code>final</code> 的，确保不可变性。</li>
      <li>例如，在 JDK 8 中，<code>String</code> 类的部分源码如下：
        <pre><code>public final class String implements java.io.Serializable, Comparable&lt;String&gt;, CharSequence {
    /** The value is used for character storage. */
    private final char value[];
    // ... 其他字段和方法 ...
}</code></pre>
      </li>
      <li>从 JDK 9 开始，为了支持紧凑字符串（Compact Strings），<code>String</code> 类内部改用 <code>byte[]</code> 数组存储字符，以减少内存使用。紧凑字符串会根据字符串的内容选择使用 Latin-1 编码（每个字符占 1 个字节）或 UTF-16 编码（每个字符占 2 个字节）。相关源码如下：
        <pre><code>public final class String implements java.io.Serializable, Comparable&lt;String&gt;, CharSequence {
    @Stable
    private final byte[] value;
    private final byte coder;
    // ... 其他字段和方法 ...
}</code></pre>
      </li>
      <li><code>coder</code> 字段用于标识编码方式，值为 <code>LATIN1</code>（0）或 <code>UTF16</code>（1）。</li>
    </ul>
  </li>
  <li><strong>不可变性的实现</strong>：
    <ul>
      <li><code>String</code> 类的不可变性通过将内部数组声明为 <code>final</code> 并确保没有公开的方法可以修改数组内容来实现。</li>
      <li>任何修改操作（如 <code>substring()</code>、<code>replace()</code>）都会创建一个新的 <code>String</code> 对象，而不是修改现有的对象。例如，<code>substring()</code> 方法会创建一个新的 <code>String</code> 对象，共享原始字符串的字符数组的一部分（在 JDK 8 中），或者复制出一部分数组（在 JDK 9 及以上版本中）。</li>
      <li>在 JDK 8 中，<code>substring()</code> 方法的实现可能如下：
        <pre><code>public String substring(int beginIndex, int endIndex) {
    // 省略参数检查
    int subLen = endIndex - beginIndex;
    return new String(value, beginIndex, subLen);
}</code></pre>
        这里 <code>value</code> 数组被共享，但由于它是 <code>final</code> 的，内容不会被修改。
      </li>
    </ul>
  </li>
  <li><strong>紧凑字符串（Compact Strings）</strong>：
    <ul>
      <li>从 JDK 9 开始引入的紧凑字符串特性是为了优化内存使用。对于只包含 Latin-1 字符（ASCII 字符）的字符串，<code>String</code> 使用 <code>byte[]</code> 数组以单字节形式存储每个字符，而不是使用 <code>char[]</code> 数组的双字节形式。</li>
      <li>如果字符串包含非 Latin-1 字符，则会使用 UTF-16 编码存储，每个字符占两个字节。</li>
      <li>这种优化显著减少了内存占用，尤其是在处理大量 ASCII 字符串的应用程序中。</li>
    </ul>
  </li>
  <li><strong>字符串拼接的性能问题</strong>：
    <ul>
      <li>由于 <code>String</code> 的不可变性，频繁的字符串拼接（如使用 <code>+</code> 运算符）会导致创建多个中间 <code>String</code> 对象，影响性能。</li>
      <li>为了解决这个问题，Java 编译器会对某些情况下的字符串拼接进行优化，将其转换为 <code>StringBuilder</code> 的操作。例如：
        <pre><code>String s = "a" + "b" + "c";</code></pre>
        会被编译器优化为类似以下代码：
        <pre><code>String s = new StringBuilder().append("a").append("b").append("c").toString();</code></pre>
      </li>
      <li>然而，在循环中进行字符串拼接时，建议显式使用 <code>StringBuilder</code> 以避免多次创建中间对象。</li>
    </ul>
  </li>
</ol>

<h2>字符串池的实现</h2>
<p>字符串池（String Pool，也称为 String Intern Pool）是 Java 用来优化字符串存储的一种机制，旨在减少内存使用和提高性能。以下是字符串池的实现细节：</p>
<ol>
  <li><strong>字符串池的位置</strong>：
    <ul>
      <li>在 JDK 6 及之前版本中，字符串池位于永久代（PermGen）中，作为方法区的一部分。</li>
      <li>从 JDK 7 开始，字符串池被移动到堆内存中，作为普通对象存储。这使得字符串池可以被垃圾回收器回收，避免了永久代内存不足的问题。</li>
      <li>在 JDK 8 及以上版本中，永久代被移除，字符串池仍然位于堆内存中，通常由垃圾回收器（如 G1、CMS）管理。</li>
    </ul>
  </li>
  <li><strong>字符串池的工作原理</strong>：
    <ul>
      <li>字符串池是一个哈希表结构，存储唯一的字符串对象。当使用字符串字面量创建字符串时（如 <code>String s = "hello";</code>），JVM 会检查字符串池中是否已存在内容相同的字符串对象。</li>
      <li>如果存在，JVM 返回池中已有对象的引用；如果不存在，JVM 在池中创建一个新的 <code>String</code> 对象，并将其添加到池中。</li>
      <li>使用 <code>new String("hello")</code> 创建字符串时，会在堆内存中创建一个新的 <code>String</code> 对象，即使字符串池中已存在相同内容的字符串。这个新对象与池中的对象是不同的实例。</li>
      <li><code>intern()</code> 方法可以将一个 <code>String</code> 对象添加到字符串池中，并返回池中对象的引用。如果池中已存在相同内容的字符串，则返回池中对象的引用；否则，将当前对象添加到池中。</li>
    </ul>
  </li>
  <li><strong>字符串池的实现代码</strong>：
    <ul>
      <li>字符串池的具体实现不在 <code>String</code> 类中，而是在 JVM 内部实现，通常由 C++ 代码管理。</li>
      <li>在 OpenJDK 中，字符串池的实现位于 <code>hotspot/src/share/vm/classfile/symbolTable.cpp</code> 和相关文件中。字符串池使用一个哈希表（<code>Hashtable</code>）来存储字符串对象，确保快速查找和唯一性。</li>
      <li><code>intern()</code> 方法的实现会调用 JVM 内部的函数 <code>JVM_InternString</code>，该函数负责检查和更新字符串池。</li>
    </ul>
  </li>
  <li><strong>字符串池的性能和内存考虑</strong>：
    <ul>
      <li>字符串池通过重用字符串对象减少了内存使用，尤其是在应用程序中使用大量重复字符串的情况下。</li>
      <li>然而，过多的字符串对象进入字符串池可能会导致内存占用增加，尤其是在 JDK 7 及以上版本中，因为字符串池位于堆内存中。</li>
      <li>在高并发环境中，字符串池的访问可能成为性能瓶颈，因为 <code>intern()</code> 方法涉及到同步操作。</li>
      <li>JVM 提供了一些参数来调整字符串池的行为，例如 <code>-XX:StringTableSize</code> 可以设置字符串池哈希表的大小（在 JDK 8 及以上版本中）。</li>
    </ul>
  </li>
  <li><strong>字符串池的行为示例</strong>：
    <ul>
      <li>以下代码展示了字符串池的工作原理：
        <pre><code>String s1 = "hello"; // 使用字面量，进入字符串池
String s2 = "hello"; // 引用字符串池中的同一对象
String s3 = new String("hello"); // 在堆中创建新对象
String s4 = s3.intern(); // 返回字符串池中的对象引用

System.out.println(s1 == s2); // true，引用同一对象
System.out.println(s1 == s3); // false，s3 是堆中的新对象
System.out.println(s1 == s4); // true，s4 是字符串池中的对象</code></pre>
      </li>
    </ul>
  </li>
</ol>

<h2>其他实现细节</h2>
<ol>
  <li><strong>哈希码计算</strong>：
    <ul>
      <li><code>String</code> 类的 <code>hashCode()</code> 方法使用一个特定的算法计算字符串的哈希值，公式为：
        <pre><code>s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]</code></pre>
        其中 <code>s[i]</code> 是字符串中第 <code>i</code> 个字符，<code>n</code> 是字符串长度，<code>31</code> 是一个质数，用于减少哈希冲突。
      </li>
      <li>从 JDK 7 开始，<code>hashCode()</code> 的结果会被缓存到一个 <code>hash</code> 字段中，避免重复计算。</li>
    </ul>
  </li>
  <li><strong>序列化支持</strong>：
    <ul>
      <li><code>String</code> 类实现了 <code>Serializable</code> 接口，支持序列化和反序列化。内部字符数组在序列化时会被正确处理。</li>
    </ul>
  </li>
  <li><strong>与 <code>StringBuilder</code> 和 <code>StringBuffer</code> 的关系</strong>：
    <ul>
      <li><code>StringBuilder</code> 和 <code>StringBuffer</code> 类用于高效地构建字符串，它们内部也使用字符数组存储内容，但不像 <code>String</code> 那样不可变。</li>
      <li><code>String</code> 类的许多方法（如 <code>toString()</code>）可以与这些类交互，例如 <code>StringBuilder.toString()</code> 会创建一个新的 <code>String</code> 对象。</li>
    </ul>
  </li>
</ol>

<h2>注意事项</h2>
<ul>
  <li><strong>内存管理</strong>：了解字符串池和内部存储机制有助于优化内存使用，避免不必要的对象创建。例如，避免频繁使用 <code>new String()</code>，尽量使用字符串字面量。</li>
  <li><strong>性能优化</strong>：在处理大量字符串操作时，优先使用 <code>StringBuilder</code> 而不是直接拼接 <code>String</code> 对象。</li>
  <li><strong>版本差异</strong>：<code>String</code> 类的实现细节在不同 JDK 版本中有所变化（如从 <code>char[]</code> 到 <code>byte[]</code> 的转变），因此在阅读源码或优化代码时需要注意 JDK 版本。</li>
</ul>

<h2>源码位置</h2>
<p>在 JDK 源码中，<code>String</code> 类的定义位于 <code>java.base/java/lang/String.java</code> 文件中。字符串池的具体实现则位于 JVM 源码中，通常在 OpenJDK 的 <code>hotspot/src/share/vm/classfile/symbolTable.cpp</code> 等文件中。如果您想深入研究这些实现细节，可以下载 OpenJDK 源码并查看相关文件。</p>

<p>以上是对 <code>String</code> 类实现细节的详细介绍，希望对您有所帮助！如果您有其他问题或需要进一步的解释，请随时告诉我。</p>`,
    category: '技术',
    tags: ['Java', '字符串', '实现细节']
  },
  {
    id: 9,
    title: 'Serializable 接口说明',
    date: '2023-11-01',
    summary: '介绍Java中的Serializable接口及其使用方法。',
    content: `<h2>概述</h2>
<p><code>Serializable</code> 接口是 Java 中的一个标记接口（marker interface），它用于指示一个类可以被序列化。序列化是将对象转换为字节流的过程，以便可以将其保存到文件、数据库或通过网络传输。</p>

<h2>主要特点</h2>
<ul>
  <li><strong>标记接口</strong>：<code>Serializable</code> 接口没有定义任何方法，它只是一个标记，告诉 Java 编译器这个类可以被序列化。</li>
  <li><strong>序列化过程</strong>：当一个对象被序列化时，Java 会将其状态（即对象的字段值）转换为字节流。</li>
  <li><strong>反序列化过程</strong>：反序列化是将字节流转换回对象的过程。</li>
</ul>

<h2>使用方法</h2>
<p>要使一个类可以被序列化，只需在类声明中实现 <code>Serializable</code> 接口即可。例如：</p>
<pre><code>import java.io.Serializable;

public class MyClass implements Serializable {
    private String name;
    private int age;

    public MyClass(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Getters and setters
}</code></pre>

<h2>注意事项</h2>
<ul>
  <li><strong>transient 关键字</strong>：如果一个字段被标记为 <code>transient</code>，则在序列化过程中该字段将被忽略，不会保存其值。</li>
  <li><strong>serialVersionUID</strong>：为了确保序列化和反序列化过程中的版本兼容性，建议为实现 <code>Serializable</code> 接口的类定义一个 <code>serialVersionUID</code> 字段。例如：
    <pre><code>private static final long serialVersionUID = 1L;</code></pre>
  </li>
  <li><strong>继承</strong>：如果一个类实现了 <code>Serializable</code> 接口，那么它的子类也会自动实现该接口。</li>
  <li><strong>安全性</strong>：序列化可能会导致安全问题，因为它可以将对象的状态保存到外部存储中。确保敏感数据不会被意外序列化。</li>
</ul>

<h2>相关类和方法</h2>
<ul>
  <li><strong>ObjectOutputStream</strong>：用于将对象写入输出流。</li>
  <li><strong>ObjectInputStream</strong>：用于从输入流读取对象。</li>
</ul>

<p>通过实现 <code>Serializable</code> 接口，Java 提供了便捷的方式来实现对象的持久化和传输，这在分布式系统和数据存储中非常有用。</p>`,
    category: '技术',
    tags: ['Java', '序列化', '核心技术']
  },
  
  {
    id: 10,
    title: 'JDK 源码阅读笔记',
    date: '2023-11-01', // Assuming today's date since not specified in file
    summary: '对JDK源码中java.lang.Object和String等核心类的详细解读和分析。',
    content: `<h2>java.lang.Object 类分析</h2>
<p><code>Object</code> 是 Java 类层次结构的根类，每个 Java 类（包括数组）都直接或间接继承自 <code>Object</code>。它定义了所有对象都具备的基本行为。以下是对其核心方法的分析和讲解：</p>

<h3>1. 构造方法</h3>
<pre><code>public Object() {}</code></pre>
<ul>
  <li>空的构造方法，表明 <code>Object</code> 类没有特定的初始化逻辑。</li>
  <li>标注了 <code>@IntrinsicCandidate</code>，表示 JVM 可能会对这个方法进行特殊优化或内联处理。</li>
</ul>

<h3>2. getClass() 方法</h3>
<pre><code>public final native Class<?> getClass();</code></pre>
<ul>
  <li>返回对象的运行时类（<code>Class</code> 对象），用于反射操作。</li>
  <li><code>final</code> 修饰，子类无法重写。</li>
  <li><code>native</code> 修饰，表明这是由 JVM 底层实现的本地方法。</li>
</ul>

<h3>3. hashCode() 方法</h3>
<pre><code>public native int hashCode();</code></pre>
<ul>
  <li>返回对象的哈希码，主要用于哈希表（如 <code>HashMap</code>）中定位对象。</li>
  <li>注释详细说明了 <code>hashCode</code> 的约定：
    <ul>
      <li>同一个对象在同一执行过程中多次调用 <code>hashCode</code> 必须返回相同的整数。</li>
      <li>如果两个对象通过 <code>equals</code> 方法相等，则它们的 <code>hashCode</code> 必须相同。</li>
      <li>不相等的对象可以有相同的 <code>hashCode</code>，但为了哈希表性能，最好返回不同的值。</li>
    </ul>
  </li>
</ul>

<h3>4. equals(Object obj) 方法</h3>
<pre><code>public boolean equals(Object obj) {
    return (this == obj);
}</code></pre>
<ul>
  <li>用于判断两个对象是否相等。</li>
  <li><code>Object</code> 类的默认实现是引用相等性（<code>==</code>）。</li>
  <li>通常在自定义类中需要重写 <code>equals</code> 方法来实现内容相等性。</li>
</ul>

<h3>5. clone() 方法</h3>
<ul>
  <li>用于创建并返回对象的副本。</li>
  <li>默认实现会抛出 <code>CloneNotSupportedException</code>，除非类实现了 <code>Cloneable</code> 接口。</li>
</ul>

<h3>6. toString() 方法</h3>
<ul>
  <li>返回对象的字符串表示，默认实现是类名加上哈希码的十六进制表示。</li>
  <li>通常建议子类重写此方法以提供更有意义的字符串表示。</li>
</ul>

<h3>7. 线程同步相关方法：wait()、notify()、notifyAll()</h3>
<ul>
  <li>用于线程间的通信和同步。</li>
  <li>这些方法都是 <code>final</code> 和 <code>native</code>，由 JVM 底层实现。</li>
</ul>

<h3>8. finalize() 方法</h3>
<ul>
  <li>在对象被垃圾回收前调用，用于资源清理。</li>
  <li>已被标注为 <code>@Deprecated(since="9", forRemoval=true)</code>，不推荐使用。</li>
</ul>

<h2>java.lang.String 类分析</h2>
<p><code>String</code> 类是 Java 中表示字符序列的核心类，它是不可变的（immutable），广泛用于字符串操作。</p>

<h3>1. 基本特性</h3>
<ul>
  <li><strong>不可变性</strong>：<code>String</code> 对象创建后，其内容无法更改。</li>
  <li><strong>UTF-16 编码</strong>：使用 UTF-16 格式存储字符。</li>
  <li><strong>字符串常量池</strong>：字符串字面量会被 JVM 放入字符串常量池中，实现复用。</li>
</ul>

<h3>2. 核心字段</h3>
<pre><code>@Stable
private final byte[] value;
private final byte coder;
private int hash; // Default to 0
private boolean hashIsZero; // Default to false;</code></pre>
<ul>
  <li><code>value</code>：存储字符串的字符数据，使用 <code>byte[]</code> 而非 <code>char[]</code>（从 Java 9 开始）。</li>
  <li><code>coder</code>：指示编码方式（<code>LATIN1</code> 或 <code>UTF16</code>）。</li>
</ul>

<h3>3. 核心方法</h3>
<ul>
  <li><code>length()</code> 和 <code>isEmpty()</code>：返回字符串长度和是否为空。</li>
  <li><code>charAt(int index)</code>：获取指定索引的字符。</li>
  <li><code>equals(Object anObject)</code>：比较两个字符串内容是否相等。</li>
  <li><code>substring(int beginIndex, int endIndex)</code>：提取子字符串。</li>
  <li><code>intern()</code>：将字符串放入常量池并返回引用。</li>
</ul>

<h3>4. 设计思想</h3>
<ul>
  <li><strong>不可变性带来的好处</strong>：线程安全、缓存哈希码、常量池共享。</li>
  <li><strong>性能优化</strong>：从 Java 9 开始使用 <code>byte[]</code> 存储数据，减少内存占用。</li>
</ul>`,
    category: '技术',
    tags: ['Java', 'JDK源码', '核心技术']
  },
  {
    id: 11,
    title: 'JNI 接口查找说明',
    date: '2023-10-26',
    summary: '详细介绍如何在JDK源码中查找System类中native方法对应的JNI接口实现。',
    content: `<h2>问题描述</h2>
<p>在 JDK 源码中找不到 <code>System</code> 类中 <code>native</code> 方法对应的 JNI 接口实现。这是一个常见的问题，因为 JNI 接口的实现并不总是显而易见地包含在 Java 源码中，而是分布在 JDK 的本地代码部分。</p>

<h2>原因分析</h2>
<ol>
  <li><strong>Java 源码中只包含声明</strong>：在 <code>java.base/java/lang/System.java</code> 文件中，<code>native</code> 方法如 <code>currentTimeMillis()</code> 只被声明，没有方法体。</li>
  <li><strong>JNI 实现位于本地代码</strong>：<code>native</code> 方法的实现通常是用 C 或 C++ 编写的，位于 JDK 源码的本地代码目录中。</li>
  <li><strong>命名规则</strong>：JNI 方法的本地实现遵循特定的命名规则，如 <code>Java_java_lang_System_currentTimeMillis</code>。</li>
  <li><strong>JVM 内部实现</strong>：某些 <code>native</code> 方法可能直接嵌入在 JVM 实现中。</li>
</ol>

<h2>如何查找 JNI 接口实现</h2>
<ol>
  <li><strong>下载完整 OpenJDK 源码</strong>：确保下载了完整的 OpenJDK 源码。</li>
  <li><strong>定位本地代码目录</strong>：导航到 <code>jdk/src/java.base/share/native/libjava/</code> 目录。</li>
  <li><strong>搜索特定方法</strong>：在 <code>System.c</code> 文件中搜索类似 <code>Java_java_lang_System_currentTimeMillis</code> 的函数名。</li>
  <li><strong>检查 JVM 源码</strong>：如果在 <code>libjava</code> 目录中找不到实现，可能需要查看 JVM 源码。</li>
</ol>

<h2>其他资源</h2>
<ul>
  <li><strong>OpenJDK 源码浏览</strong>：使用在线的 OpenJDK 源码浏览器快速定位实现。</li>
  <li><strong>JNI 文档</strong>：Oracle 提供的 JNI 文档详细说明了 JNI 的工作原理。</li>
</ul>`,
    category: '技术',
    tags: ['Java', 'JNI', '源码分析']
  },
  {
    id: 12,
    title: 'JNI 使用流程说明',
    date: '2023-10-27',
    summary: '详细介绍使用C或C++编写JNI方法的具体流程和注意事项。',
    content: `<h2>概述</h2>
<p>JNI (Java Native Interface) 是 Java 提供的一种机制，允许 Java 代码与用 C 或 C++ 编写的本地代码进行交互。</p>

<h2>具体流程</h2>
<ol>
  <li><strong>在 Java 中声明 native 方法</strong>：
    <pre><code>public class NativeExample {
    public native void printHello();
    public native int addNumbers(int a, int b);
}</code></pre>
  </li>
  <li><strong>编译 Java 类并生成头文件</strong>：
    <pre><code>javac -h . NativeExample.java</code></pre>
  </li>
  <li><strong>编写本地代码实现</strong>：
    <pre><code>#include &lt;jni.h&gt;
#include "NativeExample.h"

JNIEXPORT void JNICALL Java_NativeExample_printHello(JNIEnv *env, jobject obj) {
    printf("Hello from C!\\n");
}</code></pre>
  </li>
  <li><strong>编译本地代码为动态链接库</strong>：
    <pre><code>gcc -shared -I$JAVA_HOME/include -o libNativeExample.so NativeExample.c</code></pre>
  </li>
  <li><strong>加载本地库并调用 native 方法</strong>：
    <pre><code>System.loadLibrary("NativeExample");</code></pre>
  </li>
</ol>

<h2>注意事项</h2>
<ul>
  <li><strong>内存管理</strong>：本地代码中分配的内存必须手动释放。</li>
  <li><strong>线程安全</strong>：本地代码需要确保线程安全。</li>
  <li><strong>平台依赖性</strong>：本地代码通常是平台相关的。</li>
</ul>`,
    category: '技术',
    tags: ['Java', 'JNI', '本地编程']
  },
  {
    id: 13,
    title: 'Iterator 和 ListIterator 类深入代码分析',
    date: '2023-11-03',
    summary: '对Java集合框架中Iterator和ListIterator接口的源代码深入分析。',
    content: `<h2>java.util.Iterator 深入分析</h2>
<p><code>Iterator</code>是Java集合框架中的一个接口，用于遍历集合中的元素。</p>

<h3>接口定义</h3>
<pre><code>public interface Iterator&lt;E&gt; {
    boolean hasNext();
    E next();
    default void remove() {
        throw new UnsupportedOperationException("remove");
    }
    default void forEachRemaining(Consumer&lt;? super E&gt; action) {
        Objects.requireNonNull(action);
        while (hasNext())
            action.accept(next());
    }
}</code></pre>

<h3>主要方法</h3>
<ul>
  <li><code>hasNext()</code>：检查是否还有下一个元素。</li>
  <li><code>next()</code>：返回下一个元素。</li>
  <li><code>remove()</code>：删除当前元素。</li>
</ul>

<h2>java.util.ListIterator 深入分析</h2>
<p><code>ListIterator</code>是<code>Iterator</code>接口的子接口，专门用于遍历<code>List</code>接口的实现类。</p>

<h3>接口定义</h3>
<pre><code>public interface ListIterator&lt;E&gt; extends Iterator&lt;E&gt; {
    boolean hasPrevious();
    E previous();
    int nextIndex();
    int previousIndex();
    default void set(E e) {
        throw new UnsupportedOperationException("set");
    }
    default void add(E e) {
        throw new UnsupportedOperationException("add");
    }
}</code></pre>

<h3>主要方法</h3>
<ul>
  <li><code>hasPrevious()</code>：检查是否还有上一个元素。</li>
  <li><code>previous()</code>：返回上一个元素。</li>
  <li><code>set(E e)</code>：替换当前元素。</li>
</ul>

<h2>ArrayList中的实现</h2>
<p>在<code>ArrayList</code>类中，<code>Iterator</code>和<code>ListIterator</code>的具体实现是内部类<code>Itr</code>和<code>ListItr</code>，它们提供了并发修改检测机制。</p>`,
    category: '技术',
    tags: ['Java', '集合框架', '迭代器']
  }
];
