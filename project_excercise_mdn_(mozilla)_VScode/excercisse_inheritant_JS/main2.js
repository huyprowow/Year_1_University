const input = document.querySelector('input');
const btn = document.querySelector('button');
const para = document.querySelector('p');

btn.onclick = function () {
    const code = input.value;
    para.textContent = eval(code);
}

class Person {
    constructor(first, last, age, gender, interests) {
        this.name = {
            first,
            last
        };
        this.age = age;
        this.gender = gender;
        this.interests = interests;
    };

    greeting() {
        console.log(`Hi! I'm ${this.name.first}`);
    };

    farewell() {
        console.log(`${this.name.first} has left the building. Bye for now!`);
    };
}

let han = new Person('Han', 'Solo', 25, 'male', ['Smuggling']);

class Teacher extends Person {
    constructor(first, last, age, gender, interests, subject, grade) {
        super(first, last, age, gender, interests);
        this._subject = subject;
        this.grade = grade;
    }
    get subject() {
        return this._subject;
    }

    set subject(newSubject) {
        this._subject = newSubject;
    }

}

let snape = new Teacher('Severus', 'Snape', 58, 'male', ['Potions'], 'Dark arts', 5);

// class Teacher extends Person {
//     constructor(first, last, age, gender, interests, subject, grade) {
//         super(first, last, age, gender, interests);
//         this.subject = subject;
//         this.grade = grade;
//     }
// }

// let snape = new Teacher('Severus', 'Snape', 58, 'male', ['Potions'], 'Dark arts', 5);

// class Teacher extends Person {
//     constructor(subject, grade) {
//         super();
//         this.subject = subject;
//         this.grade = grade;
//     }
// }

// let snape = new Teacher('Severus', 'Snape', 58, 'male', ['Potions'], 'Dark arts', 5);