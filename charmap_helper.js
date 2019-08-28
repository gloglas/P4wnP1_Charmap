
_clipboard = "";

// You need to be TABBED in char list or just use open() function
function findChars(str, _delay){
  // Actual position
  var _x = 0;
  var _y = 0;
  
  var charMap = [  
    // Most used chars
    ['!','"','#','$','%','&','\'','(',')','*','+',',','-','.','/','0','1','2','3','4'],
    ['5','6','7','8','9',':',';','<','=','>','?','@','A','B','C','D','E','F','G','H'],
    ['I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','[','\\'],
    [']','^','_','`','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'],
    ['q','r','s','t','u','v','w','x','y','z','{','|','}','~',' ','¡','¢','£','¤','¥']
    // You can edit / expand this array
  ];
  
  // Let's go character by character
  for( var i=0; i < str.length; i++){
    // Search only for chars that you can't type (Numbers,z,y) and don't add already pasted ones
    if(_clipboard.indexOf(str[i]) < 0){
      if( !str[i].match("/^([0-9]|[a-z])+([0-9a-z]+)$/i") || str[i].toLowerCase() == 'y' || str[i].toLowerCase() == 'z' ){
      
        // Destination
        var _goX = -1;
        var _goY = -1;
  
        //Find position of char by 2D array
        for(var jj = 0; jj < 5; jj++){
          for(var kk = 0; kk < 20; kk++){
            if(charMap[jj][kk] == str[i]){
              _goX = jj;
              _goY = kk;
            }
          }
        }
        // If there is no occurrence
        if(_goX == -1) continue;
        
        // Calculate steps
        var _timesX = (_x - _goX);
        var _timesY = (_y - _goY);
      
        // Get directions and move
        if( _timesX > 0) {
          for(var iii=0; iii < _timesX;iii++)
          {
            press("UP");
            delay(_delay);
          }
        }
        else if( _timesX < 0) {
          for(var iii=0; iii < -1*_timesX;iii++)
          {
            press("DOWN");
            delay(_delay);
          }
        }
          
        if( _timesY < 0) {
          for(var iii=0; iii < -1*_timesY;iii++)
          {
            press("RIGHT");
            delay(_delay);
          }
        }
        else if( _timesY > 0){
          for(var iii=0; iii < _timesY;iii++)
          {
            press("LEFT");
            delay(_delay);
          }
        }
     
        // Set a new position
        _x = _goX;
        _y = _goY;

        // Select a character
        press("ENTER");

        // Add character to overview
        _clipboard += str[i];
      }
    }
  }
}
function print(str, _delay){
  for(var i=0; i < str.length; i++){
    
    // If character is not present in clipboard write it, otherwise do a clippy thing.
    if( _clipboard.indexOf(str[i]) < 0)
      type(str[i]);
    else
    {
      //Paste clipboard
      press("CTRL v");
      delay(_delay);

      // Delete after the character
      for( var j=0; j < _clipboard.length-_clipboard.indexOf(str[i])-1; j++)
        press("BACKSPACE");

      // Get before the character
      press("LEFT");

      // Clear mess
      for( var j=0; j < _clipboard.indexOf(str[i]); j++)
        press("BACKSPACE");

      // Continue typing after character
      press("RIGHT"); 
    }
    
  }
}

// Aditional helpers
function open(_font, _windowDelay, _guiDelay)
{
    press("GUI r");
    delay(_guiDelay);
    
    // remove .exe to be even faster!
    type("charmap.exe");
    press("ENTER");
    delay(_windowDelay);
    // Set font to Arial (or 6x 's' to Segoe UI)
    type(_font);

    // Navigate to the list
    press("TAB");
    press("TAB");
}
function close( _delay, _ctrlA)
{
    // Copy characters first
    press("TAB");
    delay(_delay);
    // remove CTRL+A to go even faster!
    if(_ctrlA){
      press("CTRL a");
      delay(_delay);
    }
    
    press("CTRL c");
    delay(_delay);
    
    // Then close charmap
    press("ALT F4");
}
function clearClipboard()
{
  press("SPACE");
  press("SHIFT LEFT");
  press("CTRL x");
}

// Open charmap and TAB in
open("_Arial",1200,600);
// Use arrows to find defined characters in string
findChars("?:'!\\Y()");
// Copy characters & close
close(10,10);

// Demo
press("GUI");
delay(200);

// Write with no limit! :)
print("?\\You're Welc(:)me!",30);
