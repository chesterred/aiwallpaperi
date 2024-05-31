用集合页面来匹配关键字 
集合页内容=描述+各种title
link=slug

详情页：
uuid加上关键字,关键字=谷歌搜索词生成的title.
slug=title+uuid
左边展示图+右边操作
展示图：hover有按钮+add your face
操作栏：描述+上传按钮

wallpaper:
个人用户
系统用户

cover图：判断uuid为系统用户
用户图：抓取uuid为该用户的图

登陆不充值可以生成,登陆充值才能下载高清无水印.

不登陆可以生成,登陆充值才能下载高清无水印.
换成换脸

# AI Wallpaper

AI Wallpaper Generator by [aiwallpaper.shop](https://aiwallpaper.shop)

## Live Demo

[https://aiwallpaper.shop](https://aiwallpaper.shop)

![demo](./preview.png)

## Quick Start

1. clone project

```shell
git clone https://github.com/all-in-aigc/aiwallpaper
```

2. install dependencies

```shell
cd aiwallpaper
pnpm install
```

3. init database

create your database use [local postgres](https://wiki.postgresql.org/wiki/Homebrew) or [vercel-postgres](https://vercel.com/docs/storage/vercel-postgres) or [supabase](https://supabase.com/)

create tables from sql at `data/install.sql`

4. set environmental values

put `.env.local` under `aiwallpaper` root dir with values list below

```
OPENAI_API_KEY=""

POSTGRES_URL=""

AWS_AK=""
AWS_SK=""
AWS_REGION=""
AWS_BUCKET=""

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

STRIPE_PUBLIC_KEY=""
STRIPE_PRIVATE_KEY=""

WEB_BASE_URI=""
```

5. local development

```shell
pnpm dev
```

open `http://localhost:3000` for preview

## Credit to

- [gpts.works](https://gpts.works) for code reference
- [nextjs](https://nextjs.org/docs) for full-stack development
- [clerk](https://clerk.com/docs/quickstarts/nextjs) for user auth
- [aws s3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html) for image storage
- [stripe](https://stripe.com/docs/development) for payment
- [node-postgres](https://node-postgres.com/) for data processing
- [tailwindcss](https://tailwindcss.com/) for page building

## Other Things

you can contact me at Twitter: https://twitter.com/idoubicc

if this project is helpful to you, buy be a coffee.

<a href="https://www.buymeacoffee.com/idoubi" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
