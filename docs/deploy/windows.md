# Windows 部署

::: warning
尽管本页面用于介绍如何在 Windows 环境中对应用进行部署，我们还是更推荐使用如 [CentOS](https://www.centos.org/) 等 Linux 发行版

！！拒绝伸手，不提供成品号，有需要请自行部署！！
:::

## 闲言碎语

偶然在B站看到关于本项目的演示视频和 Windows 中的[部署文章](https://www.bilibili.com/read/cv13331826)
，事无巨细地介绍了很多部署细节。本文也将一定程度的参考这篇文件进行介绍，同时汇总一些常见的可能出现的问题。

## 准备

### 服务器

首先必须要知道的一点，机器人本身只是在模拟真人来对你在群聊中的种种信息做出回答，所以如果想让你的群友们24小时都能使用机器人，你就需要一台云服务器来挂着你准备的机器人QQ账号（当然，如果你打算24小时开着自己的电脑，可以跳过这一步）。

我们的程序对服务器配置的要求并不高，学生机就足够了，参考 [腾讯云](https://cloud.tencent.com/act/campus)
和 [阿里云](https://developer.aliyun.com/plan/grow-up) ，月租只需要9元。下面以腾讯云为例来介绍如何创建服务器(-¥27)。

![](/windows/prepare1.png)
![](/windows/prepare2.png)

付费成功后，进入控制台，选择通用场景或勾选暂不需要场景教学，然后确定，并等待服务器创建完成。

在控制台页面，点开刚刚创建成功的服务器右上角的「更多」，然后选择下拉菜单里的「管理」，在实例信息的方格中，先将服务器「关机」后，选择「重置密码」，确认设置后，点击「开机」开启服务器。

在控制台页面的上方，有一段类似 `上海 | (公) xxx.xxx.xxx.xxx` 的文字，点击右侧即可复制你的服务器的IP。复制之后，通过远程桌面连接服务器。

::: tip
如何连接远程桌面？

1. 同时按下 Windows键 + R，在「打开」右侧的输入框中输入 `mstsc`，回车即可打开「远程桌面连接」窗口。或是按下 Windows键 后，在「开始」页面里搜索「远程桌面连接」，也能打开这个窗口。
2. 在打开的窗口中点击「显示选项」，「计算机」中填写上面复制的服务器IP，「用户名」在你没有进行修改的情况下是 `Administrator`。
3. 填写完成后可以点击下方的「另存为」将他保存在你的桌面上，以后只需双击这个文件就能连接到服务器。然后点击「连接」，不需要在意弹出的提示，只需要点击「是」即可，然后输入你前面设置的密码。
4. 登录进服务器后可能会弹出「仪表盘」，关闭即可。
   :::

以上，你就完成了服务器的设置。

### 环境

你需要先为机器人准备 `Node.js` 的运行环境，你可以在 [这里](https://nodejs.org/download/release/v14.17.2/) 找到正确的版本。选择 `node-v14.17.2-x64.msi`
，这是为 64位 系统准备的版本，如果你正在自己的电脑上进行这些步骤，并且你的电脑安装的是 32位 系统，请选择 `node-v14.17.2-x86.msi` ~~（这年头不会还有人用 32位 吧）~~
。你也不需要为英文的安装界面所烦恼，不需要考虑安装路径，看到能勾选的地方勾选即可，然后无脑「Next」就好。

安装完成后最好检查版本是否正确，同时按下 Windows键 + R，在「打开」右侧的输入框中输入 `cmd`，回车打开命令行，分别输入 `node -v` 和 `npm -v` ，看到下面的输出就算环境安装成功。

![](/windows/env1.png)

以上都完成后我们还建议你安装 `cnpm` ，方法十分简单，只需要在刚刚的命令行窗口中输入 `npm i -g cnpm` 即可。安装完成后同样可以通过 `cnpm -v` 来查看是否正确安装。

### 下载

最简单的方法是下载代码的压缩包，进入 [项目主页](https://github.com/SilveryStar/Adachi-BOT) ，在页面中的绿色按钮「Code」的下拉菜单中选择「Download
ZIP」，下载到你指定的地方解压即可。

不过这种方法可能下载速度较慢，并且以后更新机器人的版本比较麻烦，所有希望你能参考下面的方法来进行下载。

1. 进入 [Git 主页](https://git-scm.com/downloads) ，然后点击 `Windows` 进入下载页面，稍等片刻后会自动弹出下载窗口。如果没有窗口弹出，则点击「Click here to download
   manually」。
2. 下载完成后同样无脑「Next」即可完成安装。
3. 在任何一个你创建的文件夹中，空白处右键鼠标，选择「Git Bash
   Here」，然后在弹出的命令行窗口中输入 `git clone https://ghproxy.com/https://github.com/SilveryStar/Adachi-BOT.git` ，很快就能下载完成。

## 启动

我们提供了两种启动机器人的方案，事实上，处于程序运行的稳定性考虑，其实更加推荐 `Docker` 的启动方式。但处于很多看本文的人应该都没有相关的维护经验的考虑，我们还是着重介绍另一种直接启动的方法。

### 数据库安装

进入 [GitHub](https://github.com/microsoftarchive/redis/releases/tag/win-3.2.100) 选择 `Redis-x64-3.2.100.zip`
进行下载并解压，然后把BOT项目中的 `redis.conf` 文件复制到解压后的目录里然后把文件里的 `dir /data/` 改为 `dir ./` ，把 `port 56379` 改为 `port 6379`
（之后需要把BOT项目里 `config/setting.yml `里的 `dbport` 改为 `6379` ），之后新建一个文本文件，可以命名为 `start-redis.bat` （注意后缀名是 `.bat`
，重命名文件时一定要把后缀名改掉不能是 `txt` ，至于怎么显示后缀名，不会可以百度下）。把下面的命令粘贴到这个脚本文件里，保存后双击运行，启动后不要关闭窗口。

```bash
.\redis-server.exe .\redis.conf
```

### 配置

首先进入 `Adachi-BOT` 文件夹，依照上面的方法打开 `Git Bash` 命令行，输入以下两行代码来安装程序所需的文件。

```bash
# 设置 npm 国内镜像
npm config set registry https://registry.npmmirror.com

# 下载项目所需依赖
npm install
```

然后输入 `npm start` ，这会在当前文件夹内创建一个 `config` 文件夹，这是用来配置机器人的文件夹。

由于服务器内自带的文件编辑器并不好用，这里建议你安装 [VSCode](https://code.visualstudio.com/) 。进入页面后点击「Download for
Windows」即可。如果没有弹出下载窗口的话，可以在自己的电脑上下载好安装包复制进服务器进行安装。

`config` 文件夹中包含 `setting.yml`, `cookies.yml` 和 `commands.yml` 三个文件，请按照 [这里](/config/)
的信息进行配置，里面非常详细的说明了每个属性的作用。其中 `commands.yml` 不需要处理，只用管另外两个就好。

对于 `setting` ，一般情况下，你只需要配置 `number`, `password`, `master` 几个属性，其他的默认情况下都是最常用的属性。此外，注意将 `port` 改为 6379 。

对于 `cookies`
，这是用来得到米游社数据的东西，每个米游社账号都是独一无二的，[这里](/faq/#%E5%A6%82%E4%BD%95%E8%8E%B7%E5%BE%97%E7%B1%B3%E6%B8%B8%E7%A4%BE-cookies)
会告诉你如何获得它。

### 运行

一切准备就绪，输入 `npm restart` 即可启动机器人，然后保持窗口不关闭即可，远程桌面可以断开连接。现在机器人就能收发信息了。

::: tip
这里有一个容易犯的误区，~~包括B站上的那位作者也犯了~~，就是 `npm run login` 在这里并不需要使用，这条命令是用来帮助 `Docker` 启动验证设备的
:::

### 更新

因为项目会时常更新版本，你当然可以保持较旧版本的使用，但出现 BUG 时也需要进行更新，下面简单的介绍两种更新项目的方式。

#### Git

1. 在项目根目录下，输入 `git pull` 进行更新，若出现 `error: Yout local changes to the following files would be overwritten by merge:`
   ，说明本地存在修改记录无法更新。若记不起自己改了什么或无关紧要的修改，可执行 `git reset --hard` 来清除本地修改记录，然后再次尝试拉取。
2. 运行 `npm restart` 重启。

#### 指令更新

使用拥有 master 权限的账号 对 BOT 发送 `#upgrade` 指令即可开始更新，并在成功更新后自动重启 BOT。

::: tip
由于每个人的配置不同，发送无效的请使用帮助指令查看具体更新指令。  
以及因为众所周知的原因，从 git 上拉取代码的网络极其不稳定，出现网络问题拉取失败为正常现象，多试几次即可。
:::

### 问题查找

若按在上述操作中未达到下一步的预期结果，可查看日志来排查错误，使用以下方式来查看 BOT 运行日志。

```bash
# 若已全局安装 pm2，可无视这一步
npm install -g pm2

# 查看日志
pm2 log adachi-bot
```

若报错信息无法自行解决，可携带报错信息截图向我们的 [官方频道](https://qun.qq.com/qqweb/qunpro/share?_wv=3&_wwv=128&inviteCode=ZcZDq&from=246610&biz=ka)
反馈。

## 问题解答

此处收集了部分 [该文章](https://www.bilibili.com/read/cv13331826) 评论区提及的问题，并做统一解答。

### 怎么更改指令的形式

> 大佬，我想再请问一下，那个机器人的英文命令具体怎么更改呀，就是把mys改成米游社，aby改成深渊那种。我看您评论区里说init里面修改，但是我找不到abyss，只把command里面的abyss改成深渊可以吗

在第一次成功运行机器人后，`config` 文件夹里的 `commands.yml` 文件会更新。对机器人发送 `#help -k` 可以看到每个功能的指令对应的 `key` ，在 `commands.yml`
中找到你要修改的功能，然后按照 [这里](/config/#commands-yml) 介绍的进行更改即可，例如：

下面的是深渊查询的指令配置，默认情况下 `caby` 用于查询本期深渊，`laby` 是上期深渊。

```yaml
silvery-star.private-abyss:
  type: switch
  auth: 1
  scope: 3
  mode: divided
  onKey: caby
  offKey: laby
  header: ""
  enable: true
```

把其中的部分属性改成下面这样，即可修改上面的英文指令。

```yaml
onKey: 深渊
offKey: 上期深渊
```

下面是米游社查询的指令，默认只有 `mys` 一个关键词。

```yaml
silvery-star.private-mys:
  type: order
  auth: 1
  scope: 3
  headers:
    - mys
  enable: true
```

同样，你也可以修改他的形式，比如:

```yaml
headers:
  - 米游社
```

::: tip
大多数时候，你不需要为一个命令配置大小写的关键词，如 `uid`, `Uid` 和 `UID`，只需要使用全小写的那个即可
:::

### 关于机器人账号

> up最后的时候提示qq等级过低是什么问题啊？还特意去更新了一下qq不过暂时好像还是没用

账号密码登录时，如果QQ账号等级（就那个星星月亮的等级）较低，因为服务器登录属于异地登录，可能被腾讯风控。

这种情况一般把账号在服务器挂一段时间就行，或者选择把 `setting.yml` 中的 `qrcode` 改成 `true`，使用扫码的方式进行登录。

### 运行机器人时卡住了

> npm start之后
>
> \> adachi-bot@2.2.0 start D:\test\Adachi-BOT-master
>
> \> ts-node -r tsconfig-paths/register app.ts --files

在你把 `setting.yml` 中的 `webConsole.enable` 设置为 `true` 时（**注意**，此时`jwtSecret`
要随便填一点内容,否则启动会报错），这里不会打印出更多消息，你可以直接在外部访问你的服务器IP进入网页控制台，详细见 [控制台](/web-console/#%E8%AE%BF%E9%97%AE) 。

且在 v2.6.4 以及更高的版本下，默认情况下 `jwtSecret` 将会随机生成，且在启动成功后将会在日志中给予提示。

## 结

以上是我自认为最详细的 Windows 部署方法，如有疑问，请到 [GitHub](https://github.com/SilveryStar/Adachi-BOT) 提交 issue，喜欢的话可以点个 `star`。