function showTutorial(index) {
    //if the user hits enter, move to the next step of the tutorial. If the tutorial is complete. Start the game and allow text input.
  
    switch (index) {
      case 0:
        outputText("Welcome to \'Prison Break\'. (hit ENTER to proceed past each step of the tutorial)")
        break
      case 1:
        outputText("You can call a direction in multiple ways.\'East\', \'Go North\', \'S\', \'Run Down\' and \'Exit up\' are all valid commands.")
        break
      case 2:
        outputText("You can interact with some entrances/exits using commands such as: \'Open [thing]\', \'Unlock [thing]\'.")
        break
      case 3:
        outputText("You can look at things with \'Look at [thing]\', \'X [thing]\', or \'Examine [thing]\'.")
        break
      case 4:
        outputText("And you can take them with \'Get [thing]\', or \'Take [thing]\'.")
        break
      case 5:
        outputText("At the top of the screen, you will see the exits available to you in every room that you enter.")
        updateExits("")
        break
      case 6:
        outputText("Check your inventory with \'Inventory\' or \'I\' and have another look at the room you're in by typing a \'Look at\' command with no subject.")
        break
      case 7:
        outputText("Make sure to read the description of each room carefully - there may be some useful information.")
        break
      case 8:
        outputText("Good luck. (hit ENTER to start)")
        break
      case 9:
        textbox.innerHTML = ""
        showRoom()
        gameStarted = true
        cli.contentEditable = true
    }
  }