# Daily Feed Mail [![Codacy Badge](https://api.codacy.com/project/badge/Grade/e1f4014a50a14f979d8eefc1debee2e7)](https://app.codacy.com/app/luyiping1011/daily-feed?utm_source=github.com&utm_medium=referral&utm_content=glazec/daily-feed&utm_campaign=Badge_Grade_Dashboard)

Inspired by [Node Mail](https://github.com/Vincedream/NodeMail)

## Introduction

This is a project aim to send custom feed email to your lover everyday.
发送个人定制的每日信息流邮件给你心爱的人。

## Install

**SMTP is deprecated, please try to use SendGrid which can avoid mail delivery issue**

1. Configure your google cloud, ensure that it can deploy serverless function and make your own scheduled task.

2) install gcloud CLI(You can also deploy through web)

3. Configure sendgrid and get api key(if you are student, try to get github student pack)

4) Configure the \_config.yaml

5. enter the ./google_cloud_function/feed_mail and exec following command.

```bash
cd ./google_cloud_function/feed_mail
npm install
gcloud functions deploy feedMail --runtime nodejs8 --trigger-http --env-vars-file ../../_config.yaml

```

6. Deploy google_cloud_function/form/index.html in a web-hosted server(like netlify). Subsitute the action value in `<form action=''>` with your feed_mail http trigger url.

7) Put the url which hosted form/index.html into \_config.yaml

8. enter the ./google_cloud_function/grant_mail and exec following commands

```bash
cd ./google_cloud_function/grant_mail
npm install
gcloud functions deploy grantMail --runtime nodejs8 --trigger-topic set_your_own_trigger_topic_for_scheduled_task_purpose --env-vars-file ../../_config.yaml
```

## Usage

In the scheduled time, the grant_mail will send you a confirm mail. You click the link in the mail, and summarize your yesterday, then click send. It will trigger the feed_mail function.

## Why

Why not make everything automation?

To show the love to your friend. I have simplified most step with simple clicks.

Why chart/index.html

The gmail doesn't support chart element, thus host any input field inaner html.

## Todo

- [ ] Pulumi Support
- [ ] Add configure option
- [ ] Add test
