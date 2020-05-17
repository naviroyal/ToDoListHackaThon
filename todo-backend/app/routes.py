from flask import request

from app import app


@app.route('/')
def test():
    """Serves functionality to test whetehr the server is working or not"""
    return "server-working"

@app.route('/sign-in', methods = ["GET","POST"])
def sign_in():
    if request.method == "POST":
        req = request.form
        username = req.get("username")
        password = req.get("password")
        # if not username in users:
        #     print("Username not found")
        #     return redirect(request.url)
        # else:
        #     user = users[username]
        #
        # if not password == user["password"]:
        #     print("Incorrect password")
        #     return redirect(request.url)
        # else:
        #     session["USERNAME"] = user["username"]
        #     print("session username set")
        #     return redirect(url_for("profile"))
        #
        # return render_template("public/sign_in.html")



