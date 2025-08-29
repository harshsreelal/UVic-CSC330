-- Code provided to students in UVic CSC 330 Spring 2025
-- 
-- Author: Mike Zastre
--
-- The copyright for this code is held by Mike Zastre. It is
-- not to be uploaded or otherwise accessed by any online service
-- or online-facilitated tool (such as Copilot or ChatGPT, although
-- this list is no exhaustive).


import System.IO
import System.Environment (getArgs)
import Data.List

type ProblemTuple = (Integer, [Integer])


-- Top level function: Because Haskell constrains the mixture of
-- of functions having I/O with functions having no I/O, we need
-- to use an IO monad (the "IO ()" syntax).  There should be no
-- need to modify this code unless you _really_ know what you are
-- doing in Haskell.  This has been written for you in order that
-- you may completely ignore I/O issues.
--
-- The first parameter if `stamps` is the name of the input file;
-- the second is the name of the output file.
--
-- THERE SHOULD BE NO NEED TO MODIFY THE CODE UP TO THE POINT
-- WITH THE COMMENT "-- STUDENT WORK BEGINS HERE".
--

main :: IO ()
main = do
    args <- getArgs
    case args of
        (inFile : outFile : _) -> stamps inFile outFile
        _ -> putStrLn "Usage: <input file> <output file>"

stamps :: String -> String -> IO ()
stamps inName outName = do
    inFile <- openFile inName ReadMode
    outFile <- openFile outName WriteMode
    lineData <- hGetContents inFile
    let rawLines = lines lineData
    let problemList = parseData rawLines
    let answers = process problemList
    outputResults outFile answers
    hClose inFile
    hClose outFile

parseData :: [String] -> [ProblemTuple]
parseData [] = []
parseData (a:[]) 
    | a == "0"  = []
    | otherwise = [(-1, [])]
parseData (a:b:as) = (width, stamps) : parseData as
    where
        width = read a :: Integer
        stamps = string2ints (words b)

string2ints :: [String] -> [Integer]
string2ints [] = []
string2ints (a:as) = (read a :: Integer) : string2ints as

ints2string :: [Integer] -> String
ints2string [] = ""
ints2string (a:[]) = show a
ints2string (a:as) = show a ++ " " ++ ints2string as

outputResults :: Handle -> [String] -> IO ()
outputResults _ [] = return ()
outputResults outFile (a:as) = do
    hPutStrLn outFile a
    outputResults outFile as



--
-- STUDENT WORK BEGINS HERE
--
-- YOU ARE FORBIDDEN TO USE EITHER "do" OR "let" IN YOUR
-- SOLUTION. THE APPEARANCE OF EITHER OF THESE KEYWORDS
-- IN YOUR CODE MAY RESULT IN A FAILING GRADE FOR THIS PART
-- OF THE ASSIGNMENT.
--

-- Function to calculate and compute all possible values of stamps from 1 to M stamps
stampValues :: Integer -> [Integer] -> [Integer]
stampValues m stamps = foldr (\n accum -> accum ++ sumStamps n stamps) [] [1..m] 

-- Function to compute the sum of stamp values at n stamps where 1 <= n <= M
sumStamps :: Integer -> [Integer] -> [Integer]
sumStamps 0 _ = [0]
sumStamps n stamps = [x + y | x <- sumStamps (n - 1) stamps, y <- stamps]

-- Function to calulate the maximum coverage of the stamp values by compiling a list 
-- of all sums of stamp values, sorting them, and then removing the duplicates. It
-- then checks if the sums are in a continuous sequence and finds the max possible value
maxCoverage :: [Integer] -> Integer
maxCoverage xs = continuousCheck 1 (uniqueSorted xs)
  where
    uniqueSorted = map head . group . sort
    continuousCheck n (x:xs) 
      | n == x    = continuousCheck (n + 1) xs
      | otherwise = n - 1
    continuousCheck n [] = n - 1

-- Final process function to calculate the max coverage and return a list of max coverages
-- for each set of stamp values
process :: [ProblemTuple] -> [String]
process = foldr (\(m, (_:stamps)) accum -> 
    ("max coverage = " ++ show (maxCoverage (stampValues m stamps)) ++ " : " ++ ints2string stamps) : accum
  ) []

--
-- Here are two problem tuples to help you get started
--


pt0 :: [ProblemTuple]
pt0 = [(5, [2, 1, 4])]

pt1 :: [ProblemTuple]
pt1 = [(5, [4, 1, 4, 12, 21]),
       (10, [5, 1, 7, 16, 31, 88]),
       (6, [4, 1, 5, 7, 8])
      ]


pt5 = [(7, [10, 1, 3, 5, 7, 44, 71, 72, 73, 99, 100])]

pt7 :: [ProblemTuple]
pt7 = [(4, [5, 1, 5, 11, 21, 30]),
       (5, [5, 1, 5, 11, 21, 30]),
       (6, [5, 1, 5, 11, 21, 30])
      ]

pt24 = [(10, [11, 1, 3, 4, 10, 11, 21, 61, 71, 81, 91, 95])]

