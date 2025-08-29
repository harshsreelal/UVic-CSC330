// Starter file provided to CSC 330, Spring 2025, Assignment 3
// Copyright Mike Zastre, UVic 2025.
//
// This echoes the functionality provided by the starter file in
// Haskell for the similar problem in Assignment 1.
//
// Therefore your task is to complete the functionality needed
// by `max_coverage()` -- and which will (perhaps) including writing
// other Rust functions in turn.
//

use std::fs::{File, read_to_string};
use std::env;
use std::io::{Write};

fn sum_stamps(n: usize, stamps: Vec<u32>) -> Vec<u32> {
    if n == 0 {
        return vec![0];
    }

    let prev_sums = sum_stamps(n - 1, stamps.clone());
    let mut result = Vec::new();

    for &x in &prev_sums {
        for y in &stamps {
            result.push(x + y);
        }
    }

    result
}

fn stamp_values(m: usize, stamps: Vec<u32>) -> Vec<u32> {
    let mut all_stamps = Vec::new();
    for n in 1..=m {
        all_stamps.extend(sum_stamps(n, stamps.clone()));
    }

    all_stamps
}

fn max_coverage(m: usize, denominations: Vec<u32>) -> (u32, Vec<u32>) {
    let mut values = stamp_values(m, denominations.clone());
    values.sort();
    values.dedup();

    let mut expected = 1;
    for &value in &values {
        if value == expected {
            expected += 1;
        } else {
            break;
        }
    }

    (expected - 1, denominations)
}


fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() != 3 {
        eprintln!("Usage: {} <input file> <output file>", args[0]);
        return;
    }

    let contents: String = read_to_string(&args[1])
        .expect("Should have been able to read the file.");

    let mut lines = contents.lines();

    let mut output_file = File::create(&args[2])
        .expect("Failed to created output file");

    while let Some(size_line) = lines.next() {
        let m: usize = size_line.trim()
            .parse()
            .unwrap_or(0);

        if m == 0 {
            break;
        }
        
        if let Some(denoms_line) = lines.next() {
            let mut values: Vec<u32> = denoms_line
                .split_whitespace()
                .map(|s| s.parse().unwrap())
                .collect();

            if !values.is_empty() {
                values.remove(0);
            }
            
            let (max_value, denominations) = max_coverage(m, values);

            writeln!(output_file, "max coverage = {} : {}", max_value, denominations.iter().map(ToString::to_string).collect::<Vec<_>>().join(" "))
                .expect("Failed to write to output file.");
        } else {
            eprintln!("Error: Expected a second line, but found none.");
            break;
        }
    }
}