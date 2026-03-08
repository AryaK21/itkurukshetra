async function runTests() {
    const baseUrl = 'http://localhost:3005/api/register';
    console.log('--- Starting API Tests ---\n');

    // Test 1: Register Boy for Football (Success)
    console.log('Test 1: Register Boy for Football & Chess (Jersey 10)');
    let res1 = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'John Doe',
            gender: 'boy',
            jersey_number: 10,
            sports: ['Football', 'Chess']
        })
    });
    let data1 = await res1.json();
    console.log('Result 1:', res1.status, data1, '\n');

    // Test 2: Register another Boy for Chess with Jersey 10 (Conflict)
    console.log('Test 2: Register another Boy for Chess (Jersey 10) - Expected Conflict');
    let res2 = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Mike Smith',
            gender: 'boy',
            jersey_number: 10,
            sports: ['Chess']
        })
    });
    let data2 = await res2.json();
    console.log('Result 2:', res2.status, data2, '\n');

    // Test 3: Register Girl for Football with Jersey 10 (No conflict - different gender)
    console.log('Test 3: Register Girl for Football (Jersey 10) - Expected Success');
    let res3 = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Jane Doe',
            gender: 'girl',
            jersey_number: 10,
            sports: ['Football']
        })
    });
    let data3 = await res3.json();
    console.log('Result 3:', res3.status, data3, '\n');

    // Test 4: Register Boy for Cricket with Jersey 10 (No conflict - different sport)
    console.log('Test 4: Register Boy for Cricket (Jersey 10) - Expected Success');
    let res4 = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Alex Johnson',
            gender: 'boy',
            jersey_number: 10,
            sports: ['Cricket']
        })
    });
    let data4 = await res4.json();
    console.log('Result 4:', res4.status, data4, '\n');

    console.log('--- Tests Complete ---');
}

runTests();
