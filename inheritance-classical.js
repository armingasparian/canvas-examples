
// ---------------------------------------------------------------------------Inheritance-classical---

class Animal {
    constructor(name) {
        this._name = name;
    }
    toString() {
      return this._name;
    }
}

class Dog extends Animal {
  talk() {
    alert(this._name + "says mew");
  }
  toString() {
    return "Dog named " + super.toString();  //super - calls the parent function,  this - in this class.
  }
}

class Cat extends Animal {
  constructor(name, age) {
     super(name); //will call the parent constructor too. (name) -> parent constructor name
     this._age = age;
  } 
  talk() {
    alert(this._name + " says woof");
  }
  age() {
    alert("Cat's age is " + this._age);
  }
}

const cat1 = new Cat("Bunny");
const dog1 = new Dog("Picky");
const cat2 = new Cat("Bobik", 20);
cat1.talk();
cat2.age();
alert(dog1.toString());