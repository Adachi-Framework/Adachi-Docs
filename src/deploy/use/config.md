# 配置文件

启动 bot 后，在 `config` 目录下将会生成繁多配置文件。其中**插件**的配置文件以文件夹形式存放，而 **bot 本体**的配置文件则直接放置于一级目录下。

可以参考 [配置项](../../config/base) 来参考各个配置项的作用。

## 修改生效

要想修改后的配置文件生效，除了重启 bot 以外，还可以通过向 bot 发送 `refresh` 指令来热重载配置文件。

亦或是在[网页控制台](../other/index)中点击**刷新配置**按钮，热重载配置文件。