import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';

// A mapping of programming languages to their common file extensions
const languageExtensions: { [key: string]: string } = {
    'python': 'py',
    'javascript': 'js',
    'java': 'java',
    'cpp': 'cpp',
    'ruby': 'rb',
	'c':'c'
    // Add other languages and their extensions as needed
};

export function activate(context: vscode.ExtensionContext) {
    // Register the command for code translation
    let disposable = vscode.commands.registerCommand('extension.translateCodeAura', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            // Step 1: Retrieve the API key from settings
            const configuration = vscode.workspace.getConfiguration('aura');
            const apiKey = configuration.get<string>('apiKey');  // Personalize: API key input by user
            
            if (!apiKey || apiKey.trim() === "") {
                vscode.window.showErrorMessage('API Key is missing. Please configure your Google Gemini API key in the settings.');
                return;
            }

            // Step 2: Ask user for source language
            const sourceLang = await vscode.window.showInputBox({
                placeHolder: 'Enter source language (e.g., python, java, javascript)',
                prompt: 'From which language would you like to translate?'
            });

            if (!sourceLang) {
                vscode.window.showErrorMessage('Source language is required!');
                return;
            }

            // Step 3: Ask user for target language
            const targetLang = await vscode.window.showInputBox({
                placeHolder: 'Enter target language (e.g., python, java, javascript)',
                prompt: 'To which language would you like to translate?'
            });

            if (!targetLang) {
                vscode.window.showErrorMessage('Target language is required!');
                return;
            }

            // Step 4: Get the selected code in the editor
            const code = editor.document.getText(editor.selection);
            if (!code) {
                vscode.window.showErrorMessage('No code selected for translation.');
                return;
            }

            try {
                // Step 5: Call the Gemini API to translate the code
                const translatedCode = await translateCodeWithGemini(apiKey, code, sourceLang, targetLang);

                // Step 6: Create a new file with the translated code
                await createNewFileWithTranslatedCode(translatedCode, targetLang, editor.document.fileName);

                vscode.window.showInformationMessage('Code translated and saved to new file successfully!');
            } catch (error) {
                if (error instanceof Error) {
                    vscode.window.showErrorMessage(`Error translating code: ${error.message}`);
                } else {
                    vscode.window.showErrorMessage('Error translating code: Unknown error');
                }
            }
        }
    });

    context.subscriptions.push(disposable);
}

// Function to call the Gemini API using GoogleGenerativeAI
async function translateCodeWithGemini(apiKey: string, code: string, sourceLang: string, targetLang: string): Promise<string> {
    // Initialize the GoogleGenerativeAI client
    const genAI = new GoogleGenerativeAI(apiKey);

    // Specify the model to use (in this case "gemini-1.5-flash")
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Prepare the prompt to translate code
    const prompt = `Translate this ${sourceLang} code to ${targetLang}: ${code} give the code without any explanation. and give the code as plain text without any additional formatting`;

    // Make the API request
    const result = await model.generateContent(prompt);

    if (result && result.response && result.response.text) {
        return result.response.text();
    } else {
        throw new Error('Failed to get a valid response from Gemini API.');
    }
}

// Function to create a new file with the translated code
async function createNewFileWithTranslatedCode(translatedCode: string, targetLang: string, originalFilePath: string) {
    const extension = languageExtensions[targetLang.toLowerCase()];
    if (!extension) {
        throw new Error(`Unsupported target language: ${targetLang}`);
    }

    const originalDir = path.dirname(originalFilePath);
    const originalFileName = path.basename(originalFilePath, path.extname(originalFilePath));
    const newFileName = `${originalFileName}.${extension}`;
    const newFilePath = path.join(originalDir, newFileName);

    fs.writeFileSync(newFilePath, translatedCode);

    const document = await vscode.workspace.openTextDocument(newFilePath);
    vscode.window.showTextDocument(document);
}

export function deactivate() {}
