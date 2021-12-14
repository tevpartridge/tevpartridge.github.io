function checkInput(e) {
  // check if the player has hit enter and pass the contents of the text input into the command parser
  if (e.key == 'Enter') {
    command = cli.textContent;
    cli.innerHTML = ""
    if (!gameEnded) {
      parser(command)
    } else {
      endingCommandParser(command)
    }
    e.stopPropagation()
    e.preventDefault()
  }
}

function endingCommandParser(cmd) {
  //command parser for unique commands used only in the ending - regular commands need to be ignored
  let commandWords = cmd.trim().toUpperCase().split(" ")
  switch (commandWords.length) {
    case 1:
      switch (commandWords[0]) {
        case "":
          if(escapeIndex != 3){
            escapeIndex++
            handleEscapeSequence(escapeIndex)
          }else{
            outputText("Don't just stand there.")
          }
          break
        case "NO":
          outputText("He's not going to take no for an answer.")
      }
      break
    case 2:
      switch (commandWords[0]) {
        case "HOLD":
          switch (commandWords[1]) {
            case "IT":
              if (escapeIndex == 3) {
                escapeIndex++
                handleEscapeSequence(escapeIndex)
              }
              break
            default:
              outputText("He wants you to hold the spoon.")
          }
          break
        default:
          outputText("He's just asking you to hold the spoon.")
      }
      break
    default:
      outputText("Just say you'll hold the spoon already.")
  }
}

function parser(cmd) {
  // check which command the player has inputted and deal with it accordingly.
  // output an error message if the command is invalid

  let commandWords = cmd.trim().toUpperCase().split(" ")
  switch (commandWords.length) {
    case 1:
      switch (commandWords[0]) {
        case "NORTH":
        case "N":
        case "EAST":
        case "E":
        case "SOUTH":
        case "S":
        case "WEST":
        case "W":
        case "UP":
        case "U":
        case "DOWN":
        case "D":
          moveRoom(commandWords[0].charAt(0))
          break
        case "LOOK":
        case "X":
        case "EXAMINE":
        case "L":
          showRoom(currentPosition)
          break
        case "I":
        case "INVENTORY":
          showInventory()
          break
        case "OPEN":
        case "GET":
        case "TAKE":
        case "UNLOCK":
          outputText(cmd[0].toUpperCase() + cmd.substring(1) + " what?")
          break
        case "GO":
        case "EXIT":
        case "WALK":
        case "RUN":
          outputText("To where?")
          break
        case "HELP":
        case "H":
          outputText("There's no one here to help you")
          break
        case "":
          tutorialIndex++
          showTutorial(tutorialIndex)
          break
        default:
          outputText("I don't know how to \"" + cmd + "\"")
      }
      break
    case 2:
      switch (commandWords[0]) {
        case "GO":
        case "EXIT":
        case "WALK":
        case "RUN":
          moveRoom(commandWords[1])
          break
        case "LOOK":
        case "L":
        case "X":
        case "EXAMINE":
          lookAt(commandWords[1])
          break
        case "OPEN":
          tryDoor(commandWords[1])
          break
        case "UNLOCK":
        case "UNSCREW":
          unlockDoor(commandWords[1])
          break
        case "GET":
        case "TAKE":
          tryGetting(commandWords[1])
          break
        default:
          outputText("I don't know how to \"" + commandWords[0].toLowerCase() + "\"")
      }
      break
    case 3:
      switch (commandWords[0]) {
        case "GO":
        case "EXIT":
        case "WALK":
        case "RUN":
          moveRoom(commandWords[1])
          break
        case "LOOK":
        case "EXAMINE":
        case "L":
        case "X":
          if (commandWords[1] == "AT") {
            lookAt(commandWords[2])
          } else if (commandWords[1] == "THE") {
            lookAt(commandWords[2])
          }
          break
        case "GET":
        case "TAKE":
          if (commandWords[1] == "THE") {
            tryGetting(commandWords[2])
          }
          break
        case "OPEN":
          if (commandWords[1] == "THE") {
            tryDoor(commandWords[2])
          } else {
            tryDoor(commandWords[1])
          }
          break
        case "UNLOCK":
        case "UNSCREW":
          if (commandWords[1] == "THE") {
            unlockDoor(commandWords[2])
          } else {
            unlockDoor(commandWords[1])
          }
          default:
            outputText("I don't know how to \"" + commandWords[0].toLowerCase() + "\"")
      }
      break
    default:
      outputText("Maybe try a simpler command.")
  }
}

function showInventory() {
  let inventory = []

  //Identify which items are in the inventory
  for (let i = 0; i < items.length; i++) {
    if (items[i].location == INVENTORY) {
      inventory.push(items[i].label)
    }
  }
  //if there is something in the inventory, output the array as a string
  if (inventory.length > 0) {
    outputText("Here's what you have in your pockets: " + inventory.join(", ").toLowerCase())
  } else {
    outputText("There's nothing in your pockets.")
  }

}

function tryGetting(item) {
  // If the target item exists, is visible and is gettable - add it to the inventory 
  if (assignItem(item) && itemToUse.location != INVENTORY && itemToUse.isGettable && itemToUse.isVisible) {
    itemToUse.location = INVENTORY
    outputText("Ok. You took the " + itemToUse.label.toLowerCase() + ".")
  } else if (assignItem(item) && itemToUse.location == currentPosition) {
    outputText("I can't take that.")
  } else {
    outputText("I don't see one of those")
  }
}

function assignItem(item) {
  //loop through all items and return true if the given parameter (item) matches the label of an item in the items[] array and that item is in the current room
  //this object is then assigned to the global itemToUse variable
  //otherwise, the function returns false and itemToUse = null
  itemToUse = null

  for (let i = 0; i < items.length; i++) {
    if (items[i].label.includes(item) && (items[i].location == INVENTORY || items[i].location == currentPosition)) {
      itemToUse = items[i]
    }
  }
  if (!itemToUse) {
    return false
  }
  return true
}

function assignDoor(inp) {
  // loop through all doors and return true if the given parameter (inp) matches the label of a door in the doors[] array
  // assign that object to the global doorToUse variable
  //otherwise, the function returns false and itemToUse = null
  doorToUse = null
  for (let i = 0; i < doors.length; i++) {
    if (doors[i].location == currentPosition && doors[i].label.includes(inp.toUpperCase())) {
      doorToUse = doors[i]
    }
  }
  if (!doorToUse) {
    return false
  }
  return true
}

function unlockDoor(inp) {
  // check what the user is trying to unlock and if it is locked
  // if you have the required key, unlock it
  if (assignDoor(inp) && doorToUse.isLocked) {
    switch (doorToUse.label) {
      case "DOOR":
        if (assignItem("KEYS") && doorToUse.canOpen) {
          doorToUse.isLocked = false
          outputText("You unlocked the door, you can now open it.")
        } else {
          outputText("You don't have the key to this door.")
        }
        break
      case "VENT-GRATE-VENTILATION":
        if (assignItem("SCREWDRIVER")) {
          doorToUse.isLocked = false
          outputText("You unscrewed the grate. Looks like the vent can be opened now.")
        } else {
          outputText("The screws are too tight to remove with your hands.")
        }
    }
  } else if (assignDoor(inp) && !doorToUse.isLocked) {
    outputText("It's already unlocked.")
  } else if (assignItem(inp)) {
    outputText("I can't unlock that.")
  } else {
    outputText("I don't see one of those.")
  }
}

function tryDoor(inp) {
  // check what the user is trying to open and if it is locked/already open
  // if not, open the door and add an exit to the current room's exits value
  if (assignDoor(inp)) {
    if (!doorToUse.isLocked && !doorToUse.isOpen) {
      doorToUse.isOpen = true
      outputText("It swings open.")
      rooms[currentPosition].exits += doorToUse.orientation
      updateExits(rooms[currentPosition].exits)
    } else if (doorToUse.isLocked && doorToUse.label == "VENT-GRATE-VENTILATION") {
      outputText("The grate covering it is screwed in tight.")
    } else if (doorToUse.isLocked) {
      outputText("It's locked.")
    } else if (doorToUse.isOpen) {
      outputText("It's already open.")
    }
  } else if (assignItem(inp)) {
    outputText("I can't open that.")
  } else {
    outputText("I don't see one of those.")
  }
}

function lookAt(inp) {
  // if the input is a valid item and is in the same room or in INVENTORY
  // if the target item isn't hidden in the room
  // output its description - in some cases, switch description based on current game state
  let descIndex = 0

  if (assignItem(inp) && itemToUse.isVisible) {
    switch (itemToUse.label) {
      case "POSTER":
        items[2].isVisible = true
        items[3].isVisible = true

        if (items[3].location == INVENTORY && items[2].location == INVENTORY) {
          descIndex = 1
        } else if (items[2].location == INVENTORY) {
          descIndex = 2
        } else if (items[3].location == INVENTORY) {
          descIndex = 3
        }
        break
      case "CRATE":
        items[21].isVisible = true
        items[22].isVisible = true
        items[23].isVisible = true
        let crateContents = []

        if (items[21].location != INVENTORY) {
          crateContents.push("a slightly deflated basketball")
        }
        if (items[22].location != INVENTORY) {
          crateContents.push("an old jersey")
        }
        if (items[23].location != INVENTORY) {
          crateContents.push("a dirty pair of trainers")
        }
        if (crateContents.length > 0) {
          outputText(itemToUse.description[0] + crateContents.join(", ") + ".")
        } else {
          outputText("The crate is empty")
        }
        return

      case "VENT":
        if (items[3].location == INVENTORY) {
          descIndex = 1
        }
        break
      case "BED":
        items[16].isVisible = true

        if (items[16].location == INVENTORY) {
          descIndex = 1
        }
        break
    }
    outputText(itemToUse.description[descIndex])
  } else {
    outputText("I don't see one of those.")
  }
}

function moveRoom(chosenDir) {
  //check if the current room has an exit in the direction that is submitted
  if (rooms[currentPosition].exits.includes(chosenDir.charAt(0))) {
    // change current position based on input
    switch (chosenDir) {
      case "N":
      case "NORTH":
        currentPosition -= MAP_WIDTH
        showRoom()
        break
      case "E":
      case "EAST":
        currentPosition++
        showRoom()
        break
      case "S":
      case "SOUTH":
        currentPosition += MAP_WIDTH
        showRoom()
        break
      case "W":
      case "WEST":
        currentPosition--
        showRoom()
        break
      case "U":
      case "UP":
        currentPosition += MAP_SIZE
        showRoom()
        break
      case "D":
      case "DOWN":
        currentPosition -= MAP_SIZE
        showRoom()
        break
    }
  } else {
    outputText("You can't go that way.")
  }
  // if you've entered the warden's office through the vent, you can now access it through the main corridor
  if (currentPosition == 43 && rooms[42].exits == "NWUD") {
    rooms[42].exits = "NWUDE"
    doors[2].isLocked = false
    doors[2].isOpen = true

  }
}

function showRoom() {
  // output the correct description for the current room
  // by default, output the description 0
  // change description depending on game state
  let descIndex = 0

  switch (currentPosition) {
    case 26:
      if (doors[3].isOpen) {
        descIndex = 1
      }
      break
    case 43:
      if (items[0].location == INVENTORY) {
        descIndex = 1
      }
      break
    case 39:
      let obtainedItems = []
      let itemsToFind = ["SPOON", "SHEET", "BASKETBALL"]
      for (let i = 0; i < itemsToFind.length; i++) {
        for (let j = 0; j < items.length; j++) {
          if (items[j].location == INVENTORY && items[j].label == itemsToFind[i]) {
            obtainedItems[i] = items[j].label
          }
        }
      }
      if (rooms[currentPosition].isVisited) {
        descIndex = 1
      }
      if (obtainedItems.length == 3) {
        outputText(rooms[39].description[descIndex] + " Oh. It looks like you have everything already. Lets get out of here! Hit ENTER to begin your escape.")
        escapeIndex = 0
        handleEscapeSequence(escapeIndex)
        return
      } else if (obtainedItems.length > 0) {
        outputText(rooms[39].description[descIndex] + " Looks like you have the " + obtainedItems.join(", ").toLowerCase() + " already. Great! Now get the rest.")
        updateExits(rooms[currentPosition].exits)
        rooms[currentPosition].isVisited = true
        return
      }
      break
  }
  rooms[currentPosition].isVisited = true
  outputText(rooms[currentPosition].description[descIndex])
  updateExits(rooms[currentPosition].exits)
}

function updateExits(exits) {
  // check the exits value of the current position and display the full-word version of each available exit.

  let possibleExits = ["N", "North", "E", "East", "S", "South", "W", "West", "U", "Up", "D", "Down"]
  let longExits = []

  for (let i = 0; i < exits.length; i++) {
    longExits.push(possibleExits[possibleExits.indexOf(exits[i]) + 1])
  }

  if (longExits.length > 0) {
    document.getElementById('exits').innerHTML = "Exits: " + longExits.join(", ")
  } else if (rooms[currentPosition].exits.length == 1) {
    document.getElementById('exits').innerHTML = "Exit: " + longExits
  } else {
    document.getElementById('exits').innerHTML = "No exits"
  }

}

function outputText(txt) {
  // add txt to a new paragraph, append to textbox and scroll down to it - revealing each character one by one 

  newPara = document.createElement("p");
  textbox.appendChild(newPara);

  letterByLetter(newPara, txt, 0)
}

function letterByLetter(targetEl, txt, charIndex) {
  let textSpeed = parseInt(document.getElementById('textSpeed').value)

  // loop through all of the input text and add each character one by one to the paragraph
  // stop the player from inputting a new command until the current paragraph has finished 
  targetEl.innerHTML += txt[charIndex]
  if (charIndex < txt.length - 1) {
    cli.contentEditable = false
    setTimeout(function () {
      letterByLetter(targetEl, txt, charIndex + 1)
    }, 100 - textSpeed)
  } else if (gameStarted && !holdInput) {
    cli.contentEditable = true
    cli.focus()
  }
  newPara.scrollIntoView();
}