// Starter file provided to CSC 330, Spring 2025, Assignment 3
// Copyright Mike Zastre, UVic 2025.
//
// This echoes the functionality provided by the starter file in
// Haskell for the similar problem in Assignment 1.
//
// Therefore your task is to complete the functionality needed
// for the ParseNode datatype definition (i.e. completing
// the `enum` statement) as well as for operations on the
// datatype (i.e., completing the `eval` function on ParseNode.)
//

#[derive(Debug, PartialEq)]

// The `derive` above will help as the `Debug` trait will help
// produce useful output when trying to print a `ParseNode`.
//
// Similarly the `PartialEq` trait will provide default implementations
// of such opertions at `==` and `!=`.
//

enum ParseNode {
    Number(i64),
    Add(Box<ParseNode>, Box<ParseNode>),
    Subtract(Box<ParseNode>, Box<ParseNode>),
    Multiply(Box<ParseNode>, Box<ParseNode>),
    Divide(Box<ParseNode>, Box<ParseNode>),
    Power(Box<ParseNode>, Box<ParseNode>),
    Parentheses(Box<ParseNode>)
}

impl ParseNode {
    fn eval(&self) -> i64 {
        match self {
            ParseNode::Number(n) => *n,
            ParseNode::Add(num1, num2) => num1.eval() + num2.eval(),
            ParseNode::Subtract(num1, num2) => num1.eval() - num2.eval(),
            ParseNode::Multiply(num1, num2) => num1.eval() * num2.eval(),
            ParseNode::Divide(num1, num2) => num1.eval() / num2.eval(),
            ParseNode::Power(base, exp) => base.eval().pow(exp.eval() as u32),
            ParseNode::Parentheses(expr) => expr.eval()
        }
    }
}

fn main() {
    // let parse_z = ParseNode::Number(42);
    // println!("Result of parse_z: {}", parse_z.eval()); // Should print 42

    // Code for expression (a) in the assignment?
    // text_a = "2 + 3 * 4"
    let parse_a = ParseNode::Add(
        Box::new(ParseNode::Number(2)), Box::new(ParseNode::Multiply(
            Box::new(ParseNode::Number(3)),
            Box::new(ParseNode::Number(4)))));
    
    println!("Result of parse_a: {}", parse_a.eval());


    // Code for expression (b) in the assignment?
    // text_b = "(3 + 5) * (7 - 2)"
    let parse_b = ParseNode::Multiply(
        Box::new(ParseNode::Parentheses(Box::new(ParseNode::Add(
            Box::new(ParseNode::Number(3)), Box::new(ParseNode::Number(5)))))), 
        Box::new(ParseNode::Parentheses(Box::new(ParseNode::Subtract(
            Box::new(ParseNode::Number(7)), Box::new(ParseNode::Number(2))))))
        );
    
    println!("Result of parse_b: {}", parse_b.eval());

    // Code for expression (c) in the assignment?
    // text_c = "(4 + 6 * (2 ^ 3)) - 5 / (1 + 1)"
    let parse_c = ParseNode::Subtract(
        Box::new(ParseNode::Parentheses(Box::new(ParseNode::Add(
            Box::new(ParseNode::Number(4)), Box::new(ParseNode::Multiply(
                Box::new(ParseNode::Number(6)), Box::new(ParseNode::Power(
                    Box::new(ParseNode::Number(2)), Box::new(ParseNode::Number(3)))))))))), 
        Box::new(ParseNode::Divide(
            Box::new(ParseNode::Number(5)), Box::new(ParseNode::Parentheses(Box::new(ParseNode::Add(
                Box::new(ParseNode::Number(1)), Box::new(ParseNode::Number(1))))))))
        );

    println!("Result of parse_c: {}", parse_c.eval());

    // Code for expression (d) in the assignment?
    let parse_d = ParseNode::Subtract(
        Box::new(ParseNode::Parentheses(Box::new(ParseNode::Add(
            Box::new(ParseNode::Number(14)), Box::new(ParseNode::Multiply(
                Box::new(ParseNode::Number(26)), Box::new(ParseNode::Power(
                    Box::new(ParseNode::Number(12)), Box::new(ParseNode::Number(3)))))))))), 
        Box::new(ParseNode::Divide(
            Box::new(ParseNode::Number(55)), Box::new(ParseNode::Parentheses(Box::new(ParseNode::Add(
                Box::new(ParseNode::Number(10)), Box::new(ParseNode::Number(11))))))))
        );

    println!("Result of parse_d: {}", parse_d.eval());
    
}
