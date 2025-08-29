-- Some starter code for Part 1 of CSC 330 Spring 2025 A#1
--


text_a = "2 + 3 * 4"
text_b = "(3 + 5) * (7 - 2)"
text_c = "(4 + 6 * (2 ^ 3)) - 5 / (1 + 1)"
text_d = "(14 + 26 * (12 ^ 3)) - 55 / (10 + 11)"


data ParseNode
    = Number Integer
    | Add ParseNode ParseNode
    | Subtract ParseNode ParseNode
    | Multiply ParseNode ParseNode
    | Divide ParseNode ParseNode
    | Power ParseNode ParseNode
    | Parentheses ParseNode
    deriving (Show, Eq)

expr_eval :: ParseNode -> Integer
expr_eval (Number n) = n
expr_eval (Add num1 num2) = expr_eval num1 + expr_eval num2
expr_eval (Subtract num1 num2) = expr_eval num1 - expr_eval num2
expr_eval (Multiply num1 num2) = expr_eval num1 * expr_eval num2
expr_eval (Divide num1 num2) = expr_eval num1 `div` expr_eval num2
expr_eval (Power base exp) = expr_eval base ^ expr_eval exp
expr_eval (Parentheses expr) = expr_eval expr



expr_a :: ParseNode
expr_a = Add (Number 2) (Multiply (Number 3) (Number 4))

expr_b :: ParseNode
expr_b = Multiply (Parentheses (Add (Number 3) (Number 5))) (Parentheses (Subtract (Number 7) (Number 2)))

expr_c :: ParseNode
expr_c = Subtract (Parentheses (Add (Number 4) (Multiply (Number 6) (Power (Number 2) (Number 3))))) (Divide (Number 5) (Parentheses (Add (Number 1) (Number 1))))

expr_d :: ParseNode
expr_d = Subtract 
        (Parentheses 
            (Add 
                (Parentheses (Add (Number 9) (Number 5))) 
                (Multiply 
                    (Parentheses (Add (Multiply (Number 9) (Number 2)) (Number 8)))
                    (Power (Parentheses (Add (Number 9) (Number 3))) (Number 3))
                )
            )
        )
        (Divide 
            (Parentheses (Multiply (Parentheses (Add (Number 9) (Number 2))) (Number 5)))
            (Add
                (Parentheses (Add (Number 9) (Number 1)))
                (Parentheses (Add (Number 9) (Number 2)))
            )
        )
