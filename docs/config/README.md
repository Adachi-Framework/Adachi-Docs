# 配置文件

项目首次运行时，会在 `config` 目录下生成一系列配置文件。

本文仅对这些配置项做出相关解释，建议通过**网页控制台**修改各项配置内容。

## `base.yml`

bot 运行相关的基本配置。

### 默认值

```yaml
wsServer: 127.0.0.1:11451
master: 987654321
inviteAuth: 2
logLevel: info
atUser: false
atBOT: false
addFriend: true
renderPort: 80
```

### `wsServer`

`go-cqhttp` 所提供的正向 `websocket` 服务地址。

### `master`

BOT 持有者（或称主人）的 QQ 账号，唯一指定，拥有 BOT 最高权限。

### `inviteAuth`

邀请 BOT 入群时，BOT 自动接受入群邀请的权限等级。可以设置为 `master` 和 `manager` 。设置为 `master` 时，只有 BOT 持有者邀请时才会自动接受入群邀请，设置为 `manager` 时 BOT
也会自动接受 **BOT 管理员** 的入群邀请。

### `logLevel`

日志输出等级，可以设置为 `all`, `trace`, `debug`, `info`, `warn`, `error`, `fatal`, `mark`, `off`
，等级从前往后依次递减。日志输出会过滤掉比所设置等级更高的等级日志，`all` 输出全部日志，`off` 不输出任何日志。

### `atUser`

BOT 在响应指令时，是否需要 at 用户。部分指令的响应无视本项配置。

### `atBOT`

是否需要在使用指令时 @BOT 账号，只在群聊中生效。@BOT 必须在最前面，例如 `@Adachi-BOT #help`。

### `addFriend`

是否强制要求添加好友后才能使用 BOT，开启后未添加好友时 BOT 将不会响应并提示对方请先添加好友。

### `renderPort`

BOT 启动所依赖端口（网页控制台、公共路由等）。

## `directive.yml`

指令发送的相关配置。

### 默认值

```yaml
header:
  - "#"
groupIntervalTime: 1500
privateIntervalTime: 2000
helpMessageStyle: message
fuzzyMatch: false
matchPrompt: true
callTimes: 3
countThreshold: 60
ThresholdInterval: false
```

### `header`

指令起始符。用于标识 BOT 指令的特殊符号，可配置多项，

例如：当 `header` 设置为 `#` 时，需使用 `#help` 来触发帮助指令，`help` 会被忽略。如果不想在指令前添加特殊符号，请设置为 `[]` 。

### `groupIntervalTime`

群聊中指令操作冷却时间，单位为毫秒(ms)，不支持小数。

### `privateIntervalTime`

私聊中指令操作冷却时间，单位为毫秒(ms)，不支持小数。

### `helpMessageStyle`

帮助信息样式，可以设置为 `message`, `forward`, `xml` 和 `card`。

* `message` 样式为所有指令以单条消息直接发送。
* `forward` 样式为每条指令为单条消息，并整合为合并转发的形式发送。
* `xml` 样式为所有指令以 xml 卡片的形式进行发送，此方式有一定封号风险，不建议大群使用。
* `card` 以图片形式发送，此种方式发送速度略慢于上面三种，但比较直观。

### `fuzzyMatch`

启用中文模糊匹配。开启后 BOT 会对中文指令进行模糊匹配，要求必须以 `header` 开头且中文指令不得拆开。  
例如对于**信息**指令，此处假设 header 为 `#`：#信息行秋、#行秋信息、#行信息秋 均可做出响应。

### `matchPrompt`

启用参数校验提示。开启后若指令参数错误，BOT 将会给予提示。

### `callTimes`

指令**联系bot持有者**每个人一天内可使用的最大次数。

### `countThreshold`

用户在一小时使用指令的次数的阈值，按整点计算，如 `13:00~14:00` 。如果用户在过去一小时内使用指令的次数超过了该值，BOT 会向持有者发送私聊信息，提示所有超量使用的用户和使用次数，以便持有者对超量使用指令的用户进行处理。

### `ThresholdInterval`

开启后当用户使用超过 `countThreshold` 所设置的阈值时，本小时内 BOT 将不再响应其指令。

## `ffmpeg.yml`

`ffmpeg` 相关配置，用于支持音视频的发送解析功能。

> Docker 启动时将会自动配置此项，无需手动更改

### 默认值

```yaml
ffmpegPath: ""
ffprobePath: ""
```

### `ffmpegPath`

`ffmpeg` 可执行应用的绝对路径地址。

### `ffprobePath`

`ffprobe` 可执行应用的绝对路径地址。

## `db.yml`

`redis` 数据库相关配置。

### 默认值

```yaml
port: 6379
password: ""
```

### `port`

数据库端口。

注意，Docker 启动时修改此值，需同时将 `redis.conf` 中的 `port` 修改为与此处相同的值。

### `password`

数据库密码。非必填项，看个人需求设置。

## `mail.yml`

用于主动发送邮件的相关功能，使用 `SMTP` 协议发送邮件。

### 默认值

```yaml
host: smtp.qq.com
port: 587
user: 123456789@qq.com
pass: "",
secure: false
servername: ""
rejectUnauthorized: false
logoutSend: false
sendDelay: 5
retry: 3
retryWait: 5
```

### `host`

邮箱服务的主机名或 IP 地址，例如qq服务为smtp.qq.com。

### `port`

邮箱服务的端口，配置项 `secure` 关闭时默认 `587`，反之 `465`。

### `user`

邮箱账号。

### `pass`

邮箱密码，各平台互不相同，如qq邮箱为授权码，请参考各自平台进行配置

### `secure`

是否开启安全连接，参考 `port` 解释。

### `servername`

验证主机名，`host` 设置为**IP地址**时可选的 TLS 验证主机名。仅 `secure` 开启时有效。

### `rejectUnauthorized`

证书校验。仅 `secure` 开启时有效。

建议关闭，开启可能会存在认证问题。

### `logoutSend`

是否开启离线发送邮件功能。开启后当 BOT 意外掉线时，自动向 Master 的 QQ 邮箱发送邮件提醒。

### `retry`

离线邮件发送失败时重新尝试发送的次数。仅 `logoutSend` 开启时有效。

### `retryWait`

离线邮件发送失败后延迟多久重新尝试发送，单位**分钟**。仅 `logoutSend` 开启时有效。

## `webConsole.yml`

网页控制台相关配置。

### 默认值

```yaml
enable: true
tcpLoggerPort: 54921
logHighWaterMark: 64
jwtSecret: 随机字符
```

### `enable`

是否启用 `Web Console` 即网页控制台功能，开启后将停止终端的日志打印行为。

### `tcpLoggerPort`

`log4js` 日志输出端口，除非端口冲突否则不需要改动。

#### `logHighWaterMark`

控制日志单次读取的数据量，单位 `kb`，不填或置 0 时默认 `64`，越大读取越快，内存占用越高，反之同理。

#### `jwtSecret`

JWT 验证秘钥，默认随机生成，可以随意输入长度为 6~16 的仅由字母和数字组成的字符串，最好不要有特殊含义。

该密钥还用于初次打开网页控制台时创建初始账号，请注意不要泄露该密钥。

## `autoChat.yml`

自动聊天配置，可以通过群聊中 `@BOT` 或私聊发送非指令语句来触发自动对话（当开启 `atBOT` 时，群聊中 `@BOT` 无效）。

### 默认值

```yaml
enable: false
type: 1
audio: false
secretId: ""
secretKey: ""
```

### `enable`

是否启用自动聊天功能。

### `type`

聊天 api 所使用的平台。

* 1: 青云客
* 2: 腾讯NLP（腾讯自然语言处理）
* 3: 小爱同学

### `audio`

是否开启语音发送功能，仅 `type` 为 `3` 时可用。

### `secretId`

前往腾讯云开通 NLP 后获取，仅 `type` 为 `2` 时可用。

### `secretKey`

前往腾讯云开通 NLP 后获取，仅 `type` 为 `2` 时可用。

## `whiteList.yml`

白名单配置，使 BOT 仅对白名单内的用户或群组作出响应。

### 默认值

```yaml
enable: false
user: []
group: []
```

### `enable`

是否启用白名单模式。

### `user`

BOT 响应的目标用户列表，未配置任何用户时，默认不做使用限制。

### `group`

BOT 响应的目标群组列表，未配置任何群组时，默认不做使用限制。

## `banScreenSwipe.yml`

群聊刷屏控制相关配置，用于处理群聊中的恶意刷屏行为（BOT 需要为管理员）。

### 默认值

```yaml
enable: false
limit: 10
duration: 1800
prompt: true,
promptMsg: 请不要刷屏哦~
```

### `enable`

是否启用刷屏控制。

### `limit`

连续发送消息几次后触发封禁。

### `duration`

禁言时长，单位为秒。

### `prompt`

触发判定后是否给予相关用户提示信息。

### `promptMsg`

触发判定后给予相关用户的提示信息内容，仅 `prompt` 开启时有效。

## `banHeavyAt.yml`

群聊过量 at 处理相关配置，用于处理群聊中的at大量群员的恶意行为（BOT 需要为管理员）。

### 默认值

```yaml
enable: false
limit: 10
duration: 1800
prompt: true
promptMsg: 你at太多人了，会被讨厌的哦~
```

### `enable`

是否启用过量 at 处理控制。

### `limit`

一条消息中超过多少个 `@` 消息后触发封禁。

### `duration`

禁言时长，单位为秒。

### `prompt`

触发判定后是否给予相关用户提示信息。

### `promptMsg`

触发判定后给予相关用户的提示信息内容，仅 `prompt` 开启时有效。

## `commands.yml`

该文件将会在 BOT 初次运行后生成，所以你并不能在启动 BOT 前配置指令。

### 基本结构

`Adachi-BOT` 中的指令被分为三类 `order`, `switch` 和 `enquire` ，你需要了解他们的共性和特性。每个指令都以 `cmdKey` 为顶级标识，你可以通过使用 `#help -k`
指令（或根据你的配置）来查看每个指令对应的 `key` 。每种指令都有四个公共配置字段：

#### `type`

分为 `order`, `switch`, `enquire` ，不可修改。

#### `auth`

最低操作权限，可设置为 1, 2, 3：

* `1` 表示除封禁用户外所有人可使用
* `2` 表示 **BOT 管理员** 和持有者可使用
* `3` 表示只有持有者可使用

#### `scope`

指令使用位置，可设置为 1, 2, 3：

* `1` 表示仅群聊可使用
* `2` 表示仅私聊可使用
* `3` 表示群聊和私聊均可使用

#### `enable`

是否启用指令。

#### `priority`

指令优先级，存在多个请求头相同的指令时，此值较大者将被触发。

### `Order` 类指令

`Order` 具有唯一可配置项 `headers` ，表示指令头，为数组类型，可以设置多个。默认情况下，指令头前会被添加上 `setting.yml` 中的 `header`
的值，如果你不想在某条指令加上它，可以在指令头前加上双下划线 `__` 。如:

```yaml
silvery-star.wish:
  type: order
  auth: 1
  scope: 3
  headers:
    - __wish
    - w
  enable: true
  priority: 0
```

这将为祈愿十连导出两个指令，`wish` `#w` ，当然，你也可以配置更多。

### `Switch` 类指令

`Switch` 拥有四个可配置项，`header`, `onKey`, `offKey` 和 `mode`。

* `mode` 开关模式，分为 `single` 和 `divided` ，它们的作用将在下面阐述
* `header` 指令头，只可配置一个，当 `mode` 设置为 `divided` 无效，此处同样可以通过双下划线来屏蔽 `setting` 中配置的 `header`
* `onKey/offKey` 表示开/关的关键词

`single` 模式表示单指令头，使用关键词区分开/关状态，如：

```yaml
# setting.yml => header: "#"
silvery-star.alias-customize:
  type: switch
  auth: 2
  scope: 3
  mode: single
  onKey: add
  offKey: rem
  header: alias
  enable: true
  priority: 0
# 导出指令 #alias [add|rem] [本名] [别名] 
```

`divided` 模式表示拆分指令头，使用指令头区分开/关状态，如：

```yaml
# setting.yml => header: ""
silvery-star.alias-customize:
  type: switch
  auth: 2
  scope: 3
  mode: divided
  onKey: 增加别名
  offKey: 删除别名
  header: ""
  enable: true
  priority: 0
# 导出指令 1. 增加别名 [本名] [别名]  2. 删除别名 [本名] [别名]
```

### `Enquire` 类指令

`Enquire` 类指令的配置项与 `Order` 指令相同，不做赘述。

```yaml
enquire.example:
  type: enquire
  auth: 1
  scope: 2
  headers:
    - ps
  enable: true
  priority: 0
```

## `cookies.yml`

`genshin` 插件用于执行 `mys`, `uid`, `aby` 等指令所需的 `cookies` ，可配置多个。

```yaml
cookies:
  - cookieA
  - cookieB
```

## `genshin.yml`

`genshin` 插件相关配置。

### 默认配置

```yaml
cardWeaponStyle: normal
cardProfile: random
serverPort: 58612
showCharScore: true
wishLimitNum: 99
```

### `cardWeaponStyle`

用户信息查询卡片武器显示样式，可选 `normal`，`weaponA` 和 `weaponB` 。图例在依次在下方。

<center class="half">
  <img src="/demo/config/normal.png" alt="ERROR"/>
  <img src="/demo/config/weaponA.png" alt="ERROR"/>
  <img src="/demo/config/weaponB.png" alt="ERROR"/>
</center>

### `cardProfile`

用户信息查询卡片头像显示，可选 `random` 和 `user` 。设置为 `random` 时，头像会从玩家所用于的角色中随机抽取；设置为 `user` 时，头像为查询用户的 QQ 头像。

### `serverPort`

`genshin` 插件的后端端口，除非端口冲突否则不需要改动。

### `showCharScore`

角色信息查询是否显示评分。

### `wishLimitNum`

单次祈愿的最大抽取十连次数。