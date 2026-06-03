# Write a program that accepts two strings and returns the indices of all the occurrences of the second string in the first string as a list.
#If the second string is not present in the first string, then it should return -1.



def find_all(main_str, sub_str):
    indices = []
    start = 0

    while True:
        index = main_str.find(sub_str, start)
        if index == -1:
            break
        indices.append(index)
        start = index + 1

    if len(indices) == 0:
        return -1
    else:
        return indices


main_str = input("Enter the main string: ")
sub_str = input("Enter the substring to search: ")

result = find_all(main_str, sub_str)
print("Output:", result)
