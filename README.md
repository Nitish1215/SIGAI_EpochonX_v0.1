# Aura Code Translator

Aura is a Visual Studio Code extension that allows developers to seamlessly translate code between different programming languages using the advanced Gemini API. Whether you're migrating projects, exploring new languages, or curious about code translation, Aura simplifies the process by integrating AI-based code translation directly into your workflow.

## Features:
- **Multi-Language Translation**: Quickly convert code snippets from one programming language to another (e.g., Python to JavaScript, Java to C++, etc.).
- **Dynamic Language Selection**: Prompt users to choose source and target languages dynamically through simple input prompts.
- **Powered by Gemini API**: Utilize the Gemini API’s intelligent language translation capabilities to ensure accurate, high-quality code conversions.
- **In-Editor Translation**: Translate selected code directly within the editor without needing to leave VS Code.

## How to Use Aura:
1. Select the code snippet in your VS Code editor that you wish to translate.
2. Open the command palette (`Ctrl+Shift+P`) and run the `Translate Code using Aura` command.
3. Enter the source language (the language of the selected code).
4. Enter the target language (the language to translate the code into).
5. Aura will create a new file containing the translated version of the code.

## Supported Languages:
- Python
- JavaScript
- Java
- C++
- Ruby
- More languages based on the Gemini API’s support.

## Perfect for:
- Developers transitioning codebases between languages.
- Programmers learning new languages by seeing equivalent code translations.
- Quickly experimenting with syntax differences between languages.

## Requirements:
- A valid Gemini API key is required to use this extension. You can configure your API key in the extension settings under `Aura: API Key`.

## Installation:
1. Install the Aura extension from the VS Code marketplace or manually by packaging it.
2. Set your Gemini API key by going to `File > Preferences > Settings`, search for `Aura`, and input your API key in the `API Key` field.

## Known Issues:
- Error handling for unsupported languages may not be comprehensive yet.
- Some languages may produce less accurate translations depending on Gemini API's support.

## Contribution:
If you want to contribute or report an issue, feel free to open a pull request or issue on the [GitHub repository](https://github.com/).

---

Happy Coding with Aura!
