//get count of prime number less than param 'n'
console.log(getPrimeCount(40));
function getPrimeCount(n) {
  if (n < 1) return "wrong number";
  let count = 0;
  let primeNumbers = [];
  for (let i = n - 1; i > 1; i--) {
    if (isPrime(i)) {
      primeNumbers.push(i);
      count++;
    }
  }
  //primeNumbers array contains all prime numbers less than 'n'
  return count;

  function isPrime(num) {
    var sqrtnum = Math.floor(Math.sqrt(num));
    for (var i = 2; i < sqrtnum + 1; i++) {
      if (num % i == 0) {
        return false;
      }
    }
    return num != 1;
  }
}