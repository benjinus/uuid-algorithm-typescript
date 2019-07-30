/**
 * Follows RFC-4122 to generate a valid UUID_V4 Randomly with upmost entropy by utilizing performance.now() and current time stamp to ensure there is no collusions.
 * 
 * Procedures : 
 *   - 1) Creates a UUID following this format `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`
 *   - 2) tries to create entropy in addition to Math.Random() by using performance.now() and Date.getTime()
 *      - 2-a) this is because Math.Random() can sometimes cause client collision see https://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
 *      - 2-b) this solution could have used Crypto , however, the current way tries to ensure absolute entropy when creating seeds
 *   - 3) fills the blank x's/y's by the propper value 
 *   - 4) returns the final UUID as a string
 * 
 * @author TypesScript port : Ahmad Baderkhan
 * @author original Solution : Briguy37 https://stackoverflow.com/users/508537/briguy37
 * 
 * @see https://stackoverflow.com/a/8809472 for the original solution by --> Briguy37
 * @see https://tools.ietf.org/html/rfc4122 for the specification of UUID
 */
function generate_random_UUID_V_4() : string
{
    var entropyStamp : number; // our rng , tries to make itself more random using date and possibly performance time stamp
    var randomValue : number; // the random value generated for the sequence

    entropyStamp = new Date().getTime(); // timestamp ms

    // for older browsers , we'll just have to settle for current system timestamp
    // otherwise add it to increase entropy
    if (performance !== undefined && typeof performance.now == "function")
    {
        entropyStamp += performance.now();
    }


    // we're only concerned wtih replacing x and y values
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace (/[xy]/g, function (letter : string) : string
    {
        // give us a random value with an entropy stamp 
        randomValue  = (entropyStamp + Math.random() * 16) % 16 | 0;
        // convert our entropy stamp to the nearest whole number
        entropyStamp = Math.floor(entropyStamp/16);
        // for x letters --> replace them with the radnom value 
        // for y letters --> they must be replaced with the random value of 2 hex values
        return (letter === "x" ? randomValue : (randomValue & 0x3 | 0x8)).toString(16);
    })

}


