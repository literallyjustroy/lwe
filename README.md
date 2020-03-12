# Learning with Errors 
This is a basic cryptographic implementation of Oded Regev's Learning with Errors problem. 

## Usage
You can encrypt and decrypt messages.
In order to encrypt a message you need the A and B public key, and the public prime modulus. To decrypt a message, you need the secret and modulus.
You can generate these parameters automatically using a Security Parameter, or manually input them. The length of public key A, and public key B must align, and the secret must be smaller than the modulus to ensure correctness.


## Process
[Basic LWE Cipher implementation](https://asecuritysite.com/encryption/lwe2)

After running through his implementation and understanding each step of the LWE process,
I used [_Oded Regev's The Learning with Errors Problem_](https://cims.nyu.edu/~regev/papers/lwesurvey.pdf) and implemented the process
discussed in Cryptographic Applications (Chapter 4).

This section is more detailed and provides some additional information about how to pick 
a prime modulus to ensure security and correctness

## Website
The finished cipher implementation is hosted at: https://lwe.visual.blue
