db = db.getSiblingDB('bookstore');
db.createUser({
    user: "daksh",
    pwd: "daksh1",
    roles: [
      {
        role: "dbOwner",
        db: "bookstore"
      }
    ]
  });
  