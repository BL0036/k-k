# KK Ledger

A single-file HTML business ledger app for K & K Trade Concern, built to
replace manual, error-prone Excel ledger entry.

**Status: deployed and in active use.**

## Why I built this
Our accountant was manually retyping repeated party names and bill numbers
into Excel for every ledger entry — slow and error-prone. My boss also had
no way to check current business data without being physically at the
office computer. KK Ledger solves both: faster, more reliable entry, and
for the first time, mobile access to live data.

## Tech stack
- Single-file HTML app
- Firebase backend
- Auto bill-adding, fast search

## Recent updates (April 2026)
- Enter-key navigation
- Enhanced party search dropdowns with valley badges and balance display
- Fixed "Inside Valley" parties defaulting incorrectly
- Summary PDF export that respects active filters
- Embedded stamp image (base64) in receipts

## My contribution vs. AI's
I knew of Firebase but hadn't fully used it before this project. The idea
to back up and store ledger data this way — solving the "my boss needs
mobile access" problem — was mine; I got AI help with the implementation.

## Installation
_Internal business tool — not set up for external installation._

