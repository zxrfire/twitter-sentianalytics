import json
from pathlib import Path

def helper(arr):
    timestamp = str(arr[0])
    date = timestamp.split("T")[0]
    time = timestamp.split("T")[1].split(".")[0]
    year = int(date.split("-")[0])
    month = int(date.split("-")[1])
    day = int(date.split("-")[2])
    hour = int(time.split(":")[0])
    minute = int(time.split(":")[1])
    second = int(time.split(":")[2])

    date_str = "new Date(%i, %i, %i, %i, %i, %i)" % (year, month, day, hour, minute, second)

    return "[" + date_str + ", " + str(arr[1]) + "],"

def main():
    directory = "jsons"

    files = Path(directory).glob('*')
    for file in files:
        output_name_part = str(file).split("/")[1].split(".")[0]
        output_name = output_name_part.split(" ")[0] + "-" + output_name_part.split(" ")[1] + ".js"
        results = []
        reader = open(file)
        data = json.load(reader)

        for score in data["scores"]:
            results.append([score["created_at"], score["pos"] - score["neg"]])

        reader.close()

        output_file = open(output_name, "w")
        output_file.write("export default [\n")

        output_file.write("  ['Time', 'Sentiment'],\n")
        for result in results:
            output_file.write("  " + helper(result) + "\n")
        output_file.write("]")

        output_file.close()



if __name__=="__main__":
    main()
