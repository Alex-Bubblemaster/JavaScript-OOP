/*In the shop there are currently two types of products: shampoos and toothpastes.
 Product
 Each product has name, brand, price and gender (men, women, unisex).
 Minimum product name’s length is 3 symbols and maximum is 10 symbols.
 The error message should be "Product name must be between {min} and {max} symbols long!".
 Minimum brand name’s length is 2 symbols and maximum is 10 symbols.
 The error message should be "Product brand must be between {min} and {max} symbols long!".
 Gender type can be “Men”, “Women” or “Unisex”.
 Each shampoo has quantity (in milliliters) and usage (every day or medical).
 All shampoos’ price is per milliliter.
 Toothpastes have ingredients.
 There are categories of products.
 Each category has name and products can be added or removed.
 The same product can be added to a category more than once.
 There is also a shopping cart. Products can be added or removed from it.
 The same product can be added to the shopping cart more than once.
 The shopping cart can calculate the total price of all products in it.
 Adding the same product to one category more than once is allowed.
 Minimum category name’s length length is 2 symbols and maximum is 15 symbols.
 The error message should be "Category name must be between {min} and {max} symbols long!".
 Products in category should be sorted by brand in ascending order and then by price in descending order.
 When removing product from category, if the product is not found, the error message should be
 "Product {product name} does not exist in category {category name}!".
 Category’s print method should return text in the following format:
 {category name} category – {number of products} products/product in total
 - {product brand} – {product name}:
 * Price: ${product price}
 * For gender: Men/Women/Unisex
 * Ingredients: {product ingredients, separated by “, “} (when applicable)
 - {product brand} – {product name}:
 * Price: ${product price}
 * For gender: {product gender}
 * Quantity: {product quantity} ml (when applicable)
 * Usage: EveryDay/Medical (when applicable)

 Shampoo’s price is given per milliliter. Usage type can be “EveryDay” or “Medical”.
 Ingredients should be represented as text, joined in their order of addition, separated by “, “ (comma and space).
 Each ingredient name’s length should be between 4 and 12 symbols, inclusive.
 The error message should be "Each ingredient must be between {min} and {max} symbols long!".
 Adding the same product more than once is allowed. Do not check if the product exists, when removing it from the shopping cart.
 All number type fields should be printed “as is”, without any formatting or rounding.
 All properties in the above interfaces are mandatory (cannot be null or empty).
 If a null value is passed to some mandatory property, your program should throw a proper exception.
 */
function solve() {
    function isNotValidProductName(name) {
        var nameLength = name.length;
        return 3 > nameLength || nameLength > 20;
    }

    function isNotValidBrandName(brand) {
        var brandLength = brand.length;
        return 2 > brandLength || brandLength > 10;
    }

    function isNotUnique(nameToTest,arrayOfNames){
        var result = arrayOfNames.some(function(nameToTest){
            return arrayOfNames.name === nameToTest;
        });
        return result;
    }

    var cosmeticShop = function () {

        var Category = (function () {
            var category = {
                init: function (name) {
                    this.name = name;
                    this.cosmetics = [];
                    return this;
                },
                addCosmetics: function (cosmetic) {
                    this.cosmetics.push(cosmetic);
                    return this;
                },
                print: function () {
                    if (!this.cosmetics) {
                        return this.name + ' ' + 0 + ' ' + 'products in total';
                    }
                    var result = this.name + ' category - ' + this.cosmetics.length + ' ' + 'products in total';

                    this.cosmetics.forEach(function (product) {
                        result += '\n- ' + product.brand + ' - ' + product.name + ':';
                        result += '\n* Price: $' + product.price;
                        result += '\n* For gender: ' + product.gender;

                        if (product.ingredients) {
                            result += '\n* Ingredients: ' + product.ingredients;
                        }

                        if (product.milliliters) {
                            result += '\n* Quantity: ' + product.milliliters + 'ml';
                        }

                        if (product.usage) {
                            result += '\n* Usage: ' + product.usage;
                        }
                    });

                    return result;
                }
            };

            return category;
        }());

        var Product = (function () {
            var product = {
                init: function (name, brand, price, gender) { //(men, women, unisex).
                    if ((isNotValidProductName(name))) {
                        throw new Error("Product name must be between 3 and 10 symbols long!")
                    }

                    if ((isNotValidBrandName(brand))) {
                        throw new Error("Product brand must be between {min} and {max} symbols long!")
                    }

                    this.name = name;
                    this.brand = brand;
                    this.price = price;
                    this.gender = gender;

                    return this;
                }
            };
            return product;
        }());

        var Shampoo = (function (Parent) {
            var shampoo = Object.create(Parent);
            Object.defineProperties(shampoo, {

                init: {
                    value: function (name, brand, price, gender, milliliters, usage) {
                        Parent.init.call(this, name, brand, price, gender);
                        this.milliliters = milliliters;
                        this.usage = usage;
                        return this;
                    }
                }
            });

            return shampoo;
        }(Product));

        var Toothpaste = (function (Parent) {
            var toothpaste = Object.create(Product);
            Object.defineProperties(toothpaste, {
                init: {
                    value: function (name, brand, price, gender, ingredients) {

                        Parent.init.call(this, name, brand, price, gender);
                        this.ingredients = ingredients;
                        return this;
                    }
                }
            });

            return toothpaste;
        }(Product));

        var CosmeticFactory = (function () {
            var cosmeticFactory = {
                init: function () {
                    this.categories = [];
                    this.toothpastes = [];
                    this.shampoos = [];
                    this.cosmetics = [];
                    return this;
                },
                createCategory: function (name) {
                    this.categories = this.categories || [];
                    var newCategory = Object.create(Category).init(name);
                    this.categories.push(newCategory);
                    return this;
                },
                createToothpaste: function(name, brand, price, gender, ingredients){
                    var newToothpaste = Object.create(Toothpaste).init(name, brand, price, gender, ingredients);
                    this.cosmetics = this.cosmetics || [];
                    this.toothpastes = this.toothpastes || [];
                    this.toothpastes.push(newToothpaste);
                    this.cosmetics.push(newToothpaste);
                    return this;
                },
                createShampoo: function(name, brand, price, gender, milliliters, usage){
                    var newShampoo = Object.create(Shampoo).init(name, brand, price, gender, milliliters, usage);
                    this.shampoos = this.shampoos || [];
                    this.cosmetics = this.cosmetics || [];
                    this.shampoos.push(newShampoo);
                    this.cosmetics.push(newShampoo);
                    return this;
                },
                addToCategory: function(categoryName, productName){
                    var targetCategory = this.categories.filter(function(category){
                        return category.name === categoryName;
                    });
                    var targetCosmetics = this.cosmetics.filter(function(cosmetic){
                        return cosmetic.name === productName;
                    });

                    targetCategory[0].addCosmetics(targetCosmetics);
                    return this;
                },
                showCategory: function(categoryName){
                    var targetCategory = this.categories.filter(function(category){
                        return category.name === categoryName;
                    });

                    return targetCategory;
                }
            };
            return cosmeticFactory;

        }());

        return {
            Category: Category,
            Product: Product,
            Shampoo: Shampoo,
            Toothpaste: Toothpaste,
            CosmeticFactory: CosmeticFactory
        };

    }();

    return cosmeticShop;
}


module.exports = solve;