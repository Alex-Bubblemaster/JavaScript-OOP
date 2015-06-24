/* Task description */
/*
 Write a function that finds all the prime numbers in a range
 1) it should return the prime numbers in an array
 2) it must throw an Error if any on the range params is not convertible to `Number`
 3) it must throw an Error if any of the range params is missing
 */

function findPrimes(startRange, endRange) {
    startRange *= 1;
    endRange *= 1;
    var primes = [],
        i;

    if (isNaN(startRange) || isNaN(endRange)) {
        throw new Error();
    }
    if (typeof startRange === 'undefined' || typeof endRange === 'undefined') {
        throw new Error();
    }
    for (i = startRange; i <= endRange; i += 1) {
        if(isPrime(i)){
            primes.push(i);
        }
        
    }
    
    return primes;

    function isPrime(number) {
        if(number < 2){
            return false;
        }
        var start = 2;
        while (start <= Math.sqrt(number)) {
            if (number % start++ < 1) return false;
        }
        return number > 1;
    }
}


module.exports = findPrimes;
