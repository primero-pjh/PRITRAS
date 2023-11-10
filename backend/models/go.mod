module models

go 1.21.3

require (
    calc v0.0.0
)

replace (
    calc v0.0.0 => ./backend/models
)