class Room {
constructor(label, exits, isVisited, description) {
    this.label = label
    this.exits = exits
    this.description = description
    this.isVisited = isVisited
}
}
class Item {
constructor(label, isGettable, isVisible, location, description) {
    this.label = label
    this.isGettable = isGettable
    this.isVisible = isVisible
    this.location = location
    this.description = description
}
}
class Door {
constructor(label, isLocked, isOpen, location, orientation, canOpen) {
    this.label = label
    this.isLocked = isLocked
    this.isOpen = isOpen
    this.location = location
    this.orientation = orientation
    this.canOpen = canOpen
}
}

var rooms = [], currentPosition, items = [], doors = [], itemToUse, doorToUse, newPara, tutorialIndex = 0, escapeIndex = 0, gameStarted = false, gameFinished = false

const MAP_WIDTH = 8
const MAP_SIZE = 24
const INVENTORY = -1

function initGame() {
//rooms initialisation
rooms[24] = new Room("NW PRISON YARD", "ES", false, ["You are in the north west section of the prison yard. You see a basketball hoop with no net and a small crate labelled \"SPORTS EQUIPMENT\". The yard stretches east and south from where you're standing."])
rooms[25] = new Room("NE PRISON YARD", "SW", false, ["You are in the north east section of the prison yard. There is a drawing on the floor made of chalk. The yard stretches south and west from where you're standing."])
rooms[26] = new Room("YOUR CELL", "", false, ["You are in your cell. A tiny barred-off window beams a thin shaft of light on to the cell wall. It is your only source of illumination. You see a bed and a small metal toilet on the other side of the room. The door to the cell is to your south - it's closed", "You are in your cell. A tiny barred-off window beams a thin shaft of light on to the cell wall. It is your only source of illumination. You see a bed and a small metal toilet on the other side of the room. The door to the cell is to your south."])
rooms[27] = new Room("NEIGHBOUR CELL", "S", false, ["His cell is almost identical to yours, bar the raunchy poster hanging on the northern wall. Particles of dust glisten as they pass through the light cast by the window. The poster looks like it might be peeling. What's that behind it?"])
rooms[32] = new Room("SW PRISON YARD", "NE", false, ["You are in the south west section of the prison yard, touching the western wall of the yard. The yard stretches north and east from where you're standing."])
rooms[33] = new Room("SE PRISON YARD", "NEW", false, ["You are in the south east section of the prison yard. The yard has a mostly concrete floor, with blades of grass clawing through the occasional crack in the ground. It stretches north and west from where you're standing."])
rooms[34] = new Room("HALL OUTSIDE YOUR CELL", "NESW", false, ["You are in the hall outside of your cell. It seems to stretch to the east and to the west. A side exit is to your south."])
rooms[35] = new Room("HALL OUTSIDE NEIGHBOUR CELL", "NEW", false, ["You are outside of your neighbour's cell. He doesn't seem to be home. The door to his cell is open to your north. The hall stretches east and west."])
rooms[36] = new Room("HALL OUTSIDE LOCKED CELL 1", "EW", false, ["You are in the hall outside a locked cell. There is a label above the door. The hall stretches east and west."])
rooms[37] = new Room("HALL OUTSIDE LOCKED CELL 2", "EW", false, ["You are halfway down the hall. This cell is locked, but there is a label above the door. The hall stretches east and west."])
rooms[38] = new Room("HALL OUTSIDE SOLITARY CONFINEMENT", "W", false, ["The hall stretches west. To the east you see a door labelled \"SOLITARY CONFINEMENT\""])
rooms[39] = new Room("SOLITARY CONFINEMENT", "W", false, ["You step into the dark cell, only to feel something grab you by the arm. Turning quickly in shock, you see a man. His hair is grey and his skin is wrinkled. \"Thank goodness you finally found me. Everyone else has abandoned the prison - the guards, the other inmates - they all left screaming something about a radiation leak nearby. I suppose they forgot about me. I thought I would be stuck here forever! Listen, since I've been in here a while, I've had the chance to come up with a plan to get us out of here. We'll need a few things before I can start though. I'll need a spoon, a sheet and a basketball. Come back to me when you have those things.\"", "Have you got my items yet? We need a spoon, a sheet and a basketball."])
rooms[41] = new Room("SUPPLY CLOSET", "E", false, ["You are in a supply closet. A fat lot of help this is."])
rooms[42] = new Room("STAIRS", "NWUD", false, ["You are at a set of stairs, they lead both up and down. To the east you see a door labelled \"Warden's Office\". A supply closet is to your west."])
rooms[43] = new Room("WARDEN'S OFFICE", "W", false, ["You are in the warden's office. There is a large set of keys on the desk. The door is to your west, looks like it can be opened from this side.", "You are in the warden's office. The door is to your west."])
rooms[18] = new Room("SHOWERS", "U", false, ["You are in the showers."])
rooms[66] = new Room("TOP STAIRS", "DE", false, ["You are at the top of the stairs, there is a fire exit to your east."])
rooms[67] = new Room("ROOF", "W", false, ["You are on the roof, it's chilly. You see a closed ventilation shaft leading into the room below."])

//items initialisation
items[0] = new Item("KEYS", true, true, 43, ["Three keys on a key chain. One is labelled \"Solitary Confinement\""])
items[1] = new Item("PHOTO", true, true, INVENTORY, ["A photo of a women, she's smiling."])
items[2] = new Item("SPOON", true, false, 27, ["The spoon is old and rusting. Looks like it's been used to dig something - the edges are worn away."])
items[3] = new Item("SCREWDRIVER", true, false, 27, ["It's a standard-looking phillips screwdriver with a yellow handle."])
items[4] = new Item("BED", false, true, 26, ["An  old-looking mattress with a thin sheet on it.", "An old-looking mattress."])
items[5] = new Item("TOILET", false, true, 26, ["You step towards the toilet for a look, but the smell pushes you away."])
items[6] = new Item("DOOR", false, true, 26, ["The door to your cell. The metal is cold to the touch."])
items[7] = new Item("WINDOW", false, true, 26, ["The window is covered by three vertical metal bars. It's too high to look out of, but you can just about see a glimpse of the sky."])
items[8] = new Item("BED", false, true, 27, ["An  old-looking mattress - looks like the sheet is missing."])
items[9] = new Item("TOILET", false, true, 27, ["It appears that the toilet is being used as a makeshift vat for toilet wine. Looks like it's fermenting nicely."])
items[10] = new Item("WINDOW", false, true, 27, ["The window is covered by three vertical metal bars. It's too high to look out of, but you can just about see the branch of a tree."])
items[11] = new Item("POSTER", false, true, 27, ["Peeling back the poster reveals a tunnel about 10cm deep into the wall. Resting in the tunnel is a screwdriver and a spoon. Looks like he was trying to escape this place.", "Peeling back the poster reveals a tunnel about 10cm deep into the wall. It's empty. Looks like he was trying to escape this place.", "Peeling back the poster reveals a tunnel about 10cm deep into the wall. Resting in the tunnel is a screwdriver. Looks like he was trying to escape this place.", "Peeling back the poster reveals a tunnel about 10cm deep into the wall. Resting in the tunnel is a spoon. Looks like he was trying to escape this place."])
items[12] = new Item("LABEL", false, true, 36, ["Text above the door reads: \"573840 - B. CASSIDY\". Doesn't sound familiar."])
items[13] = new Item("LABEL", false, true, 37, ["Text above the door reads: \"000009 - P.J BARNSLEY\". I wonder how long he's been in here for?"])
items[14] = new Item("DOOR", false, true, 38, ["The door is locked and made of thick metal. Seems like something is moving behind it."])
items[15] = new Item("VENT-GRATE-VENTILATION", false, true, 67, ["The vent looks just big enough to fit you, but the grate covering it is screwed in. You need some way to get it off.", "The vent looks just big enough to fit you, you'll need to unscrew the grate before you can get through."])
items[16] = new Item("SHEET", true, false, 26, ["The sheet is thin and frayed at the edges."])
items[17] = new Item("DOOR", false, true, 34, ["The door to your cell. The metal is cold to the touch."])
items[18] = new Item("DOOR", false, true, 27, ["His door is metal like yours. It's slightly rusted on the edges."])
items[18] = new Item("DOOR", false, true, 35, ["His door is metal like yours. It's slightly rusted on the edges."])
items[19] = new Item("DOOR", false, true, 42, ["The door is made of thick metal and lined with lead."])
items[20] = new Item("DOOR", false, true, 43, ["The door is made of thick metal and lined with lead."])
items[21] = new Item("BASKETBALL", true, false, 24, ["A slightly deflated basketball."])
items[22] = new Item("JERSEY", true, false, 24, ["An old jersey. The text is so faded you can't tell what team it's for."])
items[23] = new Item("TRAINERS", true, false, 24, ["A dirty pair of trainers. Much too big to be your size."])
items[24] = new Item("CRATE", false, true, 24, ["Looking inside the crate you see "])
items[25] = new Item("HOOP", false, true, 24, ["This is a basketball hoop"])
items[26] = new Item("DRAWING", false, true, 25, ["Looks like the outline of a body."])

//doors initialisation
doors[0] = new Door("DOOR", true, false, 38, "E", true)
doors[1] = new Door("DOOR", false, false, 43, "W", true)
doors[2] = new Door("DOOR", true, false, 42, "E", true)
doors[3] = new Door("DOOR", false, false, 26, "S", true)
doors[4] = new Door("VENT-GRATE-VENTILATION", true, false, 67, "D", true)
doors[5] = new Door("DOOR", false, true, 27, "S", true)
doors[6] = new Door("DOOR", false, true, 35, "N", false)
doors[7] = new Door("DOOR", true, false, 36, "N", false)
doors[8] = new Door("DOOR", true, false, 37, "N", true)
doors[9] = new Door("DOOR", false, true, 24, "N", true)

currentPosition = 26
showTutorial(0)


currentPosition = 39
items[2].location = INVENTORY
items[16].location = INVENTORY
items[21].location = INVENTORY
}