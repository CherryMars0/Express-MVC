---
title: Python类机制
date: 2022-07-13 16:55:17
categories:
- coder
- Python
tags: 
- Python
- PythonClassModel
---

#### Python类机制

##### 手动构造类：

```python
class Person:
    	_FirstName = ["孙", "钱", "赵", "李", "王", "韩"]
        _LastName = ["建国", "宇航", "子航", "鹏", "伟", "超"]
        _Gender = ['man', 'woman']
        
    def __init__(self, name, age, gender):  # 构造器
        self.name:str = name
        self.age:str = age
        self.gender:str = gender

    def __str__(self):  # toString
        return f"({self.name} , {self.age} , {self.gender})"
    
    def __repr__(self):  # toString
        return f"(name:{self.name} , age:{self.age} , sex:{self.gender})"

    def sayHello(self):
        print("hello! " + self.name)
        
   @classmethod
    def personManager(cls):  # # 类自动实例化（自动装载）
        return cls(choice(_FirstName) + choice(_LastName), random.randint(0, 100), choice(_Gender))
        
        
def main():
    poul = Person("poul", 18, "man")
    poul.sayHello()
    print(poul)
    print(Person.personManager())
    peoples = [Person.personManager() for _ in range(100)]  # 批量实例化
    print(peoples)
    return None


if __name__ == '__main__':
    main()
```

##### dataclass简写类：

```python
from dataclasses import dataclass

@dataclass
class car:
    name: str
    color: str
    price: int
        
    @classmethod
    def personManager(cls):  # 类自动实例化（自动装载）
        FirstName = ["孙", "钱", "赵", "李", "王", "韩"]
        LastName = ["建国", "宇航", "子航", "鹏", "伟", "超"]
        sex = ['man', 'woman']
        return cls(choice(FirstName) + choice(LastName), random.randint(0, 100), choice(sex))
        
def main():
    Benz = car("Benz", "white", 300000)
    Benz.sayHello()
    print(Benz)
    print(car.carManager())
    cars = [car.carManager() for _ in range(100)]  # 批量实例化
    print(cars)
	return None



if __name__ == '__main__':
    main()
```

##### namedtuple简写类：

```python
from collections import namedtuple

animal = namedtuple("animal", ["name", "color", "variety"])


def main():
    dog = animal("egg", "white", "husky")
	print(dog)
    return None


if __name__ == '__main__':
    main()
```

#### 类的继承：

##### 手动继承类：

```python
# 父类：
class Person:
    def __init__(self, name, age, gender):  # 构造器
        self.name: str = name
        self.age: int = age
        self.gender: str = gender

    def __str__(self):  # toString
        return f"({self.name} , {self.age} , {self.gender})"

    def __repr__(self):  # toString
        return f"({self.name} , {self.age} , {self.gender})"

    def sayHello(self):
        print("hello! " + self.name)
        
# 子类（继承）:
class Student(Person):
    def __init__(self, id, name, age, gender):
        super().__init__(name, age, gender)
        self.id: int = id
            
     def __str__(self):  # 重写toString
        return f"({self.id} , {self.name} , {self.age} , {self.gender})"
            
def main():
    stu = Student(1, "mike", 18, "man")
    print(stu)
    stu.sayHello()
    return None


if __name__ == '__main__':
    main()
```

