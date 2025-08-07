import json
import os

# Loop through question_1.json to question_10.json
for i in range(1, 11):
    file_path = f'./public/question_{i}.json'

    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            data = json.load(f)

        # Add 'Type' based on whether 'Chaitra' or 'Bhadra' is in the 'year' string
        for q in data:
            if 'Chaitra' in q['year'] or 'Bhadra' in q['year']:
                q['Type'] = 'Regular'
            else:
                q['Type'] = 'Back'

        # Write the modified data back to the same JSON file
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=4)

        print(f"✅ Updated: question_{i}.json")
    else:
        print(f"❌ File not found: question_{i}.json")
