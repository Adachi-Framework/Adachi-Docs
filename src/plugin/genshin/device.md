# 绑定设备

默认情况下，本插件使用一个**随机生成**的设备信息来尝试获取插件所需要的角色数据。
由于该设备信息由所有使用 bot 的用户共同使用，会导致认定为非法设备，无法正常获取数据，或是高频触发验证码。

插件提供了**绑定设备**的指令，允许每一个使用者使用自己提供的真实设备信息来请求数据。默认情况下为 `#device_bind`，该指令仅在用户绑定了 ck 之后才能使用。

## 获取设备信息

### 方法一

手动抓包，较繁琐，好处是 IOS 与 Android 均可使用。

1. 使用抓包工具获取米游社 App 的请求信息。
2. 在请求头（Request Headers）中找到 `x-rpc-device_id` 和 `x-rpc-device_fp` 字段
3. 自行构建 JSON 数据，格式如下：
    ```json
    {"device_id": "x-rpc-device_id 的内容", "device_fp": "x-rpc-device_fp 的内容"}
    ```
4. 使用 `#device_bind` 指令，收到 BOT 提示后，直接发送上述构建的数据内容，绑定完成

### 方法二

该方法操作比较简单，下载一个开源软件即可，但只有 Android 才能使用。

1. 前往 [forchannot/get_device_info](https://ghproxy.mihomo.me/https://raw.githubusercontent.com/forchannot/get_device_info/main/app/build/outputs/apk/debug/app-debug.apk) 获取软件
2. 使用常用米游社的手机安装
3. 打开后点击 `点击查看信息` - `点击复制`
4. 与方法一一致，触发指令后直接粘贴发送即可完成绑定

> 使用该方法会向 BOT 拥有者暴露你的详细设备信息，请务必确保对方可信

# 致谢

本功能参考 [ZZZure/ZZZ-Plugin](https://github.com/ZZZure/ZZZ-Plugin) 实现