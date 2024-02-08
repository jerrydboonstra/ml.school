#!/bin/bash

# The input CSV file
INPUT_FILE="${1:-random_penguins.csv}"
# The number of files to split into
NUM_FILES=10

# Calculate the number of lines in the input file (excluding the header)
NUM_LINES=$(($(wc -l < "$INPUT_FILE") - 1))
# Calculate the number of lines per file, rounding up
LINES_PER_FILE=$(( (NUM_LINES + NUM_FILES - 1) / NUM_FILES ))

# Extract the header line
HEADER=$(head -n 1 "$INPUT_FILE")

# Split the file, excluding the header. Tail is used to skip the header line.
# Then, split the file into chunks with prefix "split_", each having up to $LINES_PER_FILE lines
tail -n +2 "$INPUT_FILE" | split -l "$LINES_PER_FILE" - split_

# Loop through the split files, add the header, and rename them
COUNT=1
for FILE in split_*
do
    # Construct the output file name with leading zeros in the file number
    OUTPUT_FILE="split_${COUNT}.csv"
    # Add the header to the split file
    echo "$HEADER" > "$OUTPUT_FILE"
    # Append the original split content to the new file
    cat "$FILE" >> "$OUTPUT_FILE"
    # Remove the original split file
    rm "$FILE"
    # Increment the counter
    ((COUNT++))
done

echo "Split into $NUM_FILES files with headers."
