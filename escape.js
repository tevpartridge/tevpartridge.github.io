function handleEscapeSequence(index) {

    gameEnded = true

    switch(index){
        case 0:
            holdInput = true
            cli.contentEditable = false
            break
        case 1:
            outputText("The old man takes the basketball, sheet and spoon from you and turns around to create his escape device. (hit ENTER to proceed past each step of your escape)")
            break
        case 2:
            outputText("You can't see what he's doing, but you can hear the noise of intense spoon scraping, sheet swooping and leather rubbing together. ")
            break
        case 3:
            outputText("The old man holds the spoon out to you and says \"Will you hold this for me\". (type \"Hold it\")")
            holdInput = false
            break
        case 4:
            holdInput = true
            outputText("He gives you the spoon and you hold it tight. It glimmers with the prospect of freedom.")
            break
        case 5:
            outputText("The old man is instantly back to work. Muttering as he tinkers with his construction.")
            break
        case 6:
            outputText("Finally, the noise dies down and the old man comes to a stop.")
            break
        case 7:
            outputText("Eager to see his contraption, you take a step forward.")
            break
        case 8:
            //guess i ran out of time for a proper ending. Also how was I supposed to come up with an escape device made out of a basketball, a sheet and a spoon? 

            outputText("Suddenly, you are frozen in spot. You start panicking. Why can't I move? Huge lines of text descend from the sky. As you read them, you can barely contain your horror.")
            break
        case 9:
            outputText("GAME")
            break
        case 10:
            outputText("OVER")
            break
    }
}