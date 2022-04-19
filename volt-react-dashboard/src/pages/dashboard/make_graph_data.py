import json
from pathlib import Path

def helper(arr):
    return "['" + str(arr[0]) + "', " + str(arr[1]) + ", " + str(arr[2]) + "],"

def main():
    directory = "jsons"

    files = Path(directory).glob('*')
    for file in files:
        output_name = str(file).split("/")[1].split(".")[0] + ".js"
        header = ['x', 'Positive', 'Negative']
        results = []
        reader = open(file)
        data = json.load(reader)

        for score in data["scores"]:
            results.append([score["created_at"], score["pos"], score["neg"]])

        reader.close()

        output_file = open(output_name, "w")
        output_file.write("[\n")

        output_file.write("  ['Time', 'Positive', 'Negative'],\n")
        for result in results:
            output_file.write("  " + helper(result) + "\n")
        output_file.write("]")

        output_file.close()



if __name__=="__main__":
    main()
