# P4wnP1_Charmap
Don't bother with layouts on windows!

JS Helper for amazing project [P4wnP1_aloa](https://github.com/mame82/P4wnP1_aloa)

Note: This is my rewrited library from Arduino C++: [link](https://github.com/gloglas/HID_Charmap)

## Usage
### Open charmap
```js
// I left in README c++ data types just for a case
function open(String _font="Arial", int _windowDelay=700, int _guiDelay=300);
```
First you need to open a charmap. Simply by pressing **GUI+r** (third argument is delay for Run to show) and typing **charmap.exe**.  
Then second argument specifies how long will script wait for charmap to show up.  
After that set font and 2x **TAB** to character field.
### Find characters
```js
function findChars(String str, int _delay=5);
```
When you are in character field and you are able to move with arrows, you need to find characters. 
I made 2D array with first 5 most important rows of characters from charmap.exe. Function will go through string char by char.  
If character is not a letter it will try to find it in array. After that it will use array indexes to navigate in charmap.exe itself.  
Delay is in this case for arrows.  
### Obtain characters and close charmap
```js
function close(int _delay=5,bool _ctrlA=false);
```
TAB in to character field. If _ctrlA is true it will press that combination to select characters but it is unnecessary.  
Then it will copy and close charmap (CTRL+c, ALT+F4)  
Delay is after every shortcut.  
### Print using clipboard
```js
function print(String str, int _delay=0);
```
Print function will go character by character, if the character is in clipboard it will paste whole clipboard and with help of indexes it will delete the useless characters.


<!-- WIP don't judge. English is my foreign language -->
## Why I did it?
If you ever have written a duckyscript you have experienced problems with different keyboard layouts.
It's pain especially on windows where they can be switched (with ALT-SHIFT), but you never know what windows decides to do or how many layouts are there. So I was like hmm... let's use this in powershell
```powershell
Set-WinUserLanguageList -LanguageList en-US -Force
```  
But it has a few problems...
1. It doesn't work on Windows 7.
2. You can't write it because of layout problem.
3. You will mess up user settings.

Charmap's layout is still same... so we can use that to get special characters that we need to the clipboard and when it's time to use them you just paste the whole clipboard and delete characters that you don't need.
1. Longer execution time (tweak delays for yourself)
2. You will use/clear clipboard
3. But special characters will work! 
