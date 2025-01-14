from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# مسار ملف JSON
FILE_PATH = "reviews.json"


def load_reviews():
    with open(FILE_PATH, "r", encoding="utf-8") as file:
        return json.load(file)


def save_reviews(data):
    with open(FILE_PATH, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)


@app.route("/reviews", methods=["GET"])
def get_reviews():
    data = load_reviews()
    return jsonify(data)


@app.route("/reviews", methods=["POST"])
def add_review():
    new_review = request.json
    data = load_reviews()

    # إضافة التقييم الجديد إلى قائمة "pending"
    data["pending"].append(new_review)
    save_reviews(data)

    return jsonify({"message": "Review added successfully"}), 201


@app.route("/reviews/approve/<int:index>", methods=["POST"])
def approve_review(index):
    data = load_reviews()

    # نقل التقييم من "pending" إلى "approved"
    try:
        review = data["pending"].pop(index)
        data["approved"].append(review)
        save_reviews(data)
        return jsonify({"message": "Review approved successfully"}), 200
    except IndexError:
        return jsonify({"error": "Invalid review index"}), 400


@app.route("/reviews/reject/<int:index>", methods=["POST"])
def reject_review(index):
    data = load_reviews()

    # حذف التقييم من قائمة "pending"
    try:
        data["pending"].pop(index)
        save_reviews(data)
        return jsonify({"message": "Review rejected successfully"}), 200
    except IndexError:
        return jsonify({"error": "Invalid review index"}), 400


if __name__ == "__main__":
    app.run(debug=True)
