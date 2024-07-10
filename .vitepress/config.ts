import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	lang: "zh-cn",
	outDir: "./dist",
	srcDir: "./src",
	srcExclude: [ "./src/developer/*", "./src/pic_bed/*" ],
	title: "Adachi-Docs",
	description: "Adachi-BOT 文档",
	lastUpdated: true,
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		siteTitle: "Adachi-BOT",
		lastUpdatedText: "最后编辑于",
		outline: {
			label: "页面导航",
		},
		nav: [
			{ text: "部署", link: "/deploy/install/" },
			{
				text: "配置",
				items: [
					{ text: "基本配置", link: "/config/base.html" },
					{ text: "指令配置", link: "/config/commands.html" }
				]
			},
			{
				text: "插件",
				items: [
					{ text: "genshin", link: "/plugin/genshin/" }
				]
			},
			{
				text: "开发者",
				items: [
					{ text: "指南", link: "/guide/quick_start/" },
					{ text: "API", link: "/api/global/redis" },
					{ text: "v3 迁移文档", link: "/migration/guide/" }
				]
			},
			{ text: "FAQ", link: "/faq/" },
			{ text: "致谢", link: "/thank/" }
		],
		
		sidebar: {
			"/deploy/": [ {
				text: "安装",
				collapsable: false,
				items: [ {
					text: "环境准备",
					link: "/deploy/install/"
				}, {
					text: "手动部署",
					link: "/deploy/install/manual"
				} , {
					text: "Docker 部署",
					link: "/deploy/install/docker"
				} ],
			}, {
				text: "使用",
				collapsable: false,
				items: [ {
					text: "使用指令",
					link: "/deploy/use/"
				}, {
					text: "内置指令",
					link: "/deploy/use/built_in"
				}, {
					text: "配置文件",
					link: "/deploy/use/config"
				}, {
					text: "更新 bot",
					link: "/deploy/use/update"
				}, {
					text: "使用插件",
					link: "/deploy/use/plugin"
				} ],
			}, {
				text: "其他",
				collapsable: false,
				items: [ {
					text: "网页控制台",
					link: "/deploy/other/"
				} ],
			} ] ,
			"/plugin/genshin/": [ {
				text: "原神插件",
				collapsable: false,
				items: [ {
					text: "配置",
					link: "/plugin/genshin/"
				}, {
					text: "图片样例",
					link: "/plugin/genshin/picture"
				}, {
					text: "相关声明",
					link: "/plugin/genshin/statement"
				}, {
					text: "致谢",
					link: "/plugin/genshin/thanks"
				} ]
			} ],
			"/guide/": [ {
				text: "开始",
				collapsable: false,
				items: [ {
					text: "起步",
					link: "/guide/quick_start/"
				}, {
					text: "网页控制台",
					link: "/guide/quick_start/web_console"
				}, {
					text: "创建一个插件",
					link: "/guide/quick_start/new_plugin"
				} ]
			}, {
				text: "插件",
				collapsable: false,
				items: [ {
					text: "插件声明",
					link: "/guide/plugin/"
				}, {
					text: "公共 express-server",
					link: "/guide/plugin/public_server"
				}, {
					text: "适配热更新插件指令",
					link: "/guide/plugin/hot_update"
				}, {
					text: "下载插件静态资源",
					link: "/guide/plugin/static_resource"
				}, {
					text: "静态资源托管目录",
					link: "/guide/plugin/public_dirs"
				}, {
					text: "订阅服务支持",
					link: "/guide/plugin/subscribe"
				}, {
					text: "生命周期钩子",
					link: "/guide/plugin/lifecycle"
				}, {
					text: "图片渲染器",
					link: "/guide/plugin/pic_render"
				}, {
					text: "注册插件配置文件",
					link: "/guide/plugin/config_file"
				} ]
			}, {
				text: "指令",
				collapsable: false,
				items: [ {
					text: "介绍",
					link: "/guide/directive/"
				}, {
					text: "Order 指令",
					link: "/guide/directive/order"
				}, {
					text: "Switch 指令",
					link: "/guide/directive/switch"
				}, {
					text: "Enquire 指令",
					link: "/guide/directive/enquire"
				} ]
			}, {
				text: "全局工具类",
				collapsable: false,
				items: [ {
					text: "总览",
					link: "/guide/global/"
				}, {
					text: "redis",
					link: "/guide/global/redis"
				}, {
					text: "config",
					link: "/guide/global/config"
				}, {
					text: "client",
					link: "/guide/global/client"
				}, {
					text: "interval",
					link: "/guide/global/interval"
				}, {
					text: "file",
					link: "/guide/global/file"
				}, {
					text: "auth",
					link: "/guide/global/auth"
				}, {
					text: "message",
					link: "/guide/global/message"
				}, {
					text: "mail",
					link: "/guide/global/mail"
				}, {
					text: "command",
					link: "/guide/global/command"
				}, {
					text: "renderer",
					link: "/guide/global/renderer"
				} ]
			} ],
			"/api/": [ {
				text: "全局工具类 Api",
				collapsable: false,
				items: [ {
					text: "redis",
					link: "/api/global/redis"
				}, {
					text: "config",
					link: "/api/global/config"
				}, {
					text: "interval",
					link: "/api/global/interval"
				}, {
					text: "file",
					link: "/api/global/file"
				}, {
					text: "auth",
					link: "/api/global/auth"
				}, {
					text: "message",
					link: "/api/global/message"
				}, {
					text: "mail",
					link: "/api/global/mail"
				}, {
					text: "command",
					link: "/api/global/command"
				}, {
					text: "renderer",
					link: "/api/global/renderer"
				} ]
			}, {
				text: "通用工具 utils",
				collapsable: false,
				items: [ {
					text: "概览",
					link: "/api/utils/"
				}, {
					text: "progress",
					link: "/api/utils/progress"
				}, {
					text: "request",
					link: "/api/utils/request"
				} ]
			} ],
			"/migration/": [ {
				text: "指南",
				collapsable: false,
				items: [ {
					text: "概览",
					link: "/migration/guide/"
				}, {
					text: "新的增强功能",
					link: "/migration/guide/feature"
				}, {
					text: "破坏性变更",
					link: "/migration/guide/breaking_changes"
				} ]
			},  {
				text: "项目环境",
				collapsable: false,
				items: [ {
					text: "Cli 命令变更",
					link: "/migration/environment/"
				}, {
					text: "Redis 版本变更",
					link: "/migration/environment/redis"
				} ]
			},  {
				text: "核心库",
				collapsable: false,
				items: [ {
					text: "重写的 Client 核心类",
					link: "/migration/core/"
				}, {
					text: "重构的 Config 核心类",
					link: "/migration/core/config"
				}, {
					text: "Refresh 核心类变更",
					link: "/migration/core/refresh"
				}, {
					text: "通用工具类/方法",
					link: "/migration/core/utils"
				} ]
			},  {
				text: "插件",
				collapsable: false,
				items: [ {
					text: "新的插件入口定义",
					link: "/migration/plugin/"
				} ]
			},  {
				text: "指令",
				collapsable: false,
				items: [ {
					text: "新的指令入口定义",
					link: "/migration/directive/"
				}, {
					text: "新指令属性 priority",
					link: "/migration/directive/priority"
				}, {
					text: "order 指令参数的匹配内容",
					link: "/migration/directive/order_match"
				}, {
					text: "重写的 Enquire 指令",
					link: "/migration/directive/enquire"
				} ]
			} ]
		},
		
		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © 2021-2024 SilveryStar"
		},
		
		socialLinks: [
			{ icon: "github", link: "https://github.com/SilveryStar/Adachi-BOT" }
		]
	}
})
