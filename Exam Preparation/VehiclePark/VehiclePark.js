function processVehicleParkCommands(commands) {
    'use strict';
    if (!Array.prototype.findIndex) {
        Array.prototype.findIndex = function (predicate) {
            if (this == null) {
                throw new TypeError('Array.prototype.findIndex called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return i;
                }
            }
            return -1;
        };
    }
    var Models = (function () {
        var Employee = (function () {
            var Employee = {
                init: function (name, position, grade) {
                    this.name = name;
                    this.position = position;
                    this.grade = grade;
                    return this;
                }
            };

            Object.defineProperties(Employee, {
                name: {
                    get: function () {
                        return this._name;
                    },
                    set: function (name) {
                        if (name === undefined || name === "") {
                            throw new Error('Name cannot be empty or undefined.');
                        }
                        this._name = name;
                    }
                },
                position: {
                    get: function () {
                        return this._position;
                    },
                    set: function (position) {
                        if (position === undefined || position === "") {
                            throw new Error('Position cannot be empty or undefined.');
                        }
                        this._position = position;
                    }
                },
                grade: {
                    get: function () {
                        return this._grade;
                    },
                    set: function (grade) {
                        if (grade === undefined || isNaN(grade) || grade < 0) {
                            throw new Error('Grade cannot be negative.');
                        }
                        this._grade = grade;
                    }
                },
                typeName: {
                    value: 'Employee'
                },
                toString: {
                    value: function () {
                        return ' ---> ' + this.name +
                            ',position=' + this.position;
                    }
                }
            });

            return Employee;
        }());

        var Vehicle = (function () {
            var vehicle = {
                init: function (brand, age, terrainCoverage, numberOfWheels) {
                    this.brand = brand;
                    this.age = age;
                    this.terrainCoverage = terrainCoverage;
                    this.numberOfWheels = numberOfWheels;
                    return this;
                },
                toString: function () {
                    return ' -> ' + this.typeName + ': brand=' + this.brand + ',age=' + this.age.toFixed(1) + ',terrainCoverage='
                        + this.terrainCoverage + ',numberOfWheels=' + this.numberOfWheels
                }
            };

            Object.defineProperties(vehicle, {
                brand: {
                    get: function () {
                        return this._brand;
                    },
                    set: function (value) {
                        if (typeof value === 'string' && value !== '') {
                            this._brand = value;
                        } else {
                            throw new Error('Brand should be a non-empty string');
                        }


                    }
                },
                age: {
                    get: function () {
                        return this._age;
                    },
                    set: function (value) {
                        if (value === undefined || isNaN(value) || value < 0) {
                            throw new Error('Age should be a non negative number')
                        }

                        this._age = value;
                    }
                },
                terrainCoverage: {
                    get: function () {
                        return this._terrainCoverage;
                    },
                    set: function (value) {
                        if (value !== 'all' && value !== 'road') {
                            throw new Error('Terrain Coverage can either be \'all\' or \'road\' ')
                        }

                        this._terrainCoverage = value;
                    }
                },
                numberOfWheels: {
                    get: function () {
                        return this._numberOfWheels;
                    },
                    set: function (value) {
                        if (value === undefined || isNaN(value) || value < 0) {
                            throw new Error('Wheels should be a non-negative number!')
                        }
                        this._numberOfWheels = value;
                    }
                }
            });
            return vehicle;
        }());

        var Bike = (function (Parent) {
            var bike = Object.create(Parent);
            Object.defineProperties(bike, {
                init: {
                    value: function (brand, age, terrainCoverage, frameSize, numberOfShifts) {
                        Parent.init.call(this, brand, age, terrainCoverage, 2);
                        this.frameSize = frameSize;
                        this.numberOfShifts = numberOfShifts;

                        return this;
                    }
                },
                frameSize: {
                    get: function () {
                        return this._frameSize;
                    },
                    set: function (value) {
                        if (value === undefined || isNaN(value) || value < 0) {
                            throw new Error('Frame size should be a non-negative number!')
                        }
                        this._frameSize = value;
                    }
                },
                numberOfShifts: {
                    get: function () {
                        return this._numberOfShifts;
                    },
                    set: function (value) {
                        if (value && typeof value !== 'string' || value === '') {
                            throw new Error('Number of shifts should be a non-empty string when it exists.')
                        }
                        this._numberOfShifts = value;
                    }
                },
                typeName: {
                    value: 'Bike'
                },
                toString: {
                    value: function () {
                        if (this.numberOfShifts === undefined) {
                            return Parent.toString.call(this) + ',frameSize=' + this.frameSize
                        } else {
                            return Parent.toString.call(this) + ',frameSize=' + this.frameSize
                                + ',numberOfShifts=' + this.numberOfShifts;
                        }
                    }
                }
            });

            return bike;
        }(Vehicle));

        var Automobile = (function (Parent) {
            var automobile = Object.create(Parent);
            Object.defineProperties(automobile, {
                init: {
                    value: function (brand, age, terrainCoverage, numberOfWheels, consumption, typeOfFuel) {
                        Parent.init.call(this, brand, age, terrainCoverage, numberOfWheels);
                        this.consumption = consumption;
                        this.typeOfFuel = typeOfFuel;
                        return this;
                    }
                },
                consumption: {
                    get: function () {
                        return this._consumption;
                    },
                    set: function (value) {
                        if (value === undefined || isNaN(value) || value < 0) {
                            throw new Error('Consumption should be a non-negative number!')
                        }
                        this._consumption = value;
                    }
                },
                typeOfFuel: {
                    get: function () {
                        return this._typeOfFuel;
                    },
                    set: function (value) {
                        if (!value || value === '') {
                            throw new Error('Type of fuel should be a non-empty string.')
                        }
                        this._typeOfFuel = value;
                    }
                },
                toString: {
                    value: function () {
                        return Parent.toString.call(this) + ',consumption=[' + this.consumption + 'l/100km ' + this.typeOfFuel
                            + ']';
                    }
                }
            });

            return automobile;
        }(Vehicle));

        var Truck = (function (Parent) {
            var truck = Object.create(Parent);
            Object.defineProperties(truck, {
                init: {
                    value: function (brand, age, terrainCoverage, consumption, typeOfFuel, numberOfDoors) {
                        terrainCoverage = terrainCoverage ? terrainCoverage : 'all';
                        Parent.init.call(this, brand, age, terrainCoverage, 4, consumption, typeOfFuel);
                        this.numberOfDoors = numberOfDoors;
                        return this;
                    }
                },
                numberOfDoors: {
                    get: function () {
                        return this._numberOfDoors;
                    },
                    set: function (value) {
                        if (value === undefined || isNaN(value) || value < 0) {
                            throw new Error('Number of Doors should be a non-negative number!')
                        }
                        this._numberOfDoors = value;
                    }
                },
                typeName: {
                    value: 'Truck'
                },
                toString: {
                    value: function () {
                        return Parent.toString.call(this) + ',numberOfDoors=' + this.numberOfDoors;
                    }
                }
            });
            return truck;
        }(Automobile));

        var Limo = (function (Parent) {
            var limo = Object.create(Parent);
            Object.defineProperties(limo, {
                init: {
                    value: function (brand, age, numberOfWheels, consumption, typeOfFuel, employeeDrivers) {
                        Parent.init.call(this, brand, age, 'road', numberOfWheels, consumption, typeOfFuel);
                        this.employeeDrivers = employeeDrivers || [];
                        return this;
                    }
                },
                appendEmployee: {
                    value: function (employee) {
                        var index = this.employeeDrivers.indexOf(employee);
                        if (index == -1) {
                            this.employeeDrivers.push(employee);
                        }
                    }
                },
                detachEmployee: {
                    value: function (targetEmployee) {
                        var targetEmployeeIndex = this.employeeDrivers.findIndex(function (employee) {
                            return employee.name === targetEmployee.name;
                        });
                        if (targetEmployeeIndex > -1) {
                            this.employeeDrivers.splice(targetEmployeeIndex, 1);
                        }
                    }
                },
                typeName: {
                    value: 'Limo'
                },
                toString: {
                    value: function () {
                        var result          = Parent.toString.call(this) + '\n --> Employees, allowed to drive:',
                            numberOfDrivers = this.employeeDrivers.length,
                            i;
                        if (numberOfDrivers === 0) {
                            result += ' ---';
                        } else {
                            for (i = 0; i < numberOfDrivers; i += 1) {
                                result += '\n' + this.employeeDrivers[i];
                            }
                        }

                        return result;
                    }
                }
            });
            return limo;
        }(Automobile));

        return {
            Employee: Employee,
            Bike: Bike,
            Automobile: Automobile,
            Truck: Truck,
            Limo: Limo
        }
    }());

    var ParkManager = (function () {
        var _vehicles;
        var _employees;

        function init() {
            _vehicles = [];
            _employees = [];
        }

        var CommandProcessor = (function () {

            function processInsertCommand(command) {
                var object;

                switch (command["type"]) {
                    case "bike":
                        object = Object.create(Models.Bike).init(
                            command["brand"],
                            parseFloat(command["age"]),
                            command["terrain-coverage"],
                            parseFloat(command["frame-size"]),
                            command["number-of-shifts"]);
                        _vehicles.push(object);
                        break;
                    case "truck":
                        object = Object.create(Models.Truck).init(
                            command["brand"],
                            parseFloat(command["age"]),
                            command["terrain-coverage"],
                            parseFloat(command["consumption"]),
                            command["type-of-fuel"],
                            parseFloat(command["number-of-doors"]));
                        _vehicles.push(object);
                        break;
                    case "limo":
                        object = Object.create(Models.Limo).init(
                            command["brand"],
                            parseFloat(command["age"]),
                            parseFloat(command["number-of-wheels"]),
                            parseFloat(command["consumption"]),
                            command["type-of-fuel"]);
                        _vehicles.push(object);
                        break;
                    case "employee":
                        object = Object.create(Models.Employee).init(command["name"], command["position"],
                            parseFloat(command["grade"]));
                        _employees.push(object);
                        break;
                    default:
                        throw new Error("Invalid type.");
                }

                return object.typeName + " created.";
            }

            function processDeleteCommand(command) {
                var object,
                    index;

                switch (command["type"]) {
                    case "employee":
                        object = getEmployeeByName(command["name"]);
                        _vehicles.forEach(function (t) {
                            if (Object.getPrototypeOf(t) === Models.Limo && t.employees.indexOf(object) !== -1) {
                                t.detachEmployee(object);
                            }
                        });
                        index = _employees.indexOf(object);
                        _employees.splice(index, 1);
                        break;
                    case "bike":
                    case "truck":
                    case "limo":
                        object = getVehicleByBrandAndType(command["brand"], command["type"]);
                        index = _vehicles.indexOf(object);
                        _vehicles.splice(index, 1);
                        break;
                    default:
                        throw new Error("Unknown type.");
                }

                return object.typeName + " deleted.";
            }

            function processListCommand(command) {
                return formatOutputList(_vehicles);
            }

            function processAppendEmployeeCommand(command) {
                var employee = getEmployeeByName(command["name"]);
                var limos = getLimosByBrand(command["brand"]);
                for (var i = 0; i < limos.length; i++) {
                    limos[i].appendEmployee(employee);
                }

                return "Added employee to possible Limos.";
            }

            function processDetachEmployeeCommand(command) {
                var employee = getEmployeeByName(command["name"]);
                var limos = getLimosByBrand(command["brand"]);

                for (var i = 0; i < limos.length; i++) {
                    limos[i].detachEmployee(employee);
                }

                return "Removed employee from possible Limos.";
            }

            function processListEmployees(command) {
                var grade             = command['grade'],
                    sortedEmployees   = _employees.sort(function (firstEmployee, secondEmployee) {
                        return firstEmployee.name > secondEmployee.name;
                    }),
                    filteredEmployees = sortedEmployees.filter(function (value, index, self) {
                        return self.indexOf(value) !== index + 1;
                    });

                if (grade === 'all') {
                    return formatOutputList(_employees);
                } else {
                    return formatOutputList(filteredEmployees.filter(function (employee) {
                        return employee.grade >= grade;
                    }));
                }
            }

            // Functions below are not revealed

            function getVehicleByBrandAndType(brand, type) {
                for (var i = 0; i < _vehicles.length; i++) {
                    if (_vehicles[i].typeName.toString().toLowerCase() === type &&
                        _vehicles[i].brand === brand) {
                        return _vehicles[i];
                    }
                }
                throw new Error("No Limo with such brand exists.");
            }

            function getLimosByBrand(brand) {
                var currentVehicles = [];
                for (var i = 0; i < _vehicles.length; i++) {
                    if (Object.getPrototypeOf(_vehicles[i]) === Models.Limo &&
                        _vehicles[i].brand === brand) {
                        currentVehicles.push(_vehicles[i]);
                    }
                }
                if (currentVehicles.length > 0) {
                    return currentVehicles;
                }
                throw new Error("No Limo with such brand exists.");
            }

            function getEmployeeByName(name) {

                for (var i = 0; i < _employees.length; i++) {
                    if (_employees[i].name === name) {
                        return _employees[i];
                    }
                }
                throw new Error("No Employee with such name exists.");
            }

            function formatOutputList(output) {
                var queryString = "List Output:\n";

                if (output.length > 0) {
                    queryString += output.join("\n");
                } else {
                    queryString = "No results.";
                }

                return queryString;
            }

            return {
                processInsertCommand: processInsertCommand,
                processDeleteCommand: processDeleteCommand,
                processListCommand: processListCommand,
                processListEmployees: processListEmployees,
                processAppendEmployeeCommand: processAppendEmployeeCommand,
                processDetachEmployeeCommand: processDetachEmployeeCommand
            }
        }());

        var Command = (function () {
            function Command(cmdLine) {
                this._cmdArgs = processCommand(cmdLine);
            }

            function processCommand(cmdLine) {
                var parameters = [],
                    matches    = [],
                    pattern    = /(.+?)=(.+?)[;)]/g,
                    key,
                    value,
                    split;

                split = cmdLine.split("(");
                parameters["command"] = split[0];
                while ((matches = pattern.exec(split[1])) !== null) {
                    key = matches[1];
                    value = matches[2];
                    parameters[key] = value;
                }

                return parameters;
            }

            return Command;
        }());

        function executeCommands(cmds) {
            var commandArgs = new Command(cmds)._cmdArgs,
                action      = commandArgs["command"],
                output;

            switch (action) {
                case "insert":
                    output = CommandProcessor.processInsertCommand(commandArgs);
                    break;
                case "delete":
                    output = CommandProcessor.processDeleteCommand(commandArgs);
                    break;
                case "append-employee":
                    output = CommandProcessor.processAppendEmployeeCommand(commandArgs);
                    break;
                case "detach-employee":
                    output = CommandProcessor.processDetachEmployeeCommand(commandArgs);
                    break;
                case "list":
                    output = CommandProcessor.processListCommand(commandArgs);
                    break;
                case "list-employees":
                    output = CommandProcessor.processListEmployees(commandArgs);
                    break;
                default:
                    throw new Error("Unsupported command.");
            }

            return output;
        }

        return {
            init: init,
            executeCommands: executeCommands
        }
    }());

    var output = "";
    ParkManager.init();

    commands.forEach(function (cmd) {
        var result;
        if (cmd != "") {
            try {
                result = ParkManager.executeCommands(cmd) + "\n";
            } catch (e) {
                result = "Invalid command." + "\n";
                //result = e.message + "\n";
            }
            output += result;
        }
    });

    return output;
}
