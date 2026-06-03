# Open the two files in read mode
file1 = open("file1.txt", "r")
file2 = open("file2.txt", "r")

# Read the contents of both files
data1 = file1.read()
data2 = file2.read()

# Close the input files
file1.close()
file2.close()

# Open a new file in write mode to store the merged content
merged_file = open("merged.txt", "w")
merged_file.write(data1 + "\n" + data2)
merged_file.close()

print("Files merged successfully!")
