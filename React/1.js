
function toggle(id) {
    setSquares(prev => {
        const newSquares = [];
        for (let i = 0; i < prev.length; i++) {
            const currentSquare = prev[i];
            if (prev.id === id) {

                if (currentSquare.id === id) {
                    const updateSquare = {
                        ...currentSquare,
                        on: !currentSquare.on

                    }
                    newSquares.push(updateSquare)

                } else {
                    newSquares.push(updateSquare)
                }
            }

            return newSquares
        }
    })

}
