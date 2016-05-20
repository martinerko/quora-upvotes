# Quora Upvotes
Are you addicted to reading [Quora.com](https://www.quora.com/)? If so, I believe you are also using this great [upvoting](https://www.quora.com/topic/Upvoting-and-Downvoting-Quora-feature) feature to "mark" all those interesting answers to even more interesting questions.

Have you ever tried to find some of your upvoted answers, maybe just because you would like to read it again to refresh your mind? It's not so easy, as Quora.com doesn't officially support this feature.

This tool will help you to find a list of (up to last 50) upvoted answers for specified profile. Yours or someone else's.

## Installation

```sh
npm install -g quora-upvotes
```

## Usage
This tool is provided with a help:

```sh
quora-upvotes -h
```

To get a list of upvoted answers for specific profile, simply use:

```sh
quora-upvotes -p <profile-name>
```

You can convert the output directly to Markdown version with active links, so it will become even easier to navigate to given answer.

```sh
quora-upvotes -p <profile-name> -m
```

For example:

```sh
quora-upvotes -p Adam-DAngelo
```

```sh
quora-upvotes -p Adam-DAngelo -m > upvotes.md
```

### Profile name
To find your profile name, simply navigate to your profile detail and
check the URL address in your browser.

www.quora.com/profile/**[profile-name]**
