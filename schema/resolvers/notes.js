export default {
    Query: {
        notes: (parent, args, {
            models
        }) => {
            return Object.values(models.notes)
        },
        note: (parent, {
            id
        }, {
            models
        }) => {
            return models.notes[id]
        }
    },
    Mutation: {
        createNewNote: (parent, {
            text
        }, {
            models
        }) => {
            const id = '1234';
            const newNote = {
                id,
                text
            }
            models.notes[id] = newNote;
            return newNote;
        },

        deleteNote: (parent, {
            id
        }, {
            models
        }) => {
            const {
                [id]: note, ...otherNotes
            } = models.notes
            if (!note) {
                return false
            }
            models.notes = otherNotes
            return true
        },
    }
}