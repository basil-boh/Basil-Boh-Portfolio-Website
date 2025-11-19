import { useState, useEffect, useRef, useCallback } from 'react'
import { Chess } from 'chess.js'

export default function ChessGames() {
  const [selectedGameIndex, setSelectedGameIndex] = useState(0)
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const autoPlayTimerRef = useRef(null)
  const userInteractionTimerRef = useRef(null)

  // Placeholder chess games in PGN format
  const games = [
    {
      title: 'Bishop\'s Opening',
      white: 'Basil',
      whiteRating: 1896,
      black: 'Boxingcat5',
      blackRating: 1860,
      moves: [
        'e4', 'e5', 'Bc4', 'Nc6', 'Ne2', 'Bc5', 'd3', 'Nf6', 'Be3', 'd6',
        'Bxc5', 'dxc5', 'O-O', 'b6', 'c3', 'Bg4', 'f3', 'Be6', 'Bb5', 'Bd7',
        'Qa4', 'Nb8', 'Bxd7+', 'Qxd7', 'Qc2', 'Nc6', 'f4', 'O-O-O', 'fxe5', 'Nxe5',
        'd4', 'cxd4', 'cxd4', 'Ng6', 'Nbc3', 'Rhe8', 'Rad1', 'Qc6', 'd5', 'Qc5+',
        'Kh1', 'Nxe4', 'b4', 'Qc4', 'Rd4', 'Qa6', 'Nxe4', 'f5', 'N4c3', 'Re5',
        'a4', 'Rde8', 'd6', 'Kd7', 'dxc7+', 'Kxc7', 'Nb5+', 'Kb7', 'Qc7+', 'Ka8',
        'Rfd1', 'Rxe2', 'Rd8+', 'Qc8', 'Rxc8+', 'Rxc8', 'Qxc8#'
      ]
    },
    {
      title: 'Caro Kann Defense',
      white: 'Ralyxthefirst',
      whiteRating: 1824,
      black: 'Basil',
      blackRating: 1821,
      flipBoard: true, // Show from Black's perspective
      moves: [
        'd4', 'c6', 'Bf4', 'd5', 'e3', 'Nf6', 'c3', 'Bg4', 'Be2', 'Bxe2',
        'Nxe2', 'e6', 'Bg3', 'c5', 'O-O', 'cxd4', 'cxd4', 'Nc6', 'a3', 'Be7',
        'Nd2', 'O-O', 'b4', 'a6', 'Nb3', 'Rc8', 'Nc5', 'Qb6', 'Rc1', 'Rfd8',
        'Qb3', 'Nd7', 'h3', 'Nxc5', 'dxc5', 'Qa7', 'Rb1', 'Bf6', 'Rfc1', 'Ne5',
        'Bxe5', 'Bxe5', 'Nd4', 'Qb8', 'a4', 'Qc7', 'Rc2', 'Bh2+', 'Kf1', 'Be5',
        'Rbc1', 'Bxd4', 'exd4', 'Qf4', 'Qe3', 'Qf5', 'b5', 'axb5', 'axb5', 'f6',
        'c6', 'bxc6', 'Rxc6', 'Rxc6', 'Rxc6', 'Qb1+', 'Ke2', 'Qxb5+', 'Kf3', 'Qxc6',
        'Kg3', 'Qd6+', 'f4', 'Rc8', 'Kh2', 'Rc4', 'g3', 'Kf7', 'h4', 'Qc7',
        'Kh3', 'Rc3', 'Qe2', 'Qxf4', 'Qe1', 'Qf5+', 'Kh2', 'Rc2+', 'Kg1', 'Qh3',
        'Qd1', 'Qh2+', 'Kf1', 'Qf2#'
      ]
    },
    {
      title: 'Sicilian Defense',
      white: 'Basil',
      whiteRating: 1811,
      black: 'mugnasskaalzen',
      blackRating: 1787,
      moves: [
        'e4', 'c5', 'Bc4', 'Nc6', 'c3', 'e6', 'd3', 'd5', 'exd5', 'exd5',
        'Bb5', 'Nf6', 'Ne2', 'Be7', 'O-O', 'Rb8', 'Bg5', 'O-O', 'a3', 'a6',
        'Ba4', 'b5', 'Bc2', 'Ne5', 'Re1', 'Ng6', 'Ng3', 'Bg4', 'f3', 'Bh5',
        'Nxh5', 'Nxh5', 'Bxe7', 'Nxe7', 'Nd2', 'Nf6', 'Nf1', 'Ng6', 'Ng3', 'd4',
        'Ne4', 'dxc3', 'bxc3', 'Nxe4', 'fxe4', 'c4', 'd4', 'Qb6', 'Qf3', 'a5',
        'e5', 'b4', 'axb4', 'axb4', 'Rab1', 'b3', 'Bd1', 'Qa5', 'Be2', 'Qxc3',
        'Qxc3', 'Rfc8', 'Rec1', 'Nf4', 'Bf1', 'Nd5', 'Qd2', 'c3', 'Rxc3', 'Nxc3',
        'Rb2', 'Ne4', 'Qd3', 'Nc3', 'h3', 'Na2', 'Rxb3', 'Rxb3', 'Qxb3', 'Nc1',
        'Qb7', 'Rf8', 'd5', 'Na2', 'd6', 'Nc3', 'd7', 'Nd1', 'Qc8', 'Ne3',
        'Qxf8+', 'Kxf8', 'd8=Q#'
      ]
    }
  ]

  const [chess, setChess] = useState(new Chess())
  const [board, setBoard] = useState(chess.board())

  // Initialize game when selected game changes
  useEffect(() => {
    const newChess = new Chess()
    setChess(newChess)
    setBoard(newChess.board())
    setCurrentMoveIndex(0)
    setIsAutoPlaying(true)
    setIsUserInteracting(false)
  }, [selectedGameIndex])

  // Function to update board state based on move index
  const updateBoardToMove = useCallback((moveIndex) => {
    const currentGame = games[selectedGameIndex]
    if (!currentGame) return
    
    try {
      const newChess = new Chess()
      // Replay all moves up to the specified move index
      for (let i = 0; i < moveIndex && i < currentGame.moves.length; i++) {
        const move = newChess.move(currentGame.moves[i])
        if (!move) {
          console.warn(`Invalid move at index ${i}: ${currentGame.moves[i]}`)
          break
        }
      }
      setChess(newChess)
      setBoard(newChess.board())
    } catch (error) {
      console.error('Error updating board:', error, 'at move index:', moveIndex)
    }
  }, [selectedGameIndex, games])

  // Update board when move index or selected game changes
  useEffect(() => {
    updateBoardToMove(currentMoveIndex)
  }, [currentMoveIndex, updateBoardToMove])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isUserInteracting || selectedGameIndex >= games.length) return

    const currentGame = games[selectedGameIndex]
    if (!currentGame || currentMoveIndex >= currentGame.moves.length) {
      setIsAutoPlaying(false)
      return
    }

    autoPlayTimerRef.current = setTimeout(() => {
      if (!isUserInteracting) {
        setCurrentMoveIndex(prev => {
          const nextIndex = prev + 1
          return nextIndex <= currentGame.moves.length ? nextIndex : prev
        })
      }
    }, 1500) // Auto-play every 1.5 seconds

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current)
      }
    }
  }, [currentMoveIndex, isAutoPlaying, isUserInteracting, selectedGameIndex])

  const handleNextMove = () => {
    const currentGame = games[selectedGameIndex]
    if (currentMoveIndex < currentGame.moves.length) {
      setCurrentMoveIndex(prev => prev + 1)
    }
  }

  const handlePreviousMove = () => {
    if (currentMoveIndex > 0) {
      setIsAutoPlaying(false)
      setIsUserInteracting(true)
      
      // Clear user interaction timer if exists
      if (userInteractionTimerRef.current) {
        clearTimeout(userInteractionTimerRef.current)
      }
      
      // Reset user interaction after 5 seconds of no interaction
      userInteractionTimerRef.current = setTimeout(() => {
        setIsUserInteracting(false)
        setIsAutoPlaying(true)
      }, 5000)

      const newChess = new Chess()
      // Replay all moves up to the previous move
      for (let i = 0; i < currentMoveIndex - 1; i++) {
        newChess.move(games[selectedGameIndex].moves[i])
      }
      setChess(newChess)
      setBoard(newChess.board())
      setCurrentMoveIndex(currentMoveIndex - 1)
    }
  }

  const handleNextMoveClick = () => {
    setIsAutoPlaying(false)
    setIsUserInteracting(true)
    
    // Clear user interaction timer if exists
    if (userInteractionTimerRef.current) {
      clearTimeout(userInteractionTimerRef.current)
    }
    
    // Reset user interaction after 5 seconds of no interaction
    userInteractionTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false)
      setIsAutoPlaying(true)
    }, 5000)

    handleNextMove()
  }

  const getPieceImage = (piece) => {
    if (!piece) return null
    
    const isWhite = piece.color === 'w'
    const color = isWhite ? 'w' : 'b'
    const pieceType = piece.type.toLowerCase()
    
    // Using chess.com style pieces from CDN
    const pieceImages = {
      'p': `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${color}p.png`,
      'r': `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${color}r.png`,
      'n': `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${color}n.png`,
      'b': `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${color}b.png`,
      'q': `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${color}q.png`,
      'k': `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${color}k.png`
    }
    
    const imageUrl = pieceImages[pieceType]
    if (!imageUrl) return null
    
    return (
      <img
        src={imageUrl}
        alt={`${color}${pieceType}`}
        className="w-full h-full object-contain"
        style={{
          filter: isWhite ? 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' : 'drop-shadow(1px 1px 2px rgba(255,255,255,0.2))'
        }}
        onError={(e) => {
          // Fallback to Unicode if image fails to load
          e.target.style.display = 'none'
          const fallback = document.createElement('span')
          fallback.className = 'text-5xl md:text-6xl lg:text-7xl font-bold'
          fallback.textContent = isWhite 
            ? (pieceType === 'p' ? '♙' : pieceType === 'r' ? '♖' : pieceType === 'n' ? '♘' : pieceType === 'b' ? '♗' : pieceType === 'q' ? '♕' : '♔')
            : (pieceType === 'p' ? '♟' : pieceType === 'r' ? '♜' : pieceType === 'n' ? '♞' : pieceType === 'b' ? '♝' : pieceType === 'q' ? '♛' : '♚')
          e.target.parentElement.appendChild(fallback)
        }}
      />
    )
  }

  const currentGame = games[selectedGameIndex]

  return (
    <section id="chess-games" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto fade-in-section">
        <h2 className="text-4xl font-bold mb-8 flex items-center">
          <span className="text-[#4ecdc4] text-2xl mr-4">03.</span> Chess Games
        </h2>

        {/* Game Selector */}
        <div className="flex gap-4 mb-8">
          {games.map((game, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedGameIndex(index)
                setIsUserInteracting(true)
                if (userInteractionTimerRef.current) {
                  clearTimeout(userInteractionTimerRef.current)
                }
                userInteractionTimerRef.current = setTimeout(() => {
                  setIsUserInteracting(false)
                  setIsAutoPlaying(true)
                }, 5000)
              }}
              className={`glass-panel px-6 py-3 rounded-lg transition-all ${
                selectedGameIndex === index
                  ? 'bg-[#4ecdc4]/20 border-2 border-[#4ecdc4]'
                  : 'hover:bg-[#4ecdc4]/10'
              }`}
            >
              <div className="text-white font-semibold">{game.title}</div>
              <div className="text-gray-400 text-sm">
                {game.white}{game.whiteRating ? ` (${game.whiteRating})` : ''} vs {game.black}{game.blackRating ? ` (${game.blackRating})` : ''}
              </div>
            </button>
          ))}
        </div>

        {/* Chess Board and Controls */}
        <div className="glass-panel p-8 rounded-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Chess Board */}
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-8 gap-0 shadow-2xl aspect-square w-full max-w-md md:max-w-lg lg:max-w-xl">
                {((currentGame.flipBoard === true) ? [...board].reverse() : board).map((row, rowIndex) =>
                  ((currentGame.flipBoard === true) ? [...row].reverse() : row).map((square, colIndex) => {
                    // Calculate original position for color calculation
                    const originalRowIndex = (currentGame.flipBoard === true) ? 7 - rowIndex : rowIndex
                    const originalColIndex = (currentGame.flipBoard === true) ? 7 - colIndex : colIndex
                    const isLight = (originalRowIndex + originalColIndex) % 2 === 0
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`aspect-square flex items-center justify-center relative ${
                          isLight ? 'bg-[#f0d9b5]' : 'bg-[#b58863]'
                        }`}
                      >
                        {square && (
                          <div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4"
                          >
                            {getPieceImage(square)}
                          </div>
                        )}
                      </div>
                    )
                  })
                )}
              </div>
              
              {/* Move Counter */}
              <div className="mt-4 text-gray-400 text-sm">
                Move {currentMoveIndex} / {currentGame.moves.length}
              </div>
            </div>

            {/* Game Info and Controls */}
            <div className="flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{currentGame.title}</h3>
                <div className="text-gray-400 mb-4">
                  <p><span className="text-white">White:</span> {currentGame.white}{currentGame.whiteRating ? ` (${currentGame.whiteRating})` : ''}</p>
                  <p><span className="text-white">Black:</span> {currentGame.black}{currentGame.blackRating ? ` (${currentGame.blackRating})` : ''}</p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handlePreviousMove}
                  disabled={currentMoveIndex === 0}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    currentMoveIndex === 0
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-[#4ecdc4] text-white hover:bg-[#4ecdc4]/80'
                  }`}
                >
                  <i className="ph ph-arrow-left mr-2"></i>
                  Previous
                </button>
                <button
                  onClick={handleNextMoveClick}
                  disabled={currentMoveIndex >= currentGame.moves.length}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    currentMoveIndex >= currentGame.moves.length
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-[#4ecdc4] text-white hover:bg-[#4ecdc4]/80'
                  }`}
                >
                  Next
                  <i className="ph ph-arrow-right ml-2"></i>
                </button>
              </div>

              {/* Auto-play Indicator */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                {isAutoPlaying && !isUserInteracting ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Auto-playing...</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span>Paused</span>
                  </>
                )}
              </div>

              {/* Move List */}
              <div className="mt-6 max-h-64 overflow-y-auto">
                <h4 className="text-white font-semibold mb-2">Move History</h4>
                <div className="font-mono text-sm text-gray-400 space-y-1">
                  {Array.from({ length: Math.ceil(currentGame.moves.length / 2) }).map((_, i) => {
                    const moveNum = i + 1
                    const whiteMove = currentGame.moves[i * 2]
                    const blackMove = currentGame.moves[i * 2 + 1]
                    const isCurrentMove = currentMoveIndex === i * 2 + 1 || currentMoveIndex === (i * 2 + 2)
                    
                    return (
                      <div
                        key={i}
                        className={`p-2 rounded ${
                          isCurrentMove ? 'bg-[#4ecdc4]/20' : ''
                        }`}
                      >
                        {moveNum}. {whiteMove} {blackMove ? blackMove : ''}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

