# 生命周期钩子

bot 在启动后，将会依次读取插件的入口配置对象，获取插件所注册的生命周期钩子函数。
待所有插件入口配置文件读取完毕并**成功连接到实现端**后，才会开始处理插件生命周期钩子函数。

> 之所以要等待实现端成功连接，是为了避免一些意外错误发生，如未连接时尝试与实现端通讯。

目前每个插件仅有两个生命周期钩子：`mounted` 与 `unmounted`，均可以在插件配置对象中定义，支持同步或异步方法。他们使插件开发者可以在特定阶段运行自己的代码。

## 全部钩子函数

### mounted

当插件初次加载与重载时，执行此钩子函数。重载时会在 `unmounted` 之后执行。

> 我们强烈推荐你在 `mounted` 生命周期钩子函数中进行原来的插件的初始化行为。这样可以有效的避免一些加载顺序导致的变量未定义情况，例如其他文件在通过 `import bot from "ROOT"` 使用框架库时提示 `bot 未定义`。

### unmounted

当插件重载时，会先执行此钩子函数。

> 由于重载操作会在执行完此钩子函数后再次执行 [mounted()](#mounted) 钩子函数，请务必在此处释放会多次重复加载的开销代码，或是监听的端口。

## 钩子函数参数

每一个钩子函数均接受类型为 `PluginParameter` 的形参，包含 `BOT` 核心类与额外的配置项注册方法 `configRegister`、渲染器注册方法 `renderRegister` 与别名设置方法 `setAlias`。

### setAlias

用于设置插件的别名，插件的别名可用于 更新插件、重载插件 等命令。

```ts
export default definePlugin( {
    // ...
    mounted( params ) {
        params.setAlias( [ "茉莉" ] );
    }
} );
```

### refreshRegister

其使用方式与原来的 `bot.refresh.register` 方法完全相同，为了替代后者而诞生。

```ts
export default definePlugin( {
    // ...
    mounted( params ) {
        params.refreshRegister( () => {
            // 刷新方法
        } );
    }
} );
```

### renderRegister

`PluginSetting.renderer.register` 的插件便捷使用方式。

免去了提供第一个参数 `route`，自动以 `/插件名（插件目录名）` 作为基地址来注册渲染器。