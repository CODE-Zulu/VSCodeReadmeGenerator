// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const {window, commands, Uri} = vscode;

const path = require('path');
const fs = require('fs');
let markdown_preview_command_id = "";
markdown_preview_command_id = "markdown.showPreviewToSide";
let close_other_editor_command_id = "";
close_other_editor_command_id = "workbench.action.closeEditorsInOtherGroups";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function markdownPreviewGenerator() {
	commands.executeCommand(markdown_preview_command_id).then(() => {}, (e) => console.error(e));
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "readmegen" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('readmegen.createReadme', function () {
		// The code you place here will be executed every time your command is executed

	const folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
		// Display a message box to the user
	let markdownContent = 
	dedent`# Project Title

	Simple overview of use/purpose.
	
	## Description

	An in-depth paragraph about your project and overview of use.
	
	## Getting Started

	### Dependencies

	* Describe any prerequisites, libraries, OS version, etc., needed before installing program.
	* ex. Windows 10

	### Installing

	* How/where to download your program
	* Any modifications needed to be made to files/folders

	### Executing program

	* How to run the program
	* Step-by-step bullets
	\`\`\`
	code blocks for commands
	\`\`\`

	## Help

	Any advise for common problems or issues.
	\`\`\`
	command to run if program contains helper info
	\`\`\`

	## Authors

	Contributors names and contact info

	ex. Dominique Pizzie  
	ex. [@DomPizzie](https://twitter.com/dompizzie)

	## Version History

	* 0.2
		* Various bug fixes and optimizations
		* See [commit change]() or See [release history]()
	* 0.1
		* Initial Release

	## License

	This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

	## Acknowledgments

	Inspiration, code snippets, etc.
	* [awesome-readme](https://github.com/matiassingers/awesome-readme)
	* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
	* [dbader](https://github.com/dbader/readme-template)
	* [zenorocha](https://gist.github.com/zenorocha/4526327)
	* [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)`
	 
		fs.writeFile(path.join(folderPath, "readme.md"), markdownContent, (err) => {
			console.log(err)
				let file = (folderPath + "\\readme.md");
				commands.executeCommand('vscode.openFolder', Uri.file(file))
			.then((param) => {
				console.log('hey',param);
				commands.executeCommand('markdown.showPreviewToSide').then(() => {}, (e) => console.error(e));
			}, (e) => {
				console.error(e)
			})
		})
	});

	context.subscriptions.push(disposable);
}

function dedent(callSite, ...args) {

    function format(str) {

        let size = -1;

        return str.replace(/\n(\s+)/g, (m, m1) => {

            if (size < 0)
                size = m1.replace(/\t/g, "    ").length;

            return "\n" + m1.slice(Math.min(m1.length, size));
        });
    }

    if (typeof callSite === "string")
        return format(callSite);

    if (typeof callSite === "function")
        return (...args) => format(callSite(...args));

    let output = callSite
        .slice(0, args.length + 1)
        .map((text, i) => (i === 0 ? "" : args[i - 1]) + text)
        .join("");

    return format(output);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
