# Contributing to Markdown Editor Pro

First off, thank you for considering contributing to Markdown Editor Pro! It's people like you that make Markdown Editor Pro such a great tool.

## Where do I go from here?

If you've noticed a bug or have a feature request, make one! It's generally best if you get confirmation of your idea before you start coding.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for Markdown Editor Pro. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

**Before creating bug reports, please check** [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report).

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

#### Before Submitting a Bug Report

* **Check the [FAQs on the wiki](https://github.com/abidinfocrat/Mistral/wiki)** for a list of common questions and problems.
* **Check the [documentation](https://github.com/abidinfocrat/Mistral/blob/main/markdown-editor-extension/README.md)** for information about features and configuration.
* **Check if the issue has already been reported** by searching on GitHub under [Issues](https://github.com/abidinfocrat/Mistral/issues).
* **Check if the issue can be reproduced** using the latest version of the extension.

#### How Do I Submit a (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue and provide the following information:

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use Markdown code blocks.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.
* **If the problem is related to performance or memory**, include a CPU profile capture with your report.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

Provide more context by answering these questions:

* **Did the problem start happening recently** (e.g. after updating to a new version of Markdown Editor Pro) or was this always a problem?
* If the problem started happening recently, **can you reproduce the problem in an older version of Markdown Editor Pro?** What's the most recent version in which the problem doesn't happen?
* **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.

Include details about your configuration and environment:

* **Which version of VS Code are you using?** You can get the exact version by running `code --version` in your terminal, or by going to Help > About in VS Code.
* **What's the name and version of the OS you're using**?
* **What's the version of Markdown Editor Pro** you're using? You can find this in the Extensions view (Ctrl+Shift+X or Cmd+Shift+X) in VS Code.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Markdown Editor Pro, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion and find related suggestions.

**Before creating enhancement suggestions, please check** [this list](#before-submitting-an-enhancement-suggestion) as you might find out that you don't need to create one. When you are creating an enhancement suggestion, please [include as many details as possible](#how-do-i-submit-a-good-enhancement-suggestion).

#### Before Submitting an Enhancement Suggestion

* **Check if you're using the latest version** of Markdown Editor Pro.
* **Check the [documentation](https://github.com/abidinfocrat/Mistral/blob/main/markdown-editor-extension/README.md)** for information about existing features.
* **Check if there's already a feature request** that addresses your need by searching on GitHub under [Issues](https://github.com/abidinfocrat/Mistral/issues).
* **Determine [which repository the feature should be suggested in](#atom-and-packages).

#### How Do I Submit a (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue and provide the following information:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as Markdown code blocks.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of Markdown Editor Pro which the suggestion is related to.
* **Explain why this enhancement would be useful** to most Markdown Editor Pro users and isn't something that can or should be implemented as a separate extension.

### Your First Code Contribution

Unsure where to begin contributing to Markdown Editor Pro? You can start by looking through these `beginner` and `help-wanted` issues:

* [Beginner issues](https://github.com/abidinfocrat/Mistral/labels/beginner) - issues which should only require a few lines of code, and a test or two.
* [Help wanted issues](https://github.com/abidinfocrat/Mistral/labels/help%20wanted) - issues which should be a bit more involved than `beginner` issues.

Both issue lists are sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.

#### Local development

Markdown Editor Pro can be developed locally:

1. **Fork** the repository on GitHub
2. **Clone** the project to your own machine
3. **Install** dependencies with `npm install`
4. **Compile** the TypeScript with `npm run compile`
5. **Run** the extension in development mode by pressing `F5` in VS Code

#### Testing

You can run the existing tests with:

```bash
npm test
```

Or run the comprehensive test script:

```bash
./scripts/test.sh
```

### Pull Requests

* Fill in [the required template](https://github.com/abidinfocrat/Mistral/blob/main/markdown-editor-extension/.github/PULL_REQUEST_TEMPLATE.md)
* Do not include issue numbers in the PR title
* Follow the [JavaScript/TypeScript](#javascripttypescript-styleguide) styleguide
* Include thoughtfully-worded, well-structured [JSDoc comments](http://usejsdoc.org/) for new code
* Document new code based on the [Documentation Styleguide](#documentation-styleguide)
* End all files with a newline
* Avoid platform-dependent code
* Place requires/imports in the following order:
  * Built-in Node Modules (such as `path`, `util`, etc.)
  * Third party modules (such as `express`, `winston`, etc.)
  * Local modules/packages (using relative paths)
* Place class properties in the following order:
  * Class methods and properties (methods starting with `static` come first)
  * Instance methods and properties
* Avoid any violations from the [ESLint config](https://github.com/abidinfocrat/Mistral/blob/main/markdown-editor-extension/package.json) that includes ESLint Plugin Prettier
* See [how to properly test](#how-do-i-test-my-changes) for more details about testing

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🚀 `:rocket:` when deploying stuff
    * 🐛 `:bug:` when fixing a bug
    * 📝 `:memo:` when writing docs
    * ✨ `:sparkles:` when introducing new features
    * 🔧 `:wrench:` when changing configuration files
    * ⚰️ `:coffin:` when removing code or files
    * 🔥 `:fire:` when removing a lot of code or files
    * 💚 `:green_heart:` when fixing the CI
    * ❤️ `:heart:` when fixing a bug
    * 🍎 `:apple:` when fixing something on macOS
    * 🪟 `:windows:` when fixing something on Windows
    * 🐧 `:penguin:` when fixing something on Linux

### JavaScript/TypeScript Styleguide

All JavaScript/TypeScript code should follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with the following exceptions:

* Use TypeScript type annotations
* Use single quotes for strings
* Use 2 spaces for indentation
* Place commas last
* Always use semicolons
* Use `===` instead of `==`
* Use template literals for string concatenation

### Documentation Styleguide

* Use [Markdown](https://daringfireball.net/projects/markdown/).
* Reference methods and classes in backticks, e.g. `Request`
* Reference file paths in backticks, e.g. `\path\to\file`
* Use three backticks for code blocks:
  ```
  ```js
  code here
  ```
  ```
* Use [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown)
* Use [GitHub's task lists](https://help.github.com/articles/about-task-lists-in-github-issues) to track progress on todos

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

| Label name | Description |
| --- | --- |
| `bug` | Confirmed bugs or reports that are very likely to be bugs |
| `duplicate` | Issues or pull requests which are duplicates of other issues or pull requests |
| `enhancement` | Feature requests |
| `help wanted` | Issues which we need or want help from the community to resolve |
| `invalid` | Issues or pull requests which aren't valid (e.g. user errors) |
| `question` | Questions more than bug reports or feature requests (e.g. how do I do X) |
| `wontfix` | Issues which we've decided not to fix |
| `beginner` | Issues which only require a few lines of code, and a test or two |
| `documentation` | Issues or pull requests related to documentation |
| `needs-info` | Issues which need more information in order to work on them |

Thank you for your contributions!
