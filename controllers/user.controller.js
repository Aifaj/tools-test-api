const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { username, password } = req.body;

  const hashed = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashed],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "User registered" });
    }
  );
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, users) => {
      if (err || users.length === 0) return res.status(400).send({ message: "User not found" });

      const user = users[0];

      if (!bcrypt.compareSync(password, user.password))
        return res.status(400).send({ message: "Wrong password" });

      const token = jwt.sign({ id: user.id }, 'SECRET123');

      res.send({ token, userId: user.id });
    }
  );
};
