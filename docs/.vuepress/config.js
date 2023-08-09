module.exports = {
    title: "Adachi-Docs",
    description: "Adachi-BOT 文档",
    base: "/",
    head: [
        [ "link", { rel: "icon", href: "/favicon.ico" } ]
    ],
    themeConfig: {
        sidebar: "auto",
        nav: [
            { text: "部署", link: "/deploy/" },
            { text: "配置", link: "/config/" },
            { text: "致谢", link: "/thank/" },
            { text: "图片", link: "/picture/" },
            { text: "声明", link: "/statement/" },
            { text: "开发者", link: "/developer/" },
            { text: "控制台", link: "/web-console/" },
            { text: "FAQ", link: "/faq/" },
            { text: "GitHub", link: "https://github.com/SilveryStar/Adachi-BOT" }
        ]
    }
}