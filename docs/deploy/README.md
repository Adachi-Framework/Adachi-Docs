# 应用部署

::: tip
以下内容仅介绍 Linux 环境中部署方式，两种方式 Docker 和 PM2 任选其一。如果你希望在 Windows 中部署，请参考 [这里](./windows.md)
:::

## 安装及启动

### Docker

```bash
git clone https://ghproxy.com/https://github.com/SilveryStar/Adachi-BOT.git
cd Adachi-BOT

# 初次运行将在根目录 config 文件夹下生成配置文件模板
# 根据右上角「配置」选项中的信息配置 setting.yml
docker-compose up -d

# 配置无误后重启项目
docker-compose restart
# 若未正常启动，可执行 docker-compose logs -tf --tail 100 来查看错误信息。
```

### PM2

```bash
git clone https://ghproxy.com/https://github.com/SilveryStar/Adachi-BOT.git
cd Adachi-BOT
npm install --registry=https://registry.npmmirror.com/

# 初次运行将在根目录 config 文件夹下生成配置文件模板
# 根据右上角「配置」选项中的信息配置 setting.yml
npm start

# 确保你已经在 56379 端口上运行 Redis 数据库
# 不会启动数据库的可以参考右上角「FAQ」中的信息
npm run restart
# 若未正常启动，可执行 pm2 log adachi-bot 查看错误信息
# 若提示 pm2: command not found，则需执行 npm install -g pm2 进行安装
```

## 更新

### Docker

```bash
# 注意需在 Adachi-BOT 根目录中运行命令
git pull

# 如果更新涉及 Dockerfile 文件则需要 docker-compose down 然后 docker-compose up -d --build
docker-compose restart
```

### PM2

```bash
# 注意需在 Adachi-BOT 根目录中运行命令
git pull

# 如果提示本地有更改可通过 git checkout package*.json (一般会改动的都是package-lock.json文件)
# 如果改的了其他的可用 git reset --hard 把本地改过的全部回滚。
npm restart
```

下载`zip`包的方式非常不推荐，但你实在想要用，那么要想更新则需要备份项目里的`database`、`data`、`config`、`src\plugins\你安装的插件`等文件，重新下载`zip`
包，然后把这些文件按照它原本的位置放在新的项目文件夹里。

### 指令更新

使用指令更新的前提是你是通过`git`下载的项目，下载`zip`包的方式不可用该方式。

```
命令: <header> upgrade
范围: 私聊
权限: BOT主人 (Master)
```

## 停止

若你想停掉该项目的运行，同样一句指令即可
```bash
### Docker
docker-compose down

### PM2
npm stop
```

