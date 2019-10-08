package xyz.deseteral.lebkuchenfm.domain

internal object CommandParser {
    fun parse(text: String): Command? {
        val tokens = text.split(" ")
            .map { it.trim() }
            .filter { it.isNotEmpty() }

        if (tokens.isEmpty() || tokens.first() != "/fm") {
            return null
        }

        return Command(
            key = tokens[1],
            args = tokens.subList(2, tokens.size)
        )
    }
}
